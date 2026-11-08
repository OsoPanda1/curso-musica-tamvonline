"""Generate a Stable Audio Open clip with explicit, recorded controls."""
from __future__ import annotations

import argparse
from pathlib import Path


MODEL_ID = "stabilityai/stable-audio-open-1.0"
MODEL_MAX_SECONDS = 47.0


def generate_audio(
    prompt: str,
    negative_prompt: str,
    output_path: str | Path,
    duration_seconds: float = 10.0,
    steps: int = 50,
    guidance_scale: float = 7.0,
    seed: int = 42,
    model_id: str = MODEL_ID,
    device: str | None = None,
) -> dict:
    if not prompt.strip():
        raise ValueError("prompt cannot be empty")
    if not 0 < duration_seconds <= MODEL_MAX_SECONDS:
        raise ValueError(f"duration_seconds must be > 0 and <= {MODEL_MAX_SECONDS}")
    if not 1 <= steps <= 500:
        raise ValueError("steps must be between 1 and 500")
    if guidance_scale < 0:
        raise ValueError("guidance_scale cannot be negative")

    try:
        import soundfile as sf
        import torch
        from diffusers import StableAudioPipeline
    except ImportError as exc:
        raise RuntimeError("Install the audio-generation dependencies from requirements.txt") from exc

    chosen_device = device or ("cuda" if torch.cuda.is_available() else "cpu")
    dtype = torch.float16 if chosen_device.startswith("cuda") else torch.float32
    pipeline = StableAudioPipeline.from_pretrained(model_id, torch_dtype=dtype).to(chosen_device)
    generator = torch.Generator(device=chosen_device).manual_seed(int(seed))

    result = pipeline(
        prompt=prompt,
        negative_prompt=negative_prompt or None,
        num_inference_steps=int(steps),
        guidance_scale=float(guidance_scale),
        audio_start_in_s=0.0,
        audio_end_in_s=float(duration_seconds),
        num_waveforms_per_prompt=1,
        generator=generator,
    )

    audio = result.audios[0].T.float().cpu().numpy()
    sample_rate = int(pipeline.vae.sampling_rate)
    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)
    sf.write(str(output), audio, sample_rate)

    return {
        "output": str(output),
        "model_id": model_id,
        "seed": int(seed),
        "steps": int(steps),
        "guidance_scale": float(guidance_scale),
        "requested_duration_seconds": float(duration_seconds),
        "sample_rate": sample_rate,
        "channels": int(audio.shape[1]) if audio.ndim == 2 else 1,
        "device": chosen_device,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--prompt", required=True)
    parser.add_argument("--negative-prompt", default="")
    parser.add_argument("--output", default="output/version_A.wav")
    parser.add_argument("--duration", type=float, default=10.0)
    parser.add_argument("--steps", type=int, default=50)
    parser.add_argument("--guidance-scale", type=float, default=7.0)
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--model", default=MODEL_ID)
    parser.add_argument("--device", default=None)
    args = parser.parse_args()
    print(generate_audio(
        prompt=args.prompt,
        negative_prompt=args.negative_prompt,
        output_path=args.output,
        duration_seconds=args.duration,
        steps=args.steps,
        guidance_scale=args.guidance_scale,
        seed=args.seed,
        model_id=args.model,
        device=args.device,
    ))


if __name__ == "__main__":
    main()
