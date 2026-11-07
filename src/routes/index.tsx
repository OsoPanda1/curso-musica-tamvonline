import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { COURSE, ALL_LESSONS } from "@/lib/course";
import hero from "@/assets/hero.jpg";
import {
  ArrowDownRight, ArrowRight, AudioLines, BookOpen, CirclePlay,
  Cpu, ExternalLink, FlaskConical, Github, Headphones, LockKeyhole,
  Music2, Search, ShieldCheck, WandSparkles, X,
} from "lucide-react";

const openTools = [
  { name: "Audacity", kind: "Edición y restauración de audio", detail: "Edición multipista, limpieza, grabación y análisis.", url: "https://www.audacityteam.org/", license: "Código abierto · GPL" },
  { name: "LMMS", kind: "Producción musical", detail: "Secuenciador, instrumentos virtuales y composición MIDI.", url: "https://lmms.io/", license: "Código abierto · GPL" },
  { name: "Ardour", kind: "DAW multipista", detail: "Grabación, edición, mezcla y automatización profesional.", url: "https://ardour.org/", license: "Código abierto · GPL" },
  { name: "Demucs", kind: "Separación de fuentes", detail: "Proyecto de investigación para separar voz e instrumentos.", url: "https://github.com/facebookresearch/demucs", license: "Código abierto · revisar licencia y mantenimiento" },
];

const records = [
  { title: "TAMV — Núcleo heptafederado MD-X4", doi: "10.5281/zenodo.19436662", type: "Informe técnico", url: "https://doi.org/10.5281/zenodo.19436662" },
  { title: "Arquitectura de UTAMV y núcleo de IA académica", doi: "10.5281/zenodo.19562517", type: "Preimpresión", url: "https://doi.org/10.5281/zenodo.19562517" },
  { title: "Comunicado de soberanía infraestructural", doi: "10.5281/zenodo.19564367", type: "Documento de trabajo", url: "https://doi.org/10.5281/zenodo.19564367" },
  { title: "DEVHUBS TAMV Red Online", doi: "10.5281/zenodo.19414631", type: "Informe", url: "https://doi.org/10.5281/zenodo.19414631" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Play & Go · Sonora IA — Música con IA | TAMV Online Network" },
      { name: "description", content: "Aprende a crear, producir y publicar música con inteligencia artificial. Formación práctica en español, herramientas abiertas y soberanía creativa desde TAMV Online Network." },
      { property: "og:title", content: "Play & Go · Sonora IA — Música con IA" },
      { property: "og:description", content: "Un laboratorio de aprendizaje musical con IA: de la idea a la producción, con herramientas abiertas y criterio creativo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const [showAllRecords, setShowAllRecords] = useState(false);
  const normalizedQuery = query.trim().toLocaleLowerCase("es");
  const filteredCourse = useMemo(() => COURSE.filter((module) => {
    const lessonText = module.lessons.map((lesson) => lesson.title).join(" ");
    return [module.title, module.goal, lessonText].join(" ").toLocaleLowerCase("es").includes(normalizedQuery);
  }), [normalizedQuery]);

  return (
    <main className="overflow-hidden">
      <section className="relative isolate min-h-[650px] overflow-hidden border-b border-border">
        <img src={hero} alt="Entorno de producción musical con iluminación abstracta" width={1600} height={912} fetchPriority="high" className="absolute inset-0 -z-30 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 -z-10 bg-aurora opacity-80" />
        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-electric/30 bg-background/65 px-4 py-2 text-[11px] font-semibold uppercase tracking-[.18em] text-lavender backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-electric shadow-[0_0_14px_var(--electric)]" />
              TAMV Online Network · Laboratorio creativo
            </div>
            <h1 className="max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              La música empieza contigo. <span className="text-metal">La IA amplía tus posibilidades.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Aprende a convertir ideas en canciones: escritura, dirección de modelos, voces, producción, mezcla y distribución. Un programa práctico en español que prioriza criterio humano, herramientas accesibles y decisiones creativas propias.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg"><Link to="/auth" search={{ mode: "signup" }}>Crear cuenta y comenzar <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              <Button asChild variant="glass" size="lg"><Link to="/curso/$lessonId" params={{ lessonId: "m1-l1" }}><CirclePlay className="mr-2 h-4 w-4" /> Probar lección abierta</Link></Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-lavender" /> Aprendizaje paso a paso</span>
              <span className="inline-flex items-center gap-2"><AudioLines className="h-4 w-4 text-terracotta" /> Práctica aplicada</span>
              <span className="inline-flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-electric" /> Acceso controlado desde servidor</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-8 rounded-full bg-electric/10 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/15 bg-background/65 p-5 shadow-glow backdrop-blur-xl sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-xs uppercase tracking-[.2em] text-muted-foreground">Tu espacio creativo</p><h2 className="mt-2 text-2xl font-bold">De idea a canción</h2></div>
                <div className="rounded-2xl border border-lavender/30 bg-lavender/10 p-3 text-lavender"><Music2 className="h-6 w-6" /></div>
              </div>
              <div className="mt-7 space-y-3">
                {[
                  ["01", "Concepto y letra", "Define la intención, el relato y el hook."],
                  ["02", "Dirección de la IA", "Especifica género, energía, tempo y textura."],
                  ["03", "Producción y revisión", "Escucha, compara, edita y mejora."],
                  ["04", "Entrega responsable", "Prepara metadatos, derechos y distribución."],
                ].map(([n, title, description]) => (
                  <div key={n} className="flex gap-4 rounded-2xl border border-border bg-card/70 p-4">
                    <span className="font-mono text-sm text-lavender">{n}</span>
                    <div><h3 className="text-sm font-bold">{title}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
                <div><p className="text-xs text-muted-foreground">Programa estructurado</p><p className="mt-1 font-semibold">{COURSE.length} módulos · {ALL_LESSONS.length} lecciones</p></div>
                <WandSparkles className="h-6 w-6 text-terracotta" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:grid-cols-3 lg:px-8">
        {[
          { value: String(COURSE.length).padStart(2, "0"), label: "Módulos formativos", detail: "Del concepto a la publicación" },
          { value: String(ALL_LESSONS.length).padStart(2, "0"), label: "Lecciones prácticas", detail: "Ejemplos y ejercicios aplicados" },
          { value: "$500", label: "MXN / trimestre", detail: "Acceso completo tras confirmación de pago" },
        ].map((item) => <div key={item.label} className="rounded-2xl border border-border bg-panel p-5 sm:p-6"><p className="text-3xl font-extrabold text-metal">{item.value}</p><p className="mt-2 text-sm font-semibold">{item.label}</p><p className="mt-1 text-xs text-muted-foreground">{item.detail}</p></div>)}
      </section>

      <section id="programa" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-lavender">Ruta de aprendizaje</p><h2 className="mt-3 text-3xl font-bold md:text-5xl">Aprende haciendo.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">Explora el programa y entra a la lección disponible. El contenido de pago se habilita únicamente cuando el servidor confirma una inscripción vigente.</p></div>
          <div className="relative w-full md:max-w-sm"><Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Buscar módulos y lecciones" placeholder="Buscar módulos o lecciones…" className="h-11 w-full rounded-xl border border-input bg-card/80 pl-10 pr-10 text-sm outline-none transition focus:border-lavender focus:ring-2 focus:ring-lavender/20" />{query && <button type="button" aria-label="Limpiar búsqueda" onClick={() => setQuery("")} className="absolute right-3 top-3 rounded p-0.5 text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>}</div>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourse.map((module) => (
            <article key={module.id} className="group flex min-h-56 flex-col rounded-2xl border border-border bg-card/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-lavender/50 hover:shadow-glow">
              <div className="flex items-center justify-between"><span className="font-mono text-xs tracking-wider text-lavender">MÓDULO {String(module.number).padStart(2, "0")}</span><BookOpen className="h-5 w-5 text-muted-foreground transition group-hover:text-lavender" /></div>
              <h3 className="mt-4 text-xl font-bold leading-snug">{module.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{module.goal}</p>
              <div className="mt-5 flex items-center justify-between border-t border-border pt-4"><span className="text-xs text-muted-foreground">{module.lessons.length} lecciones</span><Link to="/curso/$lessonId" params={{ lessonId: module.lessons[0]?.id ?? "m1-l1" }} className="inline-flex items-center gap-2 text-xs font-semibold text-lavender hover:text-foreground">Explorar <ArrowDownRight className="h-4 w-4" /></Link></div>
            </article>
          ))}
          {filteredCourse.length === 0 && <div className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center"><Search className="mx-auto h-7 w-7 text-muted-foreground" /><p className="mt-3 font-semibold">No hay coincidencias</p><p className="mt-1 text-sm text-muted-foreground">Prueba con otro término o limpia la búsqueda.</p><Button className="mt-4" variant="outline" onClick={() => setQuery("")}>Mostrar todos</Button></div>}
        </div>
      </section>

      <section id="herramientas" className="scroll-mt-24 border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-terracotta">Soberanía creativa</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">Herramientas abiertas. Más control sobre tu proceso.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">El curso puede complementarse con herramientas de código abierto. Comprueba siempre la licencia, los requisitos del equipo, las condiciones de los modelos y los derechos de los datos que utilices.</p></div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {openTools.map((tool) => <a key={tool.name} href={tool.url} target="_blank" rel="noreferrer noopener" className="group rounded-2xl border border-border bg-background/70 p-5 transition hover:border-electric/50"><div className="flex items-center justify-between"><span className="rounded-xl border border-border bg-card p-2.5 text-lavender"><Headphones className="h-5 w-5" /></span><ExternalLink className="h-4 w-4 text-muted-foreground transition group-hover:text-electric" /></div><h3 className="mt-4 text-lg font-bold">{tool.name}</h3><p className="mt-1 text-xs font-semibold text-terracotta">{tool.kind}</p><p className="mt-3 min-h-10 text-sm leading-6 text-muted-foreground">{tool.detail}</p><p className="mt-4 border-t border-border pt-3 text-[11px] text-muted-foreground">{tool.license}</p></a>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-lavender">TAMV Online Network</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">Creatividad con contexto y trazabilidad.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Play & Go forma parte de una iniciativa independiente centrada en aprendizaje, desarrollo tecnológico y conocimiento abierto desde Mineral del Monte, Hidalgo, México.</p><div className="mt-6 flex flex-wrap gap-3"><Button asChild variant="glass"><a href="https://orcid.org/0009-0008-5050-1539" target="_blank" rel="noreferrer noopener">ORCID <ExternalLink className="ml-2 h-4 w-4" /></a></Button><Button asChild variant="glass"><a href="https://zenodo.org/communities/tamvonline-oficial" target="_blank" rel="noreferrer noopener">Zenodo <ExternalLink className="ml-2 h-4 w-4" /></a></Button><Button asChild variant="glass"><a href="https://github.com/OsoPanda1/curso-musica-tamvonline" target="_blank" rel="noreferrer noopener"><Github className="mr-2 h-4 w-4" /> Código</a></Button></div><div className="mt-7 rounded-2xl border border-border bg-panel p-5"><div className="flex items-center gap-3"><Cpu className="h-5 w-5 text-electric" /><h3 className="font-bold">Principio operativo</h3></div><p className="mt-2 text-sm leading-6 text-muted-foreground">La IA es una herramienta de apoyo; las decisiones creativas, la verificación de derechos y la responsabilidad de publicación requieren criterio humano.</p></div></div>
          <div><div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-muted-foreground">Registros de referencia</p><h3 className="mt-2 text-2xl font-bold">Producción y documentación TAMV</h3></div><FlaskConical className="h-7 w-7 text-lavender" /></div><div className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card/70">{(showAllRecords ? records : records.slice(0, 3)).map((record) => <a key={record.doi} href={record.url} target="_blank" rel="noreferrer noopener" className="flex flex-col gap-2 p-4 transition hover:bg-white/[.03] sm:flex-row sm:items-center sm:justify-between"><div><h4 className="text-sm font-semibold">{record.title}</h4><p className="mt-1 text-xs text-muted-foreground">{record.type}</p></div><span className="inline-flex shrink-0 items-center gap-2 font-mono text-[11px] text-electric">{record.doi}<ExternalLink className="h-3 w-3" /></span></a>)}</div><button type="button" onClick={() => setShowAllRecords((value) => !value)} className="mt-4 text-xs font-semibold text-lavender hover:text-foreground">{showAllRecords ? "Mostrar menos" : "Mostrar todos los registros"} </button><p className="mt-3 text-xs leading-5 text-muted-foreground">Los enlaces se presentan como referencias aportadas por el proyecto; su existencia y metadatos deben comprobarse en el registro de origen antes de usarlos como evidencia institucional.</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-lavender/25 bg-panel p-8 shadow-glow md:p-12">
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-lavender/10 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-lavender">Tu siguiente paso</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">Construye tu sonido. Conserva tu criterio.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Crea una cuenta para guardar tu avance y acceder a tu espacio de aprendizaje. La inscripción completa se activa después de verificar el pago en el servidor.</p></div><div className="shrink-0"><p className="text-3xl font-extrabold text-metal">$500 <span className="text-base text-foreground">MXN</span></p><p className="mt-1 text-xs text-muted-foreground">por trimestre</p><Button asChild variant="hero" size="lg" className="mt-4 w-full"><Link to="/auth" search={{ mode: "signup" }}>Empezar ahora <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></div>
        </div>
      </section>
    </main>
  );
}
