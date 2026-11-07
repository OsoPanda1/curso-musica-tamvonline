import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AudioWaveform, Menu } from "lucide-react";

export function SiteHeader() {
  const [signedIn, setSignedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const qc = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSignedIn(!!data.session);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setSignedIn(!!session);
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    setMenuOpen(false);
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-5 lg:px-8">
        <Link to="/" aria-label="Play & Go — página principal" className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-electric/30 bg-electric/10 text-electric"><AudioWaveform className="h-5 w-5" /></span>
          <span className="min-w-0">
            <span className="block truncate font-display text-sm font-extrabold tracking-[.12em] text-metal sm:text-base">PLAY &amp; GO</span>
            <span className="hidden text-[10px] tracking-wide text-muted-foreground sm:block">SONORA IA · TAMV ONLINE NETWORK</span>
          </span>
        </Link>
        <nav aria-label="Navegación principal" className="hidden items-center gap-1 sm:flex">
          <a href="/#programa" className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground">Programa</a>
          <a href="/#herramientas" className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-card hover:text-foreground">Herramientas</a>
          {signedIn ? (
            <>
              <Button asChild variant="ghost" size="sm"><Link to="/curso">Mi curso</Link></Button>
              <Button asChild variant="ghost" size="sm"><Link to="/perfil">Perfil</Link></Button>
              <Button variant="glass" size="sm" onClick={signOut}>Salir</Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm"><Link to="/auth">Entrar</Link></Button>
              <Button asChild variant="hero" size="sm"><Link to="/auth" search={{ mode: "signup" }}>Crear cuenta</Link></Button>
            </>
          )}
        </nav>
        <div className="flex items-center gap-2 sm:hidden">
          {signedIn ? <Button asChild variant="glass" size="sm"><Link to="/curso">Mi curso</Link></Button> : <Button asChild variant="hero" size="sm"><Link to="/auth" search={{ mode: "signup" }}>Entrar</Link></Button>}
          <Button variant="ghost" size="icon" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><Menu className="h-5 w-5" /></Button>
        </div>
      </div>
      {menuOpen && (
        <nav aria-label="Navegación móvil" className="border-t border-border bg-background px-4 py-3 sm:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            <a href="/#programa" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm hover:bg-card">Programa de aprendizaje</a>
            <a href="/#herramientas" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm hover:bg-card">Herramientas abiertas</a>
            {signedIn ? (
              <>
                <Link to="/perfil" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm hover:bg-card">Mi perfil</Link>
                <button type="button" onClick={signOut} className="rounded-lg px-3 py-3 text-left text-sm hover:bg-card">Cerrar sesión</button>
              </>
            ) : <Link to="/auth" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm hover:bg-card">Iniciar sesión</Link>}
          </div>
        </nav>
      )}
    </header>
  );
}
