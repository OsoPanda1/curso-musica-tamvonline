# Kit técnico — Módulo 3

Este kit genera un MIDI de trabajo, analiza armonía, prepara inferencia Stable Audio Open 1.0, mide características técnicas de audio y crea metadatos SHA-256.

## Instalar

Python 3.11 o 3.12 recomendado.

~~~~bash
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements.txt
~~~~

Para ejecutar las pruebas de MIDI, metadatos y control de calidad, sin descargar los pesos del modelo ni instalar PyTorch/Diffusers:

~~~~bash
pip install -r requirements-test.txt
python -m unittest discover -s tests -v
~~~~

## Flujo

~~~~bash
python src/generate_midi.py --bpm 92 --bars 16 --key "D minor" --output output/composicion_base.mid
python src/analyze_harmony.py output/composicion_base.mid --output analysis/analisis_armonia.json
python src/generate_stable_audio.py --prompt "Cinematic ambient pad in D minor, warm analog synth texture, no vocals, no drums" --negative-prompt "clipping, harsh distortion, metallic artifacts" --seed 42 --steps 50 --guidance-scale 7 --duration 10 --output output/version_A.wav
python src/evaluate_audio.py output/version_A.wav --output analysis/version_A.qc.json
python src/metadata.py output/version_A.wav --title "Memoria de agua" --author "Nombre del estudiante" --prompt "Cinematic ambient pad..." --seed 42 --output ethics/metadatos.json
~~~~

El generador MIDI produce seis pistas editables: piano, bajo, pad, arpegio, melodía de referencia y percusión. Es un andamio pedagógico, no una composición que deba aceptarse sin revisión. El estudiante debe reescribir y arreglar el MIDI en su DAW.

## Controles importantes

- La API de Diffusers usa guidance_scale, no guidance.
- La exportación usa pipeline.vae.sampling_rate; no se fija manualmente un sample rate que podría no corresponder al modelo.
- La semilla se guarda, pero la reproducibilidad exacta depende también de checkpoint, revisión, librerías, dispositivo y kernels.
- Stable Audio Open genera clips de hasta aproximadamente 47 s. Para piezas largas se organiza, edita y produce más de un fragmento.
- El script de evaluación entrega métricas y un pico estimado con sobremuestreo 4x. No certifica true peak ni evalúa calidad artística de forma automática.
- El material generado no se considera autorizado para distribución comercial sin comprobar licencias del modelo, herramientas, muestras, voces y demás materiales.

## Archivos

- data/prompts.example.csv: cinco experimentos controlados; las decisiones quedan como por evaluar.
- templates/: ficha creativa e informe del proyecto.
- tests/: pruebas de parser, MIDI y hash.

La generación Stable Audio requiere acceso aceptado al modelo y hardware adecuado. Las pruebas no descargan el checkpoint ni requieren GPU.
