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
        blocks: [
          { type: "p", text: "Muchos principiantes creen que la IA hace todo sola. Error. La IA amplifica tu creatividad, pero sigue necesitando dirección humana. Piensa en ella como una banda de músicos de élite esperando instrucciones." },
          { type: "tip", text: "Regla central: la IA no reemplaza tu criterio artístico; ejecuta una dirección clara. Define género, tempo, emoción, instrumentos, voz y estructura." },
          { type: "h", text: "Herramientas que usarás" },
          { type: "table", head: ["Tipo", "Herramientas"], rows: [
            ["Generadores de canciones (texto a música)", "Suno AI, Udio, AIVA, Boomy"],
            ["Voces y clonación", "Kits.ai, ElevenLabs"],
            ["Letras y composición", "ChatGPT, Claude"],
            ["Separación de pistas y edición", "BandLab, LALAL.AI, Moises.ai, LANDR Stems"],
            ["Masterización", "LANDR, eMastered, BandLab Mastering"],
          ] },
          { type: "h", text: "El método en 5 etapas" },
          { type: "list", ordered: true, items: ["Intención creativa", "Letra y estructura", "Prompt musical y generación", "Iteración, edición y mezcla", "Masterización y publicación"] },
        ],
      },
      {
        id: "m1-l2",
        title: "Los 5 elementos esenciales",
        minutes: 8,
        blocks: [
          { type: "table", head: ["Elemento", "Qué controla", "Ejemplo"], rows: [
            ["Ritmo", "El pulso y el groove", "Dembow, four-on-the-floor, beat de trap"],
            ["Melodía", "La línea cantada o instrumental", "La frase melódica del coro"],
            ["Armonía", "Los acordes y la emoción", "C – G – Am – F (la progresión más famosa del pop)"],
            ["Timbre", "El color del sonido", "Piano cálido, guitarra sucia, sintetizador brillante"],
            ["Dinámica", "Subidas y bajadas de energía", "Verso íntimo, coro explosivo"],
          ] },
          { type: "tip", text: "Una buena canción jamás mantiene la misma intensidad todo el tiempo." },
        ],
      },
      {
        id: "m1-l3",
        title: "Género, tempo (BPM) y energía",
        minutes: 7,
        blocks: [
          { type: "p", text: "El tempo se expresa en BPM (pulsos por minuto) y define la sensación física de la canción. Indicar un BPM aproximado orienta mucho a la IA." },
          { type: "table", head: ["Estilo", "BPM", "Sensación"], rows: [
            ["Balada / Lo-Fi", "60–85", "Íntima, melancólica"],
            ["R&B / Pop emocional", "80–105", "Sensual, nostálgica"],
            ["Reggaetón / Urbano", "88–100", "Groove, baile, actitud"],
            ["Pop moderno", "100–125", "Directo, pegajoso"],
            ["House / Dance", "120–128", "Energía continua"],
            ["Synthpop", "110–125", "Retrofuturista, brillante"],
            ["Trap", "130–160", "Tenso, oscuro"],
            ["Rock alternativo", "110–150", "Intenso, expansivo"],
            ["Techno / Drum & Bass", "130–170+", "Hipnótico, físico"],
          ] },
        ],
      },
      {
        id: "m1-l4",
        title: "Práctica: tu ficha creativa",
        minutes: 10,
        blocks: [
          { type: "p", text: "Antes de abrir cualquier herramienta, completa una ficha de 10 puntos. Es tu mapa." },
          { type: "practice", title: "Completa tu ficha", items: ["Tema o historia", "Emoción principal", "Género principal", "Subgénero o influencia", "BPM aproximado", "Instrumentos protagonistas", "Tipo de voz", "Época o estética visual", "Momento de mayor intensidad", "Tipo de final"] },
          { type: "code", label: "Ejemplo", text: "Balada pop latino cinematográfica, nostálgica y esperanzadora, 84 BPM, piano cálido, guitarras suaves, bajo profundo, cuerdas en el clímax, voz femenina íntima con coros amplios, estética nocturna, clímax en el último coro, cierre desvanecido." },
        ],
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
        blocks: [
          { type: "p", text: "Las etiquetas entre corchetes dentro del campo de letra le indican a la IA cómo organizar la canción. El estilo global va en el campo de prompt o estilo." },
          { type: "code", label: "Estructura recomendada", text: "[Intro]\n[Verse 1]\n[Pre-Chorus]\n[Chorus]\n[Post-Chorus]\n[Verse 2]\n[Pre-Chorus]\n[Chorus]\n[Bridge]\n[Final Chorus]\n[Outro]" },
          { type: "table", head: ["Sección", "Función", "Instrucción útil"], rows: [
            ["Intro", "Atmósfera (4, 8 o 16 compases)", "[Intro - ambient pad, soft piano]"],
            ["Verso", "Cuenta la historia", "[Verse 1 - intimate vocals, sparse drums]"],
            ["Pre-coro", "Crea tensión", "[Pre-Chorus - rising energy, drums building]"],
            ["Coro", "El gancho memorable", "[Chorus - explosive, layered harmonies]"],
            ["Post-coro", "Refuerza el hook", "[Post-Chorus - catchy synth melody]"],
            ["Puente", "Sorprende y contrasta", "[Bridge - stripped back, whispered vocals]"],
            ["Solo / Drop", "Momento instrumental", "[Guitar Solo - emotional, wide reverb]"],
            ["Outro", "Cierra la experiencia", "[Outro - fade out, piano and vocals]"],
          ] },
        ],
      },
      {
        id: "m2-l2",
        title: "Reglas de oro de cada sección",
        minutes: 5,
        blocks: [
          { type: "list", items: [
            "La intro debe captar la atención en los primeros 10 segundos.",
            "El verso debe contener imágenes concretas, no solo emociones abstractas.",
            "El pre-coro aumenta la expectativa sin revelar todo.",
            "El coro debe ser simple, repetible y emocional.",
            "El puente debe cambiar algo: acordes, ritmo, perspectiva o intensidad.",
            "El outro debe cerrar, no simplemente cortar.",
          ] },
          { type: "practice", title: "Escucha activa", items: ["Elige tu canción favorita", "Anota el segundo en que empieza cada sección", "Identifica qué cambia en el puente"] },
        ],
      },
    ],
  },
  {
    id: "m3",
    number: 3,
    title: "IA generativa musical y composición controlada",
    goal: "Diseñar una obra musical dirigida por el estudiante: intención, MIDI, armonía, generación reproducible, producción crítica y trazabilidad.",
    lessons: [
      {
        id: "m3-l1",
        title: "Intención artística y ficha de dirección musical",
        minutes: 12,
        blocks: [
          { type: "p", text: "El proyecto se evalúa como una obra musical controlada por IA, no como una colección de audios generados. La herramienta aporta material; el estudiante define la intención, dirige el proceso, selecciona, edita y demuestra por qué la obra funciona." },
          { type: "list", ordered: true, items: ["Definir una idea narrativa o emocional antes de abrir el generador.", "Elegir tempo, tonalidad tentativa, métrica, estructura e instrumentación.", "Separar decisiones humanas, material generado y operaciones automáticas.", "Definir restricciones audibles y criterios de descarte.", "Guardar una ficha creativa que permita explicar las decisiones."] },
          { type: "table", head: ["Decisión", "Responsabilidad del estudiante", "Evidencia"], rows: [["Intención", "Tema, emoción y recorrido dramático", "Ficha creativa"], ["Composición", "Estructura, MIDI, armonía y arreglo", "MIDI base y revisado"], ["Generación", "Prompt, negative prompt, semilla y parámetros", "CSV y JSON"], ["Selección", "Escucha, comparación y descarte", "Matriz A/B"], ["Producción", "Edición, mezcla y master", "WAV, stems y mediciones"], ["Trazabilidad", "Fuentes, licencias y aportes", "Metadatos e informe"]] },
          { type: "code", label: "Ficha creativa de referencia", text: "Título: Memoria de agua\\nEmoción: melancolía esperanzadora\\nNarrativa: recordar un lugar que ya no existe\\nTonalidad tentativa: Re menor\\nTempo: 92 BPM\\nMétrica: 4/4\\nInstrumentos: piano eléctrico, pad, bajo y percusión contenida\\nEstructura: intro, desarrollo, clímax y cierre\\nRestricciones: sin imitar artistas, sin material de terceros sin permiso" },
          { type: "tip", text: "La tonalidad y el tempo de una ficha son hipótesis de composición. Deben contrastarse con el MIDI, el audio y la escucha; escribir «Re menor» en un prompt no demuestra que el render esté en Re menor ni que respete 92 BPM." },
          { type: "practice", title: "Entrega: intención verificable", items: ["Escribe la idea de la obra en una frase concreta.", "Describe qué debe sentir el oyente al inicio, en el clímax y al final.", "Define tres decisiones humanas que no delegarás al generador.", "Redacta cinco criterios auditivos para aceptar o descartar material.", "Guarda la ficha en proyecto_modulo_3/ficha_creativa.md."] },
        ],
      },
      {
        id: "m3-l2",
        title: "MIDI editable y coherencia armónica",
        minutes: 12,
        blocks: [
          { type: "p", text: "MIDI no es audio: registra eventos musicales como altura, duración, tiempo, velocidad e instrumento. Es la base editable que permite revisar acordes, bajo, melodía, arpegios y estructura antes de integrar texturas generadas." },
          { type: "table", head: ["Pista", "Función musical", "Control que debe conservarse"], rows: [["Piano", "Define acordes y pulso armónico", "Voicings, inversiones y dinámica"], ["Bajo", "Ancla raíz, movimiento y groove", "Registro y relación con el bombo"], ["Pad", "Sostiene atmósfera y continuidad", "Duración, densidad y espacio"], ["Melodía", "Aporta identidad reconocible", "Fraseo, motivos y resolución"], ["Arpegio", "Añade movimiento interno", "Subdivisión y notas del acorde"], ["Percusión", "Construye pulso y energía", "Patrón, acentos y transiciones"]] },
          { type: "code", label: "Ejemplo armónico en Re menor", text: "Tonalidad de referencia: D minor\\nProgresión: Dm - Bb - F - C\\nGrados: i - VI - III - VII\\nFunción narrativa: establecimiento, expansión, elevación y expectativa\\nDecisión: usar C antes del regreso a Dm para preparar la resolución" },
          { type: "p", text: "La estimación de tonalidad de music21 y el cifrado romano son ayudas de análisis, no una sentencia musical. Revisa inversiones, notas ajenas, acordes de paso, silencios y contexto de cada sección. Una progresión puede ser funcional y aun así no expresar la intención de la pieza." },
          { type: "list", items: ["Conservar un MIDI base antes de editar.", "Humanizar velocidades y tiempos con moderación y criterio.", "Revisar el registro del bajo para evitar competir con el bombo.", "Crear contraste entre secciones mediante densidad, registro, articulación y dinámica.", "Guardar una segunda exportación como composicion_revisada.mid."] },
          { type: "practice", title: "Entrega: composición simbólica", items: ["Genera o construye un MIDI con acordes, bajo, melodía, arpegio y percusión.", "Abre el MIDI en tu DAW y revisa alturas, duraciones y velocidades.", "Analiza tonalidad y acordes con music21; contrasta el resultado manualmente.", "Explica dónde aparece tensión, dónde resuelve y qué acorde prepara el clímax.", "Guarda analisis/analisis_armonia.txt y el MIDI revisado."] },
        ],
      },
      {
        id: "m3-l3",
        title: "Generación controlada, escucha crítica y trazabilidad",
        minutes: 18,
        blocks: [
          { type: "p", text: "La generación condicionada se dirige mediante prompt, negative prompt, pasos de inferencia, duración, escala de guidance y semilla. Un parámetro solo aporta control cuando se registra, se compara y se relaciona con un cambio audible verificable." },
          { type: "table", head: ["Parámetro", "Qué controla", "Qué documentar"], rows: [["Prompt", "Contenido y carácter buscados", "Texto completo, idioma y versión"], ["Negative prompt", "Elementos que se desea evitar", "Texto completo; no asumir que elimina todo artefacto"], ["Semilla", "Inicialización reproducible", "Entero y entorno"], ["Inference steps", "Número de pasos de denoising", "Valor y coste de generación"], ["Guidance scale", "Fuerza del condicionamiento textual", "Valor; en Diffusers el argumento es guidance_scale"], ["Duración", "Ventana temporal solicitada", "Audio start/end y duración real"], ["Modelo", "Checkpoint y arquitectura", "ID, revisión, librería y licencia"]] },
          { type: "code", label: "Llamada de referencia a Diffusers", text: "result = pipe(\\n    prompt=prompt,\\n    negative_prompt=negative_prompt,\\n    num_inference_steps=50,\\n    guidance_scale=7.0,\\n    audio_end_in_s=10.0,\\n    generator=torch.Generator(device=device).manual_seed(42),\\n)\\naudio = result.audios[0].T.float().cpu().numpy()\\nsample_rate = pipe.vae.sampling_rate\\nsf.write(output_path, audio, sample_rate)" },
          { type: "tip", text: "El argumento actual de StableAudioPipeline es guidance_scale, no guidance. La frecuencia de exportación debe leerse desde pipe.vae.sampling_rate. Stable Audio Open 1.0 genera clips de hasta aproximadamente 47 segundos; una pieza de 60 a 120 segundos requiere arreglo y edición de varios fragmentos, no una sola llamada que exceda el límite del modelo." },
          { type: "table", head: ["Versión", "Única variable modificada", "Resto de controles", "Decisión"], rows: [["A", "Base", "Semilla 42, 50 pasos, guidance 7, 10 s", "Por evaluar"], ["B", "Guidance 6", "Mismo prompt, semilla, pasos y duración", "Por evaluar"], ["C", "Duración 12 s", "Mismo prompt, semilla, pasos y guidance", "Por evaluar"], ["D", "Instrumentación del prompt", "Misma semilla, pasos, guidance y duración", "Por evaluar"], ["E", "Atmósfera del prompt", "Mismos controles que A", "Por evaluar"]] },
          { type: "p", text: "La tabla anterior es un diseño experimental, no un reporte de audios ya generados. No declares que una versión es cálida, oscura, limpia o superior hasta escucharla y registrar la evidencia. Cambia una sola variable por comparación para poder atribuir el efecto." },
          { type: "h", text: "Rúbrica del proyecto final — 100 puntos" },
          { type: "table", head: ["Criterio", "Peso", "Qué debe demostrar"], rows: [["Intención musical", "20%", "Concepto original, emoción, narrativa, estructura e instrumentación funcional"], ["Coherencia armónica", "15%", "Tonalidad contrastada, progresión, tensión/resolución y análisis verificable"], ["Control generativo", "20%", "Prompts, negative prompts, semillas, parámetros y cinco variaciones comparables"], ["Calidad de producción", "15%", "Balance, dinámica, estéreo, ausencia de clipping audible y mediciones"], ["Originalidad", "10%", "Aporte humano visible en arreglo, edición, armonía o procesamiento"], ["Reproducibilidad", "10%", "Código, versiones, comandos, modelos, dependencias y parámetros"], ["Ética y trazabilidad", "10%", "Licencias, fuentes, hashes, metadatos y límites de uso"]] },
          { type: "list", ordered: true, items: ["95–100: excelencia, solo con evidencia completa y defensa oral satisfactoria.", "85–94: destacado, integra intención, armonía, control y producción con criterio.", "70–84: sólido, obra funcional y documentación suficiente.", "0–69: insuficiente, falta control, coherencia o evidencia esencial."] },
          { type: "h", text: "Paquete obligatorio de evidencia" },
          { type: "code", label: "Estructura de entrega", text: "proyecto_modulo_3/\\n├── README.md\\n├── ficha_creativa.md\\n├── midi/composicion_base.mid\\n├── midi/composicion_revisada.mid\\n├── generacion/prompts.csv\\n├── generacion/version_A.wav ... version_E.wav\\n├── analisis/analisis_armonia.txt\\n├── analisis/reportes_generacion.json\\n├── analisis/comparacion_versiones.csv\\n├── produccion/demo_final.wav\\n├── produccion/stems/\\n├── produccion/capturas_cadena.png\\n├── etica/licencias.md\\n├── etica/fuentes.md\\n├── etica/metadatos.json\\n└── informe_final.md" },
          { type: "h", text: "Control de escucha crítica" },
          { type: "table", head: ["Pregunta", "Condición de revisión"], rows: [["Intención y estructura", "¿La emoción evoluciona y el cierre tiene propósito?"], ["Armonía y tempo", "¿La tonalidad y el pulso son consistentes o las desviaciones son intencionales?"], ["Balance", "¿Bajo, bombo, medios y agudos conviven sin enmascaramiento excesivo?"], ["Dinámica y estéreo", "¿Hay expresión, compatibilidad mono y anchura intencional?"], ["Artefactos", "¿Hay clipping, cortes, ruido metálico o transitorios extraños?"], ["Master", "¿LUFS y true peak están medidos y contextualizados, sin perseguir un número arbitrario?"]] },
          { type: "tip", text: "Una respuesta «No» en clipping, artefactos graves, desequilibrio extremo o incoherencia activa una revisión obligatoria. Las métricas automáticas no sustituyen la escucha ni permiten afirmar que una pieza suena profesional por sí sola." },
          { type: "practice", title: "Entrega: obra y defensa", items: ["Genera cinco versiones con una variable controlada por comparación.", "Selecciona fragmentos con criterio auditivo y documenta también los descartes.", "Integra el material en una pieza final y exporta demo, stems y reporte técnico.", "Incluye fuentes, licencias, hashes SHA-256 y aportes humanos.", "Prepara respuestas a: qué controló la IA, qué decidiste tú, qué descartaste y cómo se reproduce el proceso."] },
        ],
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
        blocks: [
          { type: "p", text: "El prompt de estilo describe el carácter global; la letra etiquetada controla cada sección. Esa separación es la base del control profesional." },
          { type: "code", label: "Fórmula", text: "[Género principal] + [Subgénero / época] + [Instrumentos clave] + [Voz] + [Atmósfera / emoción] + [Tempo] + [Calidad de producción]" },
        ],
      },
      {
        id: "m4-l2",
        title: "Prompts listos para usar",
        minutes: 8,
        blocks: [
          { type: "code", label: "Pop synth moderno", text: "Modern synthpop, 80s-inspired, bright analog synthesizers, driving bass, crisp drums, confident female vocal, euphoric and nostalgic, 118 BPM, polished radio-ready production." },
          { type: "code", label: "Balada acústica", text: "Acoustic folk ballad, fingerpicked guitar, warm cello, soft piano, intimate female vocal, melancholic and cinematic, slow tempo around 72 BPM, natural room reverb." },
          { type: "code", label: "Reggaetón oscuro", text: "Modern Latin trap-reggaeton, heavy 808 sub-bass, dembow rhythm, dark synth pads, rhythmic male vocal, seductive and nocturnal, 94 BPM, clean modern urban mix." },
          { type: "code", label: "Rock cinematográfico", text: "Epic alternative rock, distorted guitars, powerful drums, cinematic strings, raspy male vocal, restrained verses, explosive anthemic chorus, 126 BPM, wide cinematic production." },
          { type: "code", label: "Electrónica emocional", text: "Emotional melodic house, warm pads, deep bass, arpeggiated synths, airy female vocal, hopeful and nocturnal, 124 BPM, wide stereo image, festival-ready drop." },
        ],
      },
      {
        id: "m4-l3",
        title: "Cómo evitar resultados genéricos",
        minutes: 5,
        blocks: [
          { type: "list", items: [
            "No escribas solo «pop bonito» o «canción triste».",
            "Añade dos instrumentos protagonistas y una textura distintiva.",
            "Define la dinámica: «versos contenidos, coro expansivo».",
            "Indica producción: analógica, cinematográfica, radio-ready, lo-fi, wide stereo.",
            "Usa referencias de época con cuidado: 80s-inspired, Y2K pop, modern Latin urban.",
          ] },
          { type: "practice", title: "Escribe tu prompt", items: ["Toma tu ficha creativa", "Conviértela en un prompt con la fórmula", "Compáralo con los ejemplos"] },
        ],
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
        blocks: [
          { type: "table", head: ["Objetivo", "Descriptor"], rows: [
            ["Voz femenina cálida", "warm female vocal"],
            ["Voz masculina rasgada", "raspy male vocal"],
            ["Dúo", "male and female dual vocals"],
            ["Susurro", "whispered vocals"],
            ["Potencia", "powerful belting chorus"],
            ["Aire etéreo", "airy ethereal vocals"],
            ["Coros amplios", "layered choral harmonies"],
            ["Voz procesada", "autotuned vocals, reverb-drenched vocals"],
            ["Rap", "rhythmic rap flow, fast rap verse"],
            ["Palabra hablada", "spoken word intro"],
          ] },
          { type: "code", label: "Ejemplo de dirección vocal", text: "Female lead vocal, warm and intimate in the verses, emotional belting in the final chorus, layered harmonies and subtle ad-libs." },
        ],
      },
      {
        id: "m5-l2",
        title: "Efectos y recursos especiales",
        minutes: 5,
        blocks: [
          { type: "code", label: "Etiquetas especiales", text: "[Beat Drop]\n[Guitar Solo - Virtuoso, Heavy Distortion]\n[Silence]\n[Whispered Vocals]\n[Spoken Word Intro]\n[Build-Up]\n[Breakdown]\n[Instrumental Break]" },
          { type: "tip", text: "Cada recurso debe tener una función emocional. Un silencio antes del último coro hace que el regreso del beat sea mucho más impactante." },
        ],
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
        blocks: [
          { type: "list", ordered: true, items: ["Idea y letra", "Prompt de estilo", "Generación base", "Selección de la mejor versión", "Extensión y estructura", "Separación de stems", "Edición, mezcla y masterización", "Entrega final"] },
          { type: "h", text: "Paso 1: el bloque inicial" },
          { type: "p", text: "Introduce el prompt y la primera parte de la letra (Intro + Verso 1 + Pre-coro + Coro). Genera entre 4 y 6 variantes y elige la de mejor afinación, groove, tempo, voz y energía." },
          { type: "h", text: "Paso 2: extiende con intención" },
          { type: "p", text: "Usa «Extend» o «Continuar» desde el segundo deseado y añade el resto de secciones. Ajusta descriptores si el final debe cambiar de intensidad." },
          { type: "code", text: "[Bridge - stripped back, atmospheric, whispered vocals]\n[Final Chorus - full band, layered harmonies, powerful vocals]\n[Outro - fade out, piano and soft vocals]" },
        ],
      },
      {
        id: "m6-l2",
        title: "Corrige una cosa a la vez",
        minutes: 6,
        blocks: [
          { type: "table", head: ["Problema", "Ajuste recomendado"], rows: [
            ["El coro no destaca", "Añade «explosive chorus», «layered harmonies», «wider mix»"],
            ["La voz suena plana", "Define textura y actitud vocal"],
            ["El ritmo no convence", "Cambia BPM, groove o subgénero"],
            ["El final es débil", "Diseña un outro con hook, fade out o cierre instrumental"],
            ["Suena genérico", "Añade un instrumento distintivo y textura de producción"],
            ["Se pierde la estructura", "Refuerza etiquetas y simplifica la letra"],
          ] },
        ],
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
        blocks: [
          { type: "p", text: "Exporta tu canción y sepárala con LALAL.AI, Moises, BandLab o LANDR Stems para trabajar por capas." },
          { type: "table", head: ["Pista", "Uso principal"], rows: [
            ["Voces", "Volumen, afinación, sibilancias y efectos"],
            ["Batería", "Golpe, energía y transiciones"],
            ["Bajo", "Evitar choque con la voz y reforzar el groove"],
            ["Otros / melódicos", "Sintetizadores, guitarras, pianos y pads"],
          ] },
        ],
      },
      {
        id: "m7-l2",
        title: "Mezcla básica y reemplazo vocal",
        minutes: 8,
        blocks: [
          { type: "list", ordered: true, items: [
            "Limpia la voz: ruidos, sibilancias y artefactos.",
            "Recorta graves innecesarios en la voz para que no compitan con el bajo.",
            "Da protagonismo a la voz sobre la instrumental.",
            "Crea profundidad con reverb y delay moderados.",
            "Sube ligeramente el coro y el último estribillo.",
            "Valida en audífonos, bocina de celular, auto y parlante pequeño.",
          ] },
          { type: "tip", text: "Si la voz tiene artefactos, sepárala y aplica otro modelo vocal (Kits.ai, ElevenLabs) conservando melodía y afinación. Verifica siempre permisos y licencias." },
        ],
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
        blocks: [
          { type: "practice", title: "Antes de masterizar", items: ["¿No hay distorsión en los picos?", "¿La voz se entiende siempre?", "¿El bajo no tapa la voz?", "¿La intro engancha?", "¿El coro tiene el mayor impacto?", "¿El final cierra bien?", "¿Suena bien en audífonos y bocinas pequeñas?"] },
          { type: "p", text: "Usa LANDR, eMastered o BandLab Mastering para lograr un volumen estandarizado para Spotify, YouTube y Apple Music." },
        ],
      },
      {
        id: "m8-l2",
        title: "Tu paquete de entrega profesional",
        minutes: 7,
        blocks: [
          { type: "list", items: ["Master final en WAV", "MP3 para revisiones", "Instrumental", "Versiones cortas de 15, 30 y 60 s para TikTok, Reels y Shorts", "Letra final con créditos", "Portada cuadrada legible en miniatura", "Ficha técnica", "Metadatos: título, artista, género, idioma, fecha y derechos"] },
          { type: "code", label: "Ficha técnica", text: "Título:\nArtista:\nGénero:\nSubgénero:\nBPM:\nTonalidad:\nDuración:\nIdioma:\nVoz principal:\nInstrumentos clave:\nEstructura:\nPrompt final:\nHerramientas usadas:\nNotas de mezcla:\nMasterización:\nDerechos y licencia:" },
        ],
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
        blocks: [
          { type: "practice", title: "Tu canción debe incluir", items: ["Estructura completa: intro, verso, pre-coro, coro, puente y outro", "Letra con imágenes concretas y un hook memorable", "Etiquetas en cada sección", "Prompt con género, tempo, instrumentos, voz, emoción y producción", "Al menos tres generaciones comparadas", "Una versión final mejorada", "Master final y paquete de publicación"] },
          { type: "code", label: "Prompt de estilo de ejemplo", text: "Cinematic Latin pop ballad, 84 BPM, nostalgic and hopeful, warm piano, soft electric guitars, deep bass, cinematic strings, intimate female vocal, powerful final chorus with layered harmonies, modern polished production, wide stereo image." },
        ],
      },
      {
        id: "m9-l2",
        title: "Plan de 4 semanas y errores a evitar",
        minutes: 7,
        blocks: [
          { type: "table", head: ["Semana", "Enfoque", "Entregable"], rows: [
            ["1", "Fundamentos, idea y letra", "Ficha creativa + letra etiquetada"],
            ["2", "Tempo, instrumentos, voz y prompts", "Prompt profesional + 5 generaciones"],
            ["3", "Estructura, extensión e iteración", "Mejor versión + correcciones"],
            ["4", "Stems, mezcla, master y entrega", "Canción final + portada + ficha técnica"],
          ] },
          { type: "list", items: ["Generar sin ficha creativa", "Prompts vagos", "Demasiados instrumentos a la vez", "Coros largos o abstractos", "No marcar la estructura", "Aceptar la primera generación", "Corregir muchas variables a la vez", "Publicar sin revisar en varios dispositivos", "Omitir licencias y créditos"] },
          { type: "tip", text: "Un prompt global bien construido, etiquetas estructurales y una postproducción por stems es lo que separa una generación casual de una entrega profesional." },
        ],
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
    { id: "director", name: "Director generativo", description: "Termina el módulo de IA generativa y composición controlada", earned: moduleDone("m3") },
    { id: "prompt", name: "Maestro del prompt", description: "Termina el módulo de prompts musicales", earned: moduleDone("m4") },
    { id: "half", name: "Mitad del camino", description: "Completa 5 módulos", earned: modulesDone >= 5 },
    { id: "mix", name: "Ingeniero de mezcla", description: "Termina postproducción", earned: moduleDone("m7") },
    { id: "pro", name: "Productor IA", description: "Completa todo el curso", earned: completed.size === ALL_LESSONS.length },
  ];
}

export function hasActiveAccess(paidUntil: string | null | undefined, now = new Date()): boolean {
  return !!paidUntil && new Date(paidUntil).getTime() > now.getTime();
}
