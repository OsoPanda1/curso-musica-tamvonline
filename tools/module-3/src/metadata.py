"""Create provenance metadata and SHA-256 for a delivered audio file."""
from __future__ import annotations

import argparse
from datetime import datetime, timezone
import hashlib
import importlib.metadata
import json
from pathlib import Path
import platform
import sys


def sha256_file(path: str | Path) -> str:
    digest = hashlib.sha256()
    with Path(path).open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def package_version(name: str) -> str | None:
    try:
        return importlib.metadata.version(name)
    except importlib.metadata.PackageNotFoundError:
        return None


def create_metadata(
    audio_path: str | Path,
    title: str,
    human_author: str,
    model_id: str,
    model_revision: str,
    prompt: str,
    negative_prompt: str,
    seed: int,
    parameters: dict,
    license_statement: str,
    output_path: str | Path,
) -> dict:
    audio = Path(audio_path)
    if not audio.is_file():
        raise FileNotFoundError(audio)
    if not title.strip() or not human_author.strip():
        raise ValueError("title and human_author are required")

    data = {
        "title": title,
        "human_author": human_author,
        "ai_assistance": True,
        "human_contribution": [
            "creative intent and brief",
            "composition and arrangement decisions",
            "selection and editing of generated material",
            "critical listening and final approval",
        ],
        "model_id": model_id,
        "model_revision": model_revision or "not-recorded",
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "seed": int(seed),
        "parameters": parameters,
        "license_statement_supplied_by_student": license_statement or "UNVERIFIED - review before distribution",
        "license_status": "not-automatically-assessed",
        "created_at_utc": datetime.now(timezone.utc).isoformat(),
        "audio_file": audio.name,
        "sha256": sha256_file(audio),
        "runtime": {
            "python": sys.version.split()[0],
            "platform": platform.platform(),
            "pretty_midi": package_version("pretty_midi"),
            "music21": package_version("music21"),
            "diffusers": package_version("diffusers"),
            "torch": package_version("torch"),
        },
        "originality_statement": "The student documents the human composition, arrangement, editing, selection and production decisions separately from model-generated material.",
        "limitations": [
            "A hash proves file identity, not ownership or copyright.",
            "A model license does not replace rights checks for external samples, lyrics, voices, or references.",
            "The student must verify the terms applicable to the model version and intended distribution.",
        ],
    }
    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    return data


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("audio")
    parser.add_argument("--title", required=True)
    parser.add_argument("--author", required=True)
    parser.add_argument("--model", default="stabilityai/stable-audio-open-1.0")
    parser.add_argument("--revision", default="not-recorded")
    parser.add_argument("--prompt", required=True)
    parser.add_argument("--negative-prompt", default="")
    parser.add_argument("--seed", type=int, required=True)
    parser.add_argument("--license-statement", default="")
    parser.add_argument("--output", default="ethics/metadatos.json")
    args = parser.parse_args()
    data = create_metadata(
        audio_path=args.audio,
        title=args.title,
        human_author=args.author,
        model_id=args.model,
        model_revision=args.revision,
        prompt=args.prompt,
        negative_prompt=args.negative_prompt,
        seed=args.seed,
        parameters={},
        license_statement=args.license_statement,
        output_path=args.output,
    )
    print(json.dumps(data, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
