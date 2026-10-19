export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; label?: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "tip"; text: string }
  | { type: "practice"; title: string; items: string[] };

export type Lesson = { id: string; title: string; minutes: number; blocks: Block[] };
export type Module = { id: string; number: number; title: string; goal: string; lessons: Lesson[] };

export const FREE_LESSON_ID = "m1-l1";

export const COURSE: Module[] = [
  {
    id: "m1",
    number: 1,
    title: "Fundamentos musicales para dirigir la IA",
    goal: "Entender los elementos que la IA necesita para transformar una idea en música.",
    lessons: [
      {
        id: "m1-l1",
        title: "La IA es tu banda: tú eres el director",
        minutes: 6,
        blocks: [],
      },
      {
        id: "m1-l2",
        title: "Los 5 elementos esenciales",
        minutes: 8,
        blocks: [],
      },
      {
        id: "m1-l3",
        title: "Género, tempo (BPM) y energía",
        minutes: 7,
        blocks: [],
      },
      {
        id: "m1-l4",
        title: "Práctica: tu ficha creativa",
        minutes: 10,
        blocks: [],
      },
    ],
  },
  {
    id: "m2",
    number: 2,
    title: "Anatomía de una canción profesional",
    goal: "Dominar el esqueleto que hace que una canción suene completa y comercial.",
    lessons: [
      {
        id: "m2-l1",
        title: "La estructura base",
        minutes: 7,
        blocks: [],
      },
      {
        id: "m2-l2",
        title: "Reglas de oro de cada sección",
        minutes: 5,
        blocks: [],
      },
    ],
  },
  {
    id: "m3",
    number: 3,
    title: "Composición lírica profesional",
    goal: "Escribir letras que la IA pueda cantar con claridad, emoción y ritmo.",
    lessons: [
      {
        id: "m3-l1",
        title: "Fórmula de letra en 5 pasos",
        minutes: 8,
        blocks: [],
      },
      {
        id: "m3-l2",
        title: "Sílabas, rima y cadencia",
        minutes: 6,
        blocks: [],
      },
      {
        id: "m3-l3",
        title: "Plantilla de letra etiquetada",
        minutes: 8,
        blocks: [],
      },
    ],
  },
  {
    id: "m4",
    number: 4,
    title: "Prompts musicales: estilo, instrumentos y atmósfera",
    goal: "Construir prompts que produzcan un sonido específico, no genérico.",
    lessons: [
      {
        id: "m4-l1",
        title: "La fórmula universal del prompt",
        minutes: 6,
        blocks: [],
      },
      {
        id: "m4-l2",
        title: "Prompts listos para usar",
        minutes: 8,
        blocks: [],
      },
      {
        id: "m4-l3",
        title: "Cómo evitar resultados genéricos",
        minutes: 5,
        blocks: [],
      },
    ],
  },
  {
    id: "m5",
    number: 5,
    title: "Voces, coros y efectos especiales",
    goal: "Controlar quién canta, cómo canta y qué recursos expresivos aparecen.",
    lessons: [
      {
        id: "m5-l1",
        title: "Descriptores vocales",
        minutes: 7,
        blocks: [],
      },
      {
        id: "m5-l2",
        title: "Efectos y recursos especiales",
        minutes: 5,
        blocks: [],
      },
    ],
  },
  {
    id: "m6",
    number: 6,
    title: "Flujo profesional de generación",
    goal: "Convertir una generación prometedora en una versión final consistente.",
    lessons: [
      {
        id: "m6-l1",
        title: "Genera, elige y extiende",
        minutes: 8,
        blocks: [],
      },
      {
        id: "m6-l2",
        title: "Corrige una cosa a la vez",
        minutes: 6,
        blocks: [],
      },
    ],
  },
  {
    id: "m7",
    number: 7,
    title: "Postproducción: stems, limpieza y mezcla",
    goal: "Llevar el audio generado a un nivel pulido y controlable.",
    lessons: [
      {
        id: "m7-l1",
        title: "Separación de pistas (stems)",
        minutes: 6,
        blocks: [],
      },
      {
        id: "m7-l2",
        title: "Mezcla básica y reemplazo vocal",
        minutes: 8,
        blocks: [],
      },
    ],
  },
  {
    id: "m8",
    number: 8,
    title: "Masterización y entrega final",
    goal: "Preparar una versión competitiva para streaming y redes.",
    lessons: [
      {
        id: "m8-l1",
        title: "Checklist y masterización con IA",
        minutes: 6,
        blocks: [],
      },
      {
        id: "m8-l2",
        title: "Tu paquete de entrega profesional",
        minutes: 7,
        blocks: [],
      },
    ],
  },
  {
    id: "m9",
    number: 9,
    title: "Proyecto final: tu primera canción profesional",
    goal: "Crear una canción original de mínimo 2:30 minutos, lista para publicar.",
    lessons: [
      {
        id: "m9-l1",
        title: "La consigna y la plantilla final",
        minutes: 10,
        blocks: [],
      },
      {
        id: "m9-l2",
        title: "Plan de 4 semanas y errores a evitar",
        minutes: 7,
        blocks: [],
      },
    ],
  },
];

export const ALL_LESSONS = COURSE.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleNumber: m.number })));
export const findLesson = (id: string) => ALL_LESSONS.find((l) => l.id === id);

export type Badge = { id: string; name: string; description: string; earned: boolean };

export function computeBadges(completed: Set<string>): Badge[] {
  const moduleDone = (id: string) => COURSE.find((m) => m.id === id)!.lessons.every((l) => completed.has(l.id));
  const modulesDone = COURSE.filter((m) => moduleDone(m.id)).length;
  return [
    { id: "first", name: "Primer acorde", description: "Completa tu primera lección", earned: completed.size >= 1 },
    { id: "lyric", name: "Letrista", description: "Termina el módulo de composición lírica", earned: moduleDone("m3") },
    { id: "prompt", name: "Maestro del prompt", description: "Termina el módulo de prompts musicales", earned: moduleDone("m4") },
    { id: "half", name: "Mitad del camino", description: "Completa 5 módulos", earned: modulesDone >= 5 },
    { id: "mix", name: "Ingeniero de mezcla", description: "Termina postproducción", earned: moduleDone("m7") },
    { id: "pro", name: "Productor IA", description: "Completa todo el curso", earned: completed.size === ALL_LESSONS.length },
  ];
}

export function hasActiveAccess(paidUntil: string | null | undefined, now = new Date()): boolean {
  return !!paidUntil && new Date(paidUntil).getTime() > now.getTime();
}
