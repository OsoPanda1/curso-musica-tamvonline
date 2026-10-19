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
