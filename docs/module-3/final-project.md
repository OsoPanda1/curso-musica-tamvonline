# Proyecto final — Módulo 3
## Obra musical controlada por IA

**Principio de evaluación:** no se califica la mera generación de audios. Se evalúa una obra musical en la que el estudiante demuestre intención artística, control técnico, criterio de selección, producción audible, reproducibilidad, trazabilidad y capacidad de defender sus decisiones.

## Objetivos verificables

1. Definir una intención artística antes de generar.
2. Construir una base MIDI estructurada, editable y revisable.
3. Controlar prompts, negative prompts, semillas y parámetros de generación.
4. Diseñar al menos cinco variaciones comparables cambiando una variable por vez.
5. Seleccionar y editar material mediante escucha crítica.
6. Entregar una producción final con mediciones y revisión auditiva.
7. Documentar procedencia, licencias, aportes humanos y límites.

## Rúbrica principal

| Criterio | Peso | Excelente (85–100) | Sólido (70–84) | Insuficiente (0–69) |
|---|---:|---|---|---|
| Intención musical | 20% | Concepto original, emoción clara y sostenida, estructura narrativa e instrumentación funcional | Idea clara con desarrollo limitado | Concepto genérico o ausente |
| Coherencia armónica | 15% | Tonalidad contrastada, progresión con propósito, tensión/resolución y transiciones justificadas | Armonía funcional pero predecible | Armonía incoherente o sin análisis |
| Control generativo | 20% | Prompts, negative prompts, semillas y parámetros comparados; variaciones controladas y descartes justificados | Parámetros básicos documentados | Generación aleatoria sin trazabilidad |
| Calidad de producción | 15% | Balance, dinámica, espacio estéreo, edición limpia y mediciones contextualizadas | Producción aceptable con defectos menores | Clipping, desequilibrio o ausencia de revisión |
| Originalidad | 10% | Decisiones humanas identificables en composición, arreglo, edición o procesamiento | Aporte personal limitado | Audio generado sin transformación ni justificación |
| Reproducibilidad | 10% | Código, versiones, comandos, modelos, dependencias, semillas y rutas documentados | Proceso parcialmente reconstruible | No se puede reconstruir |
| Ética y trazabilidad | 10% | Fuentes, licencias, permisos, metadatos, hash y límites documentados | Documentación parcial | Material sin procedencia ni derechos revisados |

**Fórmula:** suma de cada calificación de 0 a 100 multiplicada por su peso. Aprobación: 70. Dominio sólido: 85. Excelencia: 95 o más, con evidencia completa y defensa oral satisfactoria.

### Umbrales de excelencia

Para obtener 95 o más:
- La intención se reconoce en toda la obra.
- El MIDI está estructurado y fue revisado por el estudiante.
- Se comparan al menos cinco versiones con control de variables.
- El estudiante explica qué descartó y por qué.
- La textura generada se integra mediante edición y arreglo.
- La mezcla y el master se someten a mediciones y escucha.
- El paquete es reproducible y tiene licencias/metadatos.
- La defensa distingue con precisión aportes humanos y de IA.

## Experimento generativo A–E

Mantén prompt, seed, pasos, guidance y duración constantes salvo la variable indicada.

| Versión | Variable controlada |
|---|---|
| A | Línea base |
| B | Cambia únicamente guidance_scale |
| C | Cambia únicamente la duración |
| D | Cambia únicamente los instrumentos descritos en el prompt |
| E | Cambia únicamente la atmósfera descrita en el prompt |

Registra resultados reales en data/prompts.example.csv (haz una copia como prompts.csv). Las decisiones deben quedar como pendientes hasta escuchar los archivos; no inventes que una versión es mejor.

## Paquete obligatorio

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

La ausencia de un archivo repercute en el criterio correspondiente. No se debe completar el paquete con valores supuestos.

## Lista de escucha crítica

| Pregunta | Registro |
|---|---|
| ¿La intención se percibe desde el inicio? | Sí / Parcial / No + evidencia |
| ¿La tonalidad y el tempo se mantienen o cambian intencionalmente? | |
| ¿Existe contraste entre secciones? | |
| ¿Melodía y elemento principal son inteligibles? | |
| ¿Bombo y bajo conviven sin enmascaramiento excesivo? | |
| ¿Los agudos son agradables y no fatigan? | |
| ¿La dinámica conserva expresión? | |
| ¿La imagen estéreo es intencional y compatible en mono? | |
| ¿Hay clipping, cortes o artefactos audibles? | |
| ¿El final resuelve o expresa un cierre deliberado? | |

Una respuesta «No» en clipping, artefactos graves, desequilibrio extremo o incoherencia activa una revisión obligatoria antes de asignar excelencia. Las mediciones automáticas no sustituyen esta escucha.

## Defensa oral

1. ¿Qué emoción querías comunicar y qué decisiones la hacen audible?
2. ¿Por qué elegiste esa tonalidad, tempo e instrumentación?
3. ¿Qué partes son decisión humana y cuáles generó el modelo?
4. ¿Qué parámetros controlaste y cómo comparaste las variaciones?
5. ¿Por qué descartaste cada versión no seleccionada?
6. ¿Qué artefactos detectaste y cómo los resolviste?
7. ¿Qué licencias y permisos aplican?
8. ¿Cómo puede otra persona reproducir el proceso?
9. ¿Qué mejorarías en una segunda versión?

## Precauciones técnicas y de licencia

- La API actual de Diffusers usa guidance_scale; el argumento guidance del código inicial debe corregirse.
- Guarda el WAV con pipeline.vae.sampling_rate, no con un número codificado manualmente.
- Stable Audio Open 1.0 genera clips de hasta aproximadamente 47 segundos; construye obras largas mediante arreglo de fragmentos.
- La reproducibilidad con una semilla depende también del modelo/revisión, versiones de software, hardware y kernels.
- La model card señala Stability AI Community License y remite a una licencia comercial para uso comercial. Verifica la licencia aplicable antes de monetizar.
- Un hash SHA-256 identifica un archivo; no demuestra autoría, titularidad ni autorización de uso.
- No afirmes que una pieza suena profesional solo por alcanzar un objetivo LUFS. Mide, escucha y documenta.

Los valores del ejemplo «Memoria de agua» son parámetros didácticos; los datos de loudness, true peak, RMS y correlación estéreo deben obtenerse de los archivos reales del estudiante.
