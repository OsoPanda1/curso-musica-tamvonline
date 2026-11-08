import type { Block, Lesson } from "@/lib/course-content.server";

/**
 * Supplemental teaching layer kept server-side with the lesson bodies.
 * Each lesson receives a worked example and a concrete learner task.
 */
const ENRICHMENTS: Record<string, Block[]> = {
  "m1-l1": [
    { type: "h", text: "Ejemplo guiado: de una idea a una dirección musical" },
    { type: "p", text: "Idea inicial: recordar a alguien sin caer en una canción completamente triste. Dirección: balada pop latino, nostalgia con esperanza, piano cálido, guitarra limpia, voz íntima y crecimiento de cuerdas en el último coro. La segunda descripción permite tomar decisiones verificables durante la escucha." },
    { type: "practice", title: "Tu primera decisión artística", items: ["Escribe la idea de tu canción en una sola frase.", "Elige una emoción principal y una secundaria.", "Anota tres elementos sonoros que ayuden a comunicar esas emociones.", "Explica qué debería cambiar entre el verso y el coro."] },
  ],
  "m1-l2": [
    { type: "h", text: "Cómo se combinan los cinco elementos" },
    { type: "p", text: "El ritmo hace que el cuerpo perciba el pulso; la melodía organiza las notas que recordamos; la armonía crea contexto emocional; el timbre define el color; y la dinámica controla la intensidad. No son controles aislados: una misma melodía puede sentirse distinta con batería seca o cuerdas amplias." },
    { type: "code", label: "Comparación práctica", text: "Versión A: piano solo, tempo lento, voz cercana y volumen contenido.\nVersión B: misma idea melódica, batería marcada, bajo profundo y coros amplios en el estribillo.\nPregunta de escucha: ¿qué emoción y qué sección cambia más?" },
    { type: "practice", title: "Aísla una variable", items: ["Describe una canción conocida usando ritmo, melodía, armonía, timbre y dinámica.", "Crea dos prompts que solo cambien el timbre instrumental.", "Registra qué cambió y qué se mantuvo igual."] },
  ],
  "m1-l3": [
    { type: "h", text: "BPM: una referencia, no una garantía" },
    { type: "p", text: "El rango de BPM orienta la intención, pero el género, el patrón rítmico y la interpretación también influyen en la sensación. Un tempo de 90 BPM puede sentirse relajado o enérgico según la subdivisión, el acento y la instrumentación." },
    { type: "code", label: "Mismo tema, dos direcciones", text: "A: Latin pop ballad, around 78 BPM, sparse piano, intimate and reflective.\nB: Latin pop, around 112 BPM, syncopated percussion, bright guitars, hopeful and forward-moving." },
    { type: "practice", title: "Prueba de tempo", items: ["Elige una idea de canción.", "Escribe una versión lenta y otra bailable.", "No cambies simultáneamente la emoción y el tema.", "Compara cuál transmite mejor la intención y anota por qué."] },
  ],
  "m1-l4": [
    { type: "h", text: "Plantilla reutilizable de ficha creativa" },
    { type: "code", label: "Ficha para completar", text: "Tema:\nNarrador/personaje:\nDeseo o conflicto:\nEmoción principal:\nEmoción secundaria:\nGénero/subgénero:\nTempo o sensación:\nInstrumentos protagonistas:\nTipo de voz:\nMomento de mayor energía:\nTipo de final:" },
    { type: "practice", title: "Entrega de la lección", items: ["Completa todos los campos con decisiones concretas.", "Convierte la ficha en un prompt de 40 a 80 palabras.", "Subraya las palabras que describen sonido y encierra las que describen emoción.", "Guarda una copia como brief de tu proyecto."] },
  ],
  "m2-l1": [
    { type: "h", text: "Ejemplo de estructura con intención" },
    { type: "p", text: "Una estructura no es una fórmula obligatoria; es una manera de administrar atención. Si la canción empieza demasiado llena, queda poco espacio para crecer. Si el coro repite exactamente la energía del verso, puede perder contraste." },
    { type: "code", label: "Mapa de dinámica", text: "[Intro - 4 bars, piano and ambience]\n[Verse 1 - intimate, sparse arrangement]\n[Pre-Chorus - rising tension, drums build]\n[Chorus - full drums, wider harmonies]\n[Verse 2 - new detail, slightly fuller]\n[Bridge - strip back, change perspective]\n[Final Chorus - strongest energy]\n[Outro - resolve the main motif]" },
    { type: "practice", title: "Dibuja el recorrido", items: ["Marca cada sección de una canción que conozcas.", "Asigna a cada sección una intensidad del 1 al 5.", "Propón un cambio concreto para que el puente contraste con el coro."] },
  ],
  "m2-l2": [
    { type: "h", text: "Ejemplo: convertir una emoción en una escena" },
    { type: "p", text: "En lugar de escribir «estoy muy triste», describe una imagen que el oyente pueda imaginar: «tu taza sigue junto a la ventana». La escena concreta da información al verso; el coro puede convertirla en una frase breve que resuma el conflicto." },
    { type: "code", label: "Antes y después", text: "Genérico: Me siento solo y te extraño.\nMás visual: La luz del pasillo sigue encendida, aunque ya no vas a regresar.\nHook posible: Dejé la luz por si vuelves." },
    { type: "practice", title: "Revisión estructural", items: ["Escribe una línea abstracta sobre una emoción.", "Reescríbela con un objeto, lugar o acción observable.", "Comprueba que el coro se pueda recordar después de una sola escucha."] },
  ],
  "m3-l1": [
    { type: "h", text: "La obra, no el conjunto de renders" },
    { type: "p", text: "El proyecto final debe comunicar una intención musical que exista antes de generar. El estudiante conserva la dirección artística: define qué quiere comunicar, qué elementos necesita, qué se puede delegar al modelo y qué decisiones requieren edición humana." },
    { type: "table", head: ["Campo", "Qué documentar"], rows: [["Título y narrativa", "Nombre provisional, tema, personaje o situación"], ["Emoción", "Emoción principal y evolución entre secciones"], ["Lenguaje musical", "Género de referencia, tonalidad tentativa, tempo y métrica"], ["Arreglo", "Instrumentos protagonistas y función de cada uno"], ["Estructura", "Intro, desarrollo, clímax, transición y cierre"], ["Restricciones", "Qué evitar, qué no imitar y qué materiales no usar"]] },
    { type: "code", label: "Ejemplo de intención", text: "Título: Memoria de agua\\nIdea: recordar un lugar que ya no existe\\nEmoción: melancolía contenida que evoluciona hacia esperanza\\nDirección: piano cercano al inicio, pad progresivo, bajo y percusión en el desarrollo, clímax más amplio y cierre despejado\\nDecisión humana: armonía, estructura, edición y selección final" },
    { type: "tip", text: "Este ejemplo es una plantilla didáctica, no evidencia de una obra terminada. No atribuyas al audio cualidades que no hayas comprobado mediante escucha y documentación." },
    { type: "practice", title: "Construye tu brief", items: ["Completa título, narrativa, emoción principal y secundaria.", "Define tempo, tonalidad y métrica como hipótesis iniciales.", "Asigna una función a cada instrumento.", "Describe el cambio de energía entre intro, desarrollo, clímax y cierre.", "Especifica qué no quieres imitar y qué materiales quedan excluidos."] },
  ],
  "m3-l2": [
    { type: "h", text: "MIDI: la maqueta editable" },
    { type: "p", text: "La base MIDI debe permitir que otra persona inspeccione cada pista. Separa acordes, bajo, melodía, arpegio y percusión; documenta tempo, métrica, tonalidad estimada, compases, articulación y cambios que realizaste después de escucharla." },
    { type: "code", label: "Progresión de ejemplo", text: "Dm - Bb - F - C\\ni - VI - III - VII en Re menor\\nD3-F3-A3 | Bb3-D4-F4 | F3-A3-C4 | C3-E3-G3" },
    { type: "p", text: "La progresión i–VI–III–VII es una posible lectura funcional de Dm–Bb–F–C en Re menor natural. La función expresiva depende del contexto, la melodía, el bajo, la duración y la conducción de voces; no basta con imprimir números romanos." },
    { type: "table", head: ["Análisis", "Herramienta", "Validación humana"], rows: [["Tonalidad probable", "music21 analyze(key)", "Contrastar notas, cadencias y contexto"], ["Acordes simultáneos", "chordify()", "Revisar inversiones y notas de paso"], ["Grados romanos", "romanNumeralFromChord()", "Corregir lecturas ambiguas"], ["Estructura", "DAW y marcadores MIDI", "Comprobar contraste y desarrollo"]] },
    { type: "practice", title: "Audita la armonía", items: ["Genera el MIDI base y guarda una copia sin editar.", "Modifica voicings, velocidades, registro y estructura en el DAW.", "Ejecuta el análisis armónico sobre el MIDI revisado.", "Anota tonalidad estimada, acordes, función y puntos de tensión.", "Explica qué mantuviste, qué cambiaste y por qué."] },
  ],
  "m3-l3": [
    { type: "h", text: "Controla el experimento generativo" },
    { type: "p", text: "StableAudioPipeline recibe prompt, negative_prompt, num_inference_steps, guidance_scale, audio_end_in_s y generator. El nombre exacto del parámetro importa: guidance no sustituye a guidance_scale en la API de Diffusers. La semilla permite repetir una configuración dentro de un entorno comparable, pero no garantiza identidad bit a bit entre hardware, versiones o kernels." },
    { type: "table", head: ["Parámetro", "Registro obligatorio"], rows: [["Modelo", "ID, revisión, fecha y versión de Diffusers"], ["Prompt y negative prompt", "Texto íntegro, no solo una descripción"], ["Semilla", "Número entero y dispositivo"], ["Pasos", "num_inference_steps"], ["Guidance", "guidance_scale"], ["Duración", "audio_start_in_s y audio_end_in_s"], ["Salida", "sample rate desde pipe.vae.sampling_rate, canales y formato"]] },
    { type: "code", label: "Diseño A–E: cambiar una variable", text: "A: base — semilla 42, 50 pasos, guidance 7.0, 10 s\\nB: guidance 6.0 — todo lo demás igual que A\\nC: duración 12 s — todo lo demás igual que A\\nD: cambiar solo la instrumentación del prompt\\nE: cambiar solo la atmósfera del prompt\\nDecisión de cada versión: por evaluar después de generar y escuchar" },
    { type: "tip", text: "Stable Audio Open 1.0 ofrece generación variable de hasta aproximadamente 47 segundos y salida estéreo a 44.1 kHz según su model card. La licencia del modelo es Stability AI Community License; para uso comercial hay que revisar y obtener la licencia comercial correspondiente. No asumas que el audio generado queda automáticamente autorizado para cualquier explotación." },
    { type: "h", text: "Rúbrica ponderada del proyecto" },
    { type: "table", head: ["Criterio", "Peso", "Evidencia mínima"], rows: [["Intención musical", "20%", "Concepto, emoción, estructura y decisiones explicadas"], ["Coherencia armónica", "15%", "Tonalidad, progresión, tensión/resolución y análisis"], ["Control generativo", "20%", "Prompt, negative prompt, semillas, parámetros y cinco versiones"], ["Calidad de producción", "15%", "Balance, dinámica, estéreo, mediciones y escucha A/B"], ["Originalidad", "10%", "Edición, arreglo o decisiones propias identificables"], ["Reproducibilidad", "10%", "Código, entorno, comandos, modelos y registros"], ["Ética y trazabilidad", "10%", "Fuentes, licencias, metadatos, hashes y límites"]] },
    { type: "table", head: ["Nivel", "Calificación", "Condición"], rows: [["Insuficiente", "0–69", "Control, coherencia o evidencia incompletos"], ["Sólido", "70–84", "Pieza funcional y documentada"], ["Destacado", "85–94", "Integra control, composición y producción con criterio"], ["Excelencia", "95–100", "Evidencia completa, reproducibilidad y defensa oral satisfactoria"]] },
    { type: "h", text: "Paquete de entrega" },
    { type: "code", label: "Carpetas mínimas", text: "proyecto_modulo_3/\\n  README.md\\n  ficha_creativa.md\\n  midi/composicion_base.mid\\n  midi/composicion_revisada.mid\\n  generacion/prompts.csv\\n  generacion/version_A.wav ... version_E.wav\\n  analisis/analisis_armonia.txt\\n  analisis/reportes_generacion.json\\n  analisis/comparacion_versiones.csv\\n  produccion/demo_final.wav\\n  produccion/stems/\\n  produccion/capturas_cadena.png\\n  etica/licencias.md\\n  etica/fuentes.md\\n  etica/metadatos.json\\n  informe_final.md" },
    { type: "h", text: "Escucha crítica obligatoria" },
    { type: "list", items: ["La pieza sostiene una intención clara y evoluciona.", "Tonalidad, tempo y progresión son consistentes o sus desviaciones están justificadas.", "Bombo y bajo conviven sin enmascaramiento severo.", "Los agudos no fatigan y el elemento principal permanece inteligible.", "La dinámica conserva expresión y la imagen estéreo es compatible en mono.", "No hay clipping audible, cortes abruptos ni artefactos graves sin resolver.", "LUFS, peak y true peak se miden y documentan, sin usar un número como sustituto de calidad."] },
    { type: "tip", text: "Las mediciones automáticas no identifican de forma fiable todos los artefactos musicales ni certifican una mezcla profesional. El reporte marca lo que mide; el estudiante debe escuchar, describir y decidir." },
    { type: "h", text: "Defensa oral" },
    { type: "list", ordered: true, items: ["¿Qué emoción y narrativa definiste y cómo se escuchan?", "¿Por qué escogiste tonalidad, tempo y estructura?", "¿Qué parte fue decisión humana y qué produjo el modelo?", "¿Qué cambiaste entre A y E y qué efecto escuchaste?", "¿Qué versiones descartaste y por qué?", "¿Qué artefactos detectaste y cómo los corregiste?", "¿Qué licencias y fuentes aplican?", "¿Cómo puede otra persona reconstruir el proceso?", "¿Qué mejorarías con más tiempo o recursos?"] },
    { type: "practice", title: "Cierra el proyecto", items: ["Completa la rúbrica con evidencia real, no con adjetivos.", "Guarda el SHA-256 de los archivos finales y los prompts completos.", "Adjunta licencias, fuentes, versiones y decisiones de edición.", "Prepara una escucha A/B con fragmentos claramente identificados.", "Ensaya una defensa oral que distinga decisiones humanas, generación y mediciones."] },
  ],
  "m4-l1": [
    { type: "h", text: "Ejemplo completo y diagnóstico" },
    { type: "code", label: "Prompt de partida", text: "Modern Latin pop ballad, around 84 BPM, warm piano, clean electric guitar, deep bass, intimate female lead, nostalgic but hopeful mood, restrained verses and a wide cinematic final chorus, polished modern mix." },
    { type: "p", text: "Si el resultado es demasiado electrónico, especifica instrumentos acústicos y reduce los sintetizadores. Si el coro no crece, describe qué debe entrar en esa sección. Evita añadir descriptores nuevos hasta identificar qué variable falló." },
    { type: "practice", title: "Tres variaciones controladas", items: ["Crea una versión acústica, una synthpop y una urbana de la misma idea.", "Conserva tema y emoción en las tres.", "Cambia únicamente el lenguaje sonoro y compara el resultado."] },
  ],
  "m4-l2": [
    { type: "h", text: "Cómo adaptar un prompt sin copiarlo a ciegas" },
    { type: "p", text: "Los ejemplos son puntos de partida, no recetas universales. Adapta la voz, los instrumentos y la dinámica a la historia que quieres contar. Si el prompt mezcla demasiados géneros, elimina los que no aporten una función clara." },
    { type: "practice", title: "Personaliza un ejemplo", items: ["Elige uno de los prompts de esta lección.", "Cambia el tema emocional y dos instrumentos.", "Explica qué mantuviste y por qué.", "Genera dos versiones y compara claridad, voz y estructura."] },
  ],
  "m4-l3": [
    { type: "h", text: "Diagnóstico de un resultado genérico" },
    { type: "p", text: "Un resultado genérico suele venir de instrucciones intercambiables: «buena voz», «sonido moderno», «canción triste». Sustitúyelas por detalles audibles, como voz cercana con respiración natural, bajo redondo, batería seca o un coro que se abre con armonías." },
    { type: "code", label: "Mejora incremental", text: "Antes: Sad pop song with female vocals.\nDespués: Intimate indie-pop ballad, soft felt piano, muted drums, airy female lead, nostalgic and restrained verses, gradual lift into a warm layered chorus, natural room reverb." },
    { type: "practice", title: "Reescritura", items: ["Toma un prompt de menos de diez palabras.", "Añade dos elementos instrumentales y un descriptor vocal.", "Define el contraste entre verso y coro.", "Elimina cualquier adjetivo que no puedas relacionar con un sonido concreto."] },
  ],
  "m5-l1": [
    { type: "h", text: "Dirige interpretación, no identidades ajenas" },
    { type: "p", text: "Describe el carácter vocal con términos generales: registro percibido, energía, aire, aspereza, proximidad, armonías y articulación. Evita imitar sin permiso la voz de una persona real o usar una clonación sin consentimiento." },
    { type: "code", label: "Dirección vocal por secciones", text: "[Verse - close, breathy, restrained lead vocal]\n[Chorus - stronger projection, double-tracked harmonies]\n[Bridge - softer delivery, almost spoken]\n[Final Chorus - fuller harmonies, controlled intensity]" },
    { type: "practice", title: "Mapa vocal", items: ["Define cómo debe sentirse la voz en verso, coro y puente.", "Elige dos descriptores por sección.", "Escucha si la interpretación cambia sin perder coherencia."] },
  ],
  "m5-l2": [
    { type: "h", text: "Efectos con propósito narrativo" },
    { type: "p", text: "Un drop, silencio, solo o susurro funciona mejor cuando prepara o resalta un momento. Si se usan efectos sin función, distraen de la canción. Prueba primero un único recurso y comprueba si aumenta el impacto." },
    { type: "practice", title: "Diseña un momento memorable", items: ["Elige el instante de mayor tensión de tu canción.", "Añade un silencio breve, un build-up o un break instrumental.", "Explica qué espera sentir el oyente antes y después.", "Compara una versión con efecto y otra sin él."] },
  ],
  "m6-l1": [
    { type: "h", text: "Criterios para elegir la mejor generación" },
    { type: "p", text: "No elijas solo por el primer impacto. Evalúa si la voz comunica la letra, si el pulso se mantiene, si el coro destaca, si la estructura tiene sentido y si hay artefactos evidentes. Conserva el identificador o nombre de cada versión para poder comparar." },
    { type: "table", head: ["Criterio", "Pregunta de evaluación"], rows: [["Voz", "¿Se entiende y transmite la intención?"], ["Ritmo", "¿El groove se mantiene estable?"], ["Estructura", "¿Las secciones llegan en el orden esperado?"], ["Producción", "¿Hay distorsiones o cortes evidentes?"], ["Identidad", "¿Tiene un detalle memorable?"]] },
    { type: "practice", title: "Matriz de selección", items: ["Genera varias versiones si la herramienta lo permite.", "Puntúa cada criterio del 1 al 5.", "Selecciona por balance, no solo por volumen.", "Anota una mejora concreta para la versión elegida."] },
  ],
  "m6-l2": [
    { type: "h", text: "Un cambio por iteración" },
    { type: "p", text: "Si cambias género, tempo, voz y letra al mismo tiempo, no sabrás qué provocó la mejora o el empeoramiento. Formula una hipótesis, cambia una variable y vuelve a escuchar en condiciones parecidas." },
    { type: "code", label: "Registro de iteración", text: "Problema observado: el coro no contrasta.\nHipótesis: la instrumentación permanece demasiado contenida.\nCambio único: añadir batería completa y armonías al coro.\nResultado: anotar si aumenta el contraste sin tapar la voz." },
    { type: "practice", title: "Bitácora de tres intentos", items: ["Describe un problema audible.", "Formula una hipótesis sobre su causa.", "Haz un solo cambio.", "Registra el resultado y decide si conservarlo."] },
  ],
  "m7-l1": [
    { type: "h", text: "Comprueba los stems antes de mezclar" },
    { type: "p", text: "La separación automática puede dejar residuos, filtrado o fragmentos de otros instrumentos en cada pista. Escucha cada stem solo y luego junto a los demás. No asumas que una separación perfecta está garantizada." },
    { type: "practice", title: "Inspección de pistas", items: ["Exporta las pistas separadas en el mismo punto de inicio.", "Escucha voz, batería, bajo y acompañamiento por separado.", "Marca artefactos o pérdidas importantes.", "Alinea todas las pistas y comprueba la suma contra el archivo original."] },
  ],
  "m7-l2": [
    { type: "h", text: "Mezcla con referencias y margen" },
    { type: "p", text: "Ajusta el balance antes de añadir efectos. Compara con una referencia del mismo estilo a volumen parecido. Evita perseguir volumen excesivo en la mezcla: conserva margen y revisa que la voz no quede enterrada cuando se escucha en un teléfono." },
    { type: "practice", title: "Prueba de traducción", items: ["Escucha la mezcla con audífonos, teléfono y bocina pequeña.", "Anota si la voz, el bajo y el ritmo siguen siendo claros.", "Corrige primero el balance y después los efectos.", "Guarda una versión anterior para comparar objetivamente."] },
  ],
  "m8-l1": [
    { type: "h", text: "Masterizar no repara una mezcla rota" },
    { type: "p", text: "La masterización ajusta el archivo estéreo final; no sustituye una mezcla equilibrada. Revisa distorsión, clics, silencios involuntarios, inicio, final y consistencia de volumen. Las plataformas pueden normalizar la reproducción, así que no existe un único nivel de sonoridad ideal para todo contexto." },
    { type: "practice", title: "Control previo a entrega", items: ["Escucha el archivo completo sin saltos.", "Comprueba que el inicio y el final no estén cortados.", "Revisa picos y distorsión audible.", "Exporta un archivo sin pérdida y una copia comprimida para revisión.", "Registra herramienta y ajustes usados."] },
  ],
  "m8-l2": [
    { type: "h", text: "Metadatos, licencias y trazabilidad" },
    { type: "p", text: "El paquete de entrega debe permitir identificar la versión final y las herramientas usadas. Guarda la letra, el prompt, las versiones principales, las licencias aplicables y los permisos necesarios. Las condiciones comerciales dependen de cada servicio y pueden cambiar; verifícalas antes de publicar o monetizar." },
    { type: "practice", title: "Cierre del proyecto", items: ["Nombra los archivos con título, versión y fecha.", "Incluye master, instrumental y cortes promocionales si los necesitas.", "Completa la ficha técnica y los créditos.", "Verifica derechos, licencias y permisos antes de distribuir."] },
  ],
  "m9-l1": [
    { type: "h", text: "Rúbrica del proyecto final" },
    { type: "table", head: ["Área", "Evidencia mínima"], rows: [["Concepto", "Tema y emoción identificables"], ["Composición", "Letra estructurada y hook memorable"], ["Dirección musical", "Prompt reproducible y etiquetas claras"], ["Iteración", "Comparación documentada de versiones"], ["Entrega", "Archivo final revisado y ficha técnica"], ["Derechos", "Licencias y permisos comprobados"]] },
    { type: "practice", title: "Prepara tu entrega", items: ["Crea una carpeta para proyecto, versiones, stems y master.", "Guarda el prompt definitivo y la letra etiquetada.", "Escribe tres decisiones que mejoraron el resultado.", "Prepara una breve explicación de tu proceso creativo."] },
  ],
  "m9-l2": [
    { type: "h", text: "Cómo sostener una rutina creativa" },
    { type: "p", text: "Una rutina semanal funciona mejor si cada sesión termina con un entregable verificable. No dediques todo el tiempo a generar variaciones: reserva sesiones para escuchar, editar, documentar y comprobar derechos." },
    { type: "practice", title: "Plan personal", items: ["Reserva dos sesiones de creación y una de evaluación por semana.", "Define una meta concreta para cada sesión.", "Guarda una bitácora de decisiones y versiones.", "Al final de cuatro semanas, revisa el resultado con la rúbrica del proyecto."] },
  ],
};

export function enrichLesson(lesson: Lesson): Lesson {
  const extra = ENRICHMENTS[lesson.id] ?? [];
  return extra.length ? { ...lesson, blocks: [...lesson.blocks, ...extra] } : lesson;
}
