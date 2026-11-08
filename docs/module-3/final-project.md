# Proyecto final — Módulo 3
## Obra musical controlada por IA

**Principio de evaluación:** no se califica la mera generación de audios. Se evalúa una obra musical en la que el estudiante demuestre intención artística, control técnico, criterio de selección, producción audible, reproducibilidad, trazabilidad y capacidad de defender sus decisiones.

La regla central es separar siempre tres elementos:

1. **Qué hizo la IA:** material, variaciones o sugerencias que produjo el modelo.
2. **Qué decidió el estudiante:** intención, composición, arreglo, parámetros, selección, edición y producción.
3. **Qué evidencia respalda la afirmación:** MIDI, prompts, semillas, registros, audio, mediciones, escucha y licencias.

No se otorga excelencia por el volumen de archivos generados, por la sofisticación aparente del prompt ni por alcanzar una cifra aislada de LUFS.

## 1. Objetivos verificables

1. Definir una intención artística antes de generar.
2. Construir una base MIDI estructurada, editable y revisable.
3. Controlar prompts, negative prompts, semillas y parámetros de generación.
4. Diseñar al menos cinco variaciones comparables cambiando una variable por vez.
5. Seleccionar y editar material mediante escucha crítica.
6. Entregar una producción final con mediciones y revisión auditiva.
7. Documentar procedencia, licencias, aportes humanos y límites.
8. Explicar la relación entre decisiones musicales y resultado audible durante una defensa oral.

## 2. Rúbrica principal — 100 puntos

| Criterio | Peso | Excelente (85–100) | Sólido (70–84) | Insuficiente (0–69) |
|---|---:|---|---|---|
| Intención musical | 20% | Concepto original, emoción clara y sostenida, estructura narrativa e instrumentación funcional | Idea clara con desarrollo limitado | Concepto genérico o ausente |
| Coherencia armónica | 15% | Tonalidad contrastada, progresión con propósito, tensión/resolución y transiciones justificadas | Armonía funcional pero predecible | Armonía incoherente o sin análisis |
| Control generativo | 20% | Prompts, negative prompts, semillas y parámetros comparados; variaciones controladas y descartes justificados | Parámetros básicos documentados | Generación aleatoria sin trazabilidad |
| Calidad de producción | 15% | Balance, dinámica, espacio estéreo, edición limpia y mediciones contextualizadas | Producción aceptable con defectos menores | Clipping, desequilibrio o ausencia de revisión |
| Originalidad | 10% | Decisiones humanas identificables en composición, arreglo, edición o procesamiento | Aporte personal limitado | Audio generado sin transformación ni justificación |
| Reproducibilidad | 10% | Código, versiones, comandos, modelos, dependencias, semillas y rutas documentados | Proceso parcialmente reconstruible | No se puede reconstruir |
| Ética y trazabilidad | 10% | Fuentes, licencias, permisos, metadatos, hash y límites documentados | Documentación parcial | Material sin procedencia ni derechos revisados |

**Fórmula:** suma de cada calificación de 0 a 100 multiplicada por su peso expresado como fracción. Aprobación: 70. Dominio sólido: 85. Excelencia: 95 o más, con evidencia completa y defensa oral satisfactoria.

## 3. Desglose analítico por criterio

### 3.1 Intención musical — 20 puntos

| Subcriterio | Máximo | Evidencia de excelencia |
|---|---:|---|
| Concepto creativo | 5 | Idea específica, propia y comprensible en una frase |
| Emoción y narrativa | 4 | Evolución emocional reconocible entre inicio, desarrollo y cierre |
| Tonalidad y tempo | 4 | Elección razonada y contrastada con el material real |
| Estructura | 4 | Intro, desarrollo, clímax y cierre con contraste intencional |
| Instrumentación | 3 | Cada instrumento cumple una función musical concreta |

**Pregunta central:** ¿la pieza comunica una idea clara?

Una respuesta insuficiente sería «usé IA porque sonaba bien». Una explicación sólida relaciona la emoción con decisiones audibles: registro, densidad, tempo, armonía, timbre, dinámica, silencios y evolución estructural.

### 3.2 Coherencia armónica — 15 puntos

| Subcriterio | Máximo | Evidencia de excelencia |
|---|---:|---|
| Tonalidad | 3 | Centro tonal identificable y contrastado con notas y cadencias |
| Progresión | 4 | Función armónica, tensión y resolución explicadas |
| Relación entre secciones | 4 | Contraste armónico o de conducción de voces con propósito |
| Análisis armónico | 2 | Reporte reproducible con music21 y revisión manual |
| Transiciones | 2 | Cadencias, acordes de paso o transiciones justificadas |

**Ejemplo de análisis que debe verificarse, no copiarse como resultado:**

~~~~text
Tonalidad estimada: D minor
Progresión de referencia: Dm - Bb - F - C
Grados posibles: i - VI - III - VII
Hipótesis expresiva: establecimiento, expansión, elevación y expectativa
Validación: revisar inversiones, melodía, bajo, notas ajenas y cadencia final
~~~~

music21 permite estimar tonalidad, formar una vista armónica mediante chordify y proponer numerales romanos. El resultado es una estimación computacional, no una demostración automática de función musical. El estudiante debe inspeccionar el MIDI y escuchar las transiciones.

### 3.3 Control generativo — 20 puntos

| Subcriterio | Máximo | Evidencia de excelencia |
|---|---:|---|
| Prompt principal | 5 | Descriptores musicales específicos, intención y restricciones |
| Negative prompt | 3 | Exclusiones relacionadas con problemas observados |
| Semillas | 3 | Semillas registradas y comparadas |
| Parámetros | 3 | Pasos, guidance_scale, duración y modelo documentados |
| Variaciones | 5 | Cinco versiones comparables y cambios controlados |

**Pregunta central:** ¿el estudiante dirigió la generación o solo aceptó el primer resultado?

La ficha de cada generación debe registrar como mínimo: modelo y revisión; fecha y hora; prompt y negative prompt íntegros; semilla; pasos de inferencia; guidance_scale; duración solicitada y real; versión de Diffusers y PyTorch; hardware; formato; sample rate; canales; nombre del archivo y SHA-256; decisión razonada.

#### Experimento A–E

Mantén todos los controles constantes salvo la variable indicada.

| Versión | Variable controlada | Resto de parámetros |
|---|---|---|
| A | Línea base | Semilla 42, 50 pasos, guidance 7.0, 10 s |
| B | Cambia únicamente guidance_scale a 6.0 | Mismo prompt, seed, pasos y duración |
| C | Cambia únicamente duración a 12 s | Mismo prompt, seed, pasos y guidance |
| D | Cambia únicamente instrumentación descrita | Mismo seed, pasos, guidance y duración |
| E | Cambia únicamente atmósfera descrita | Mismo seed, pasos, guidance y duración |

El CSV de ejemplo mantiene las decisiones como **por evaluar**. No se deben rellenar resultados auditivos antes de generar y escuchar los archivos. Cambiar simultáneamente prompt, semilla, duración y guidance impide atribuir de manera razonable la diferencia a una sola variable.

### 3.4 Calidad de producción — 15 puntos

| Subcriterio | Máximo | Evidencia de excelencia |
|---|---:|---|
| Balance espectral | 3 | Graves, medios y agudos equilibrados según la función del arreglo |
| Presencia del elemento principal | 3 | Melodía, motivo o voz inteligible |
| Dinámica | 3 | Transitorios y expresión conservados |
| Imagen estéreo | 2 | Anchura intencional y compatibilidad mono revisada |
| Masterización | 2 | LUFS y true peak medidos con herramientas adecuadas |
| Coherencia global | 2 | Secciones integradas como una sola obra |

**Pregunta central:** ¿la producción es musicalmente convincente y técnicamente controlada?

Evidencia mínima: demo_final.wav; reporte técnico de loudness integrada; sample peak y true peak; gráfica espectral; comparación A/B a nivel igualado; notas de escucha crítica; capturas de la cadena de producción; stems alineados desde el mismo punto temporal, cuando correspondan.

No se premia llegar a una cifra LUFS específica. Un archivo puede tener un nivel de loudness adecuado y seguir sonando aplastado, desequilibrado, con artefactos o sin intención.

### 3.5 Originalidad — 10 puntos

| Subcriterio | Máximo | Evidencia de excelencia |
|---|---:|---|
| Decisión armónica propia | 3 | Reescritura, reharmonización o conducción de voces original |
| Edición del material IA | 3 | Cortes, inversión, filtrado, sincronización, procesamiento o reorganización |
| Arreglo propio | 2 | Capas, dinámica, estructura y transiciones aportadas por el estudiante |
| Identidad artística | 2 | Lenguaje propio y no una imitación de una persona concreta |

**Pregunta central:** ¿qué aporta el estudiante que el modelo no habría entregado por sí solo?

Se deben evitar la imitación de artistas específicos y el uso de voces, grabaciones, letras, muestras o datasets sin permiso o licencia aplicable.

### 3.6 Reproducibilidad — 10 puntos

| Subcriterio | Máximo | Evidencia de excelencia |
|---|---:|---|
| README | 2 | Instrucciones completas y ordenadas |
| Dependencias | 2 | Versiones de librerías y entorno documentados |
| Comandos | 2 | Comandos ejecutables y rutas claras |
| Semillas y prompts | 2 | Registro completo de todas las generaciones |
| Datos y modelos | 2 | Modelo, revisión, licencia y procedencia identificados |

La prueba de reproducibilidad debe permitir a otra persona regenerar una versión comparable. La identidad bit a bit puede variar con hardware, kernels, versiones de librerías y operadores no deterministas; esas diferencias deben declararse.

### 3.7 Ética y trazabilidad — 10 puntos

| Subcriterio | Máximo | Evidencia de excelencia |
|---|---:|---|
| Licencias | 3 | Herramientas, modelos, fuentes y materiales externos identificados |
| Autoría | 2 | Aportes humanos y asistencia IA separados |
| Metadatos | 2 | Campos completos y verificables |
| Derechos de terceros | 2 | Autorizaciones y limitaciones revisadas |
| Trazabilidad | 1 | Fecha, versión, procedencia y SHA-256 |

Un hash acredita identidad e integridad de un archivo concreto; no acredita autoría, copyright, titularidad ni permiso comercial.

## 4. Paquete obligatorio de evidencia

~~~~text
proyecto_modulo_3/
├── README.md
├── ficha_creativa.md
├── midi/
│   ├── composicion_base.mid
│   └── composicion_revisada.mid
├── generacion/
│   ├── prompts.csv
│   ├── version_A.wav
│   ├── version_B.wav
│   ├── version_C.wav
│   ├── version_D.wav
│   └── version_E.wav
├── analisis/
│   ├── analisis_armonia.txt
│   ├── reportes_generacion.json
│   └── comparacion_versiones.csv
├── produccion/
│   ├── demo_final.wav
│   ├── stems/
│   └── capturas_cadena.png
├── etica/
│   ├── licencias.md
│   ├── fuentes.md
│   └── metadatos.json
└── informe_final.md
~~~~

La ausencia de un archivo repercute en el criterio correspondiente. No se deben inventar archivos, mediciones, licencias, decisiones ni resultados para completar el paquete.

## 5. Rúbrica de escucha crítica

| Pregunta | Registro |
|---|---|
| ¿La intención se percibe desde el inicio? | Sí / Parcial / No + marca temporal |
| ¿La tonalidad y el tempo son consistentes o sus cambios tienen intención? | |
| ¿Existe contraste entre secciones? | |
| ¿La melodía o elemento principal es inteligible? | |
| ¿Bombo y bajo conviven sin enmascaramiento excesivo? | |
| ¿Los agudos son agradables y no fatigan? | |
| ¿La dinámica conserva expresión? | |
| ¿La imagen estéreo es intencional y compatible en mono? | |
| ¿Hay clipping, cortes, ruido metálico o artefactos? | |
| ¿El final resuelve o deja una intención clara? | |

Una respuesta «No» en clipping, artefactos graves, desequilibrio extremo o incoherencia activa una revisión obligatoria antes de asignar excelencia. La escucha debe indicar marcas de tiempo y describir lo que realmente se percibió.

## 6. Modelo de metadatos

~~~~json
{
  "titulo": "Memoria de agua",
  "autor_humano": "Nombre del estudiante",
  "asistencia_ia": true,
  "modelo_generativo": "Stable Audio",
  "version_modelo": "stable-audio-open-1.0",
  "semilla": 42,
  "prompt": "Cinematic ambient pad in D minor...",
  "negative_prompt": "low quality, clipping...",
  "fecha_generacion_utc": "2026-11-07T00:00:00Z",
  "parametros": {
    "num_inference_steps": 50,
    "guidance_scale": 7.0,
    "audio_start_in_s": 0.0,
    "audio_end_in_s": 10.0
  },
  "sample_rate_hz": 44100,
  "licencia_modelo": "Verificar licencia aplicable",
  "licencia_audio": "No presumir; revisar términos y legislación",
  "materiales_externos": [],
  "hash_sha256": "",
  "declaracion_originalidad": "El estudiante documenta por separado sus decisiones de composición, arreglo, edición y producción, así como el material generado mediante IA."
}
~~~~

Los datos de fecha, licencias y hashes del ejemplo son campos ilustrativos. Deben sustituirse por valores reales obtenidos del proyecto.

## 7. Estructura del informe final

El estudiante debe entregar:

1. Identificación de la pieza, estudiante, fecha y modelo.
2. Concepto creativo, emoción y narrativa.
3. Decisiones de tempo, tonalidad, métrica e instrumentación.
4. MIDI base, MIDI revisado y cambios realizados.
5. Análisis armónico y sus límites.
6. Prompts, negative prompts, semillas y parámetros.
7. Comparación de cinco versiones y justificación de descartes.
8. Edición, arreglo, mezcla, masterización y stems.
9. Mediciones técnicas y escucha crítica.
10. Aportes humanos frente a las salidas generadas.
11. Licencias, fuentes, permisos, metadatos y hashes.
12. Limitaciones y plan de mejora.

## 8. Defensa oral

### Duración recomendada

- Presentación breve: 5 minutos.
- Presentación estándar: 8–10 minutos.
- Defensa técnica: 15 minutos más preguntas.

### Distribución de una presentación de 8 minutos

| Tiempo | Sección | Evidencia |
|---|---|---|
| 0:00–0:45 | Apertura | Título, intención y objetivo |
| 0:45–2:00 | Concepto musical | Emoción, narrativa, tonalidad, tempo y estructura |
| 2:00–3:30 | Composición | MIDI, armonía y decisiones humanas |
| 3:30–5:00 | Generación | Modelo, prompt, seed, parámetros y cinco versiones |
| 5:00–6:30 | Producción | Edición, mezcla, mediciones y problemas corregidos |
| 6:30–7:30 | Resultado | Reproducir un fragmento de 20–30 segundos |
| 7:30–8:00 | Cierre | Limitaciones, ética y siguiente paso |

### Preguntas que el jurado debe formular

1. ¿Qué emoción querías comunicar y qué decisión musical la vuelve audible?
2. ¿Por qué elegiste esa tonalidad, tempo, métrica e instrumentación?
3. ¿Qué parte es decisión humana y qué parte fue generada?
4. ¿Qué parámetros controlaste y cómo diseñaste la comparación?
5. ¿Qué versión descartaste y qué escuchaste para tomar esa decisión?
6. ¿Qué artefactos encontraste y cómo los corregiste?
7. ¿Qué licencias y autorizaciones aplican al modelo y a los materiales?
8. ¿Cómo puede otra persona reproducir tu proceso?
9. ¿Qué mejorarías con más tiempo, datos o recursos?

### Regla de defensa

El estudiante debe contestar con los archivos abiertos y marcas temporales. No es suficiente leer una descripción redactada por una IA. La defensa comprueba que entiende sus decisiones y puede distinguir una observación real de una inferencia o una afirmación no respaldada.

## 9. Prompt para evaluación asistida por IA

~~~~text
Actúa como jurado experto en composición, producción musical, IA generativa,
análisis armónico, ingeniería de audio y ética tecnológica.

Evalúa el proyecto final del Módulo 3 con rigor y evidencia.

Contexto:
- Título:
- Objetivo artístico:
- Emoción/narrativa:
- Tonalidad y tempo:
- Instrumentación:
- Modelo y versión:
- Material propio, licenciado, autorizado o generado:

Entregables que debes revisar:
1. Ficha creativa.
2. MIDI base y revisado.
3. Cinco versiones generadas.
4. Prompts, semillas y parámetros.
5. Análisis armónico.
6. Reportes de audio.
7. Demo final y stems.
8. Informe técnico y creativo.
9. Licencias, fuentes y metadatos.

Rúbrica:
- Intención musical: 20%.
- Coherencia armónica: 15%.
- Control generativo: 20%.
- Calidad de producción: 15%.
- Originalidad: 10%.
- Reproducibilidad: 10%.
- Ética y trazabilidad: 10%.

Para cada criterio:
1. Asigna una calificación de 0 a 100.
2. Cita el archivo, tabla, fragmento o marca temporal que respalda la nota.
3. Separa observaciones verificables de inferencias.
4. Identifica errores musicales, técnicos, éticos o de reproducibilidad.
5. Propón una corrección concreta y comprobable.
6. Indica qué falta para alcanzar excelencia.

No inventes cualidades auditivas.
No afirmes haber escuchado un audio que no se te haya entregado y que no puedas reproducir o analizar.
No declares una licencia válida sin consultar su texto aplicable.
Si faltan archivos, solicita la evidencia antes de asignar una nota definitiva.
~~~~

## 10. Precauciones técnicas y de licencia

- La API de Diffusers usa guidance_scale; el argumento guidance del código inicial debe corregirse.
- Guarda el WAV con pipeline.vae.sampling_rate, no con un número codificado manualmente.
- Stable Audio Open 1.0 genera clips de hasta aproximadamente 47 segundos; construye obras largas mediante arreglo y edición de fragmentos.
- La reproducibilidad con una semilla depende también del modelo/revisión, versiones de software, hardware y kernels.
- La licencia del modelo y el derecho de uso del audio resultante son cuestiones distintas. Revisa el contrato del modelo, las fuentes, los materiales de entrenamiento documentados y los términos aplicables al uso previsto.
- Un hash SHA-256 identifica un archivo; no demuestra autoría, titularidad ni autorización de uso.
- No afirmes que una pieza suena profesional solo por alcanzar un objetivo LUFS. Mide, escucha y documenta.

Los valores del ejemplo «Memoria de agua» son parámetros didácticos; los datos de loudness, true peak, RMS, correlación estéreo y decisiones auditivas deben obtenerse de los archivos reales del estudiante.
