"""Technical audio QC. This measures features; it does not judge artistic quality."""
from __future__ import annotations

import argparse
import json
from pathlib import Path


def evaluate_audio(audio_path: str | Path) -> dict:
    try:
        import librosa
        import numpy as np
        import soundfile as sf
        from scipy.signal import resample_poly
    except ImportError as exc:
        raise RuntimeError("Install the analysis dependencies from requirements.txt") from exc

    path = Path(audio_path)
    if not path.is_file():
        raise FileNotFoundError(path)
    audio, sample_rate = sf.read(str(path), always_2d=True, dtype="float32")
    if audio.size == 0:
        raise ValueError("Audio file is empty")
    if sample_rate <= 0:
        raise ValueError("Invalid sample rate")

    mono = np.mean(audio, axis=1)
    peak = float(np.max(np.abs(audio)))
    rms = float(np.sqrt(np.mean(np.square(mono))))
    peak_dbfs = 20.0 * np.log10(peak + 1e-12)
    rms_dbfs = 20.0 * np.log10(rms + 1e-12)
    clipping_samples = int(np.count_nonzero(np.abs(audio) >= 0.999))
    oversampled = resample_poly(audio, up=4, down=1, axis=0)
    true_peak_estimate = float(np.max(np.abs(oversampled)))
    true_peak_dbfs_estimate = 20.0 * np.log10(true_peak_estimate + 1e-12)

    centroid = librosa.feature.spectral_centroid(y=mono, sr=sample_rate)[0]
    rolloff = librosa.feature.spectral_rolloff(y=mono, sr=sample_rate)[0]
    flatness = librosa.feature.spectral_flatness(y=mono)[0]
    rms_frames = librosa.feature.rms(y=mono)[0]
    silence_ratio = float(np.mean(rms_frames < 1e-4)) if len(rms_frames) else 0.0

    integrated_lufs = None
    lufs_note = None
    try:
        import pyloudnorm as pyln
        integrated_lufs = float(pyln.Meter(sample_rate).integrated_loudness(audio))
    except Exception as exc:
        lufs_note = f"LUFS could not be measured for this file: {type(exc).__name__}"

    stereo_correlation = None
    if audio.shape[1] == 2 and np.std(audio[:, 0]) > 0 and np.std(audio[:, 1]) > 0:
        stereo_correlation = float(np.corrcoef(audio[:, 0], audio[:, 1])[0, 1])

    return {
        "file": path.name,
        "duration_seconds": round(len(mono) / sample_rate, 4),
        "sample_rate_hz": int(sample_rate),
        "channels": int(audio.shape[1]),
        "peak_dbfs": round(float(peak_dbfs), 3),
        "rms_dbfs": round(float(rms_dbfs), 3),
        "integrated_lufs": round(integrated_lufs, 3) if integrated_lufs is not None else None,
        "lufs_note": lufs_note,
        "true_peak_dbfs_estimate_4x": round(float(true_peak_dbfs_estimate), 3),
        "true_peak_method": "4x polyphase oversampling estimate; not a compliance certification",
        "clipping_samples_at_or_above_approx_minus_0_009_dbfs": clipping_samples,
        "clipping_detected": clipping_samples > 0,
        "spectral_centroid_mean_hz": round(float(np.mean(centroid)), 2),
        "spectral_rolloff_mean_hz": round(float(np.mean(rolloff)), 2),
        "spectral_flatness_mean": round(float(np.mean(flatness)), 6),
        "low_energy_frame_ratio_approx": round(silence_ratio, 4),
        "stereo_correlation": round(stereo_correlation, 4) if stereo_correlation is not None else None,
        "audible_artifacts": "not assessed automatically; requires critical listening",
        "limitations": [
            "Spectral and loudness metrics do not establish musical coherence or artistic quality.",
            "The 4x oversampled peak is an estimate, not an ITU-R BS.1770 true-peak certification.",
            "Listening is required to identify metallic artifacts, masking, poor transitions, and fatigue.",
        ],
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("audio")
    parser.add_argument("--output", default=None)
    args = parser.parse_args()
    report = evaluate_audio(args.audio)
    output = Path(args.output) if args.output else Path(args.audio).with_suffix(".qc.json")
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
