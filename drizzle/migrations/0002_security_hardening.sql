-- Security and data-integrity hardening for Sonora IA.
-- This migration intentionally does not grant paid access or trust browser callbacks.
-- Payment events can only be written by trusted server-side service-role code.

BEGIN;

-- Remove stale/invalid progress rows before enforcing the course catalogue.
DELETE FROM public.lesson_progress
WHERE lesson_id NOT IN (
  'm1-l1','m1-l2','m1-l3','m1-l4',
  'm2-l1','m2-l2',
  'm3-l1','m3-l2','m3-l3',
  'm4-l1','m4-l2','m4-l3',
  'm5-l1','m5-l2',
  'm6-l1','m6-l2',
  'm7-l1','m7-l2',
  'm8-l1','m8-l2',
  'm9-l1','m9-l2'
);

DELETE FROM public.lesson_progress lp
WHERE NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = lp.user_id);

DELETE FROM public.enrollments e
WHERE NOT EXISTS (SELECT 1 FROM auth.users u WHERE u.id = e.user_id);

ALTER TABLE public.lesson_progress
  ADD CONSTRAINT lesson_progress_lesson_id_valid CHECK (lesson_id IN (
    'm1-l1','m1-l2','m1-l3','m1-l4',
    'm2-l1','m2-l2',
    'm3-l1','m3-l2','m3-l3',
    'm4-l1','m4-l2','m4-l3',
    'm5-l1','m5-l2',
    'm6-l1','m6-l2',
    'm7-l1','m7-l2',
    'm8-l1','m8-l2',
    'm9-l1','m9-l2'
  ));

ALTER TABLE public.lesson_progress
  ADD CONSTRAINT lesson_progress_user_fk
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.enrollments
  ADD CONSTRAINT enrollments_user_fk
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_age_valid CHECK (age IS NULL OR age BETWEEN 13 AND 120),
  ADD CONSTRAINT profiles_username_valid CHECK (
    username IS NULL OR (
      char_length(username) BETWEEN 3 AND 30
      AND username ~ '^[A-Za-z0-9_.]+$'
    )
  ),
  ADD CONSTRAINT profiles_bio_length CHECK (bio IS NULL OR char_length(bio) <= 300);

-- Record provider event identity and final state without storing raw card/payment payloads.
-- The provider-specific webhook must verify its signature before writing approved events.
CREATE TABLE public.payment_events (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  provider text NOT NULL CHECK (provider ~ '^[a-z][a-z0-9_-]{1,31}$'),
  provider_payment_id text NOT NULL CHECK (char_length(provider_payment_id) BETWEEN 1 AND 200),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  amount_mxn integer NOT NULL CHECK (amount_mxn > 0),
  currency text NOT NULL DEFAULT 'MXN' CHECK (currency = 'MXN'),
  status text NOT NULL CHECK (status IN ('pending','approved','rejected','cancelled','refunded','charged_back')),
  external_reference text NOT NULL CHECK (char_length(external_reference) BETWEEN 1 AND 200),
  event_hash text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (provider, provider_payment_id)
);

CREATE INDEX payment_events_user_created_idx
  ON public.payment_events (user_id, created_at DESC);

ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.payment_events FROM anon, authenticated;
GRANT ALL ON public.payment_events TO service_role;

-- Enrollment writes remain service-role-only. No client-side INSERT/UPDATE policy is added.
REVOKE INSERT, UPDATE, DELETE ON public.enrollments FROM anon, authenticated;
REVOKE ALL ON public.payment_events_id_seq FROM anon, authenticated;

COMMIT;

ALTER TABLE public.payment_events
  ADD COLUMN access_granted_at timestamptz,
  ADD COLUMN access_before timestamptz,
  ADD COLUMN access_until timestamptz;

-- Called only after the server has verified Mercado Pago's webhook signature
-- and fetched the canonical payment record directly from Mercado Pago.
CREATE OR REPLACE FUNCTION public.apply_verified_payment(
  p_provider text,
  p_provider_payment_id text,
  p_user_id uuid,
  p_amount_mxn integer,
  p_currency text,
  p_status text,
  p_external_reference text,
  p_event_hash text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_event public.payment_events%ROWTYPE;
  v_current_until timestamptz;
  v_next_until timestamptz;
BEGIN
  IF p_provider <> 'mercadopago'
     OR p_amount_mxn <> 500
     OR p_currency <> 'MXN'
     OR p_external_reference <> p_user_id::text
     OR p_status NOT IN ('pending','approved','rejected','cancelled','refunded','charged_back') THEN
    RAISE EXCEPTION 'Invalid verified payment attributes';
  END IF;

  -- Serialize payment grants for the same account.
  PERFORM 1 FROM auth.users WHERE id = p_user_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Payment user does not exist';
  END IF;

  INSERT INTO public.payment_events (
    provider, provider_payment_id, user_id, amount_mxn, currency,
    status, external_reference, event_hash
  ) VALUES (
    p_provider, p_provider_payment_id, p_user_id, p_amount_mxn, p_currency,
    p_status, p_external_reference, p_event_hash
  ) ON CONFLICT (provider, provider_payment_id) DO NOTHING;

  SELECT * INTO v_event
  FROM public.payment_events
  WHERE provider = p_provider AND provider_payment_id = p_provider_payment_id
  FOR UPDATE;

  IF v_event.user_id <> p_user_id
     OR v_event.amount_mxn <> p_amount_mxn
     OR v_event.currency <> p_currency
     OR v_event.external_reference <> p_external_reference THEN
    RAISE EXCEPTION 'Payment identifier collision';
  END IF;

  UPDATE public.payment_events
  SET status = p_status,
      event_hash = COALESCE(p_event_hash, event_hash),
      updated_at = now()
  WHERE id = v_event.id;

  IF p_status IN ('refunded','charged_back') THEN
    -- Revoke only when this event still owns the active expiry. If another
    -- purchase extended access later, require a reconciliation instead of
    -- silently removing that later entitlement.
    IF v_event.access_until IS NOT NULL THEN
      UPDATE public.enrollments
      SET paid_until = COALESCE(v_event.access_before, now())
      WHERE user_id = p_user_id AND paid_until = v_event.access_until;
    END IF;
    RETURN false;
  END IF;

  IF p_status <> 'approved' OR v_event.access_granted_at IS NOT NULL THEN
    RETURN false;
  END IF;

  SELECT paid_until INTO v_current_until
  FROM public.enrollments
  WHERE user_id = p_user_id
  FOR UPDATE;

  v_current_until := GREATEST(COALESCE(v_current_until, now()), now());
  v_next_until := v_current_until + interval '3 months';

  INSERT INTO public.enrollments (user_id, paid_until)
  VALUES (p_user_id, v_next_until)
  ON CONFLICT (user_id) DO UPDATE SET paid_until = EXCLUDED.paid_until;

  UPDATE public.payment_events
  SET access_granted_at = now(),
      access_before = v_current_until,
      access_until = v_next_until,
      updated_at = now()
  WHERE id = v_event.id;

  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.apply_verified_payment(text,text,uuid,integer,text,text,text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.apply_verified_payment(text,text,uuid,integer,text,text,text,text) TO service_role;
GRANT USAGE, SELECT ON SEQUENCE public.payment_events_id_seq TO service_role;
