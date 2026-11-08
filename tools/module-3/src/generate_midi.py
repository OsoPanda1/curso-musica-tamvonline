"""Generate an editable six-track MIDI scaffold for a music project."""
from __future__ import annotations

import argparse
from pathlib import Path
import re

import pretty_midi

from music_utils import parse_chord, parse_note


def create_midi(
    bpm: float = 92,
    bars: int = 16,
    tonalidad: str = "D minor",
    progression: tuple[str, ...] = ("Dm", "Bb", "F", "C"),
    output_path: str | Path = "output/composicion_base.mid",
) -> Path:
    if bpm <= 0 or bpm > 300:
        raise ValueError("BPM must be between 1 and 300")
    if bars < 4:
        raise ValueError("Use at least four bars")
    if not progression:
        raise ValueError("Progression cannot be empty")

    output = Path(output_path)
    output.parent.mkdir(parents=True, exist_ok=True)
    beat = 60.0 / bpm
    bar_duration = beat * 4.0

    key_root = re.match(r"^([A-Ga-g][#b]?)", tonalidad.strip())
    if not key_root:
        raise ValueError(f"Unsupported key name: {tonalidad!r}")
    root_midi = parse_note(key_root.group(1), default_octave=4)
    is_minor = "minor" in tonalidad.lower()
    scale = (0, 2, 3, 5, 7, 8, 10) if is_minor else (0, 2, 4, 5, 7, 9, 11)

    midi = pretty_midi.PrettyMIDI(initial_tempo=float(bpm))
    midi.time_signature_changes.append(pretty_midi.TimeSignature(4, 4, 0.0))
    try:
        midi.key_signature_changes.append(
            pretty_midi.KeySignature(pretty_midi.key_name_to_key_number(tonalidad), 0.0)
        )
    except ValueError:
        pass

    piano = pretty_midi.Instrument(program=0, name="Piano - chords")
    bass = pretty_midi.Instrument(program=38, name="Synth bass - roots")
    pad = pretty_midi.Instrument(program=89, name="Warm pad - harmony")
    arp = pretty_midi.Instrument(program=4, name="Electric piano - arpeggio")
    lead = pretty_midi.Instrument(program=80, name="Lead - motif scaffold")
    drums = pretty_midi.Instrument(program=0, is_drum=True, name="Drums - GM")
    motif = [root_midi + scale[d] for d in (0, 2, 3, 5, 4, 2, 3, 0)]
    markers = {0: "INTRO", 4: "DEVELOPMENT", 8: "BUILD", 12: "CLIMAX / OUTRO"}

    for bar in range(bars):
        start_bar = bar * bar_duration
        chord = parse_chord(progression[bar % len(progression)], octave=3)
        tones = list(chord.pitches)
        if bar in markers:
            midi.text_events.append(pretty_midi.Text(markers[bar], start_bar))

        for pitch in tones:
            pad.notes.append(pretty_midi.Note(velocity=52, pitch=pitch, start=start_bar, end=start_bar + bar_duration))

        for pulse in range(4):
            start = start_bar + pulse * beat
            end = min(start + beat * 0.72, start_bar + bar_duration)
            velocity = 68 + (8 if pulse in (0, 2) else 0)
            for pitch in tones:
                piano.notes.append(pretty_midi.Note(velocity=velocity, pitch=pitch, start=start, end=end))

        for step in range(8):
            start = start_bar + step * (beat / 2.0)
            pitch = tones[step % len(tones)] + 12
            arp.notes.append(pretty_midi.Note(velocity=48 + (step % 2) * 8, pitch=pitch, start=start, end=start + beat * 0.32))

        bass_root = tones[0] - 12
        bass_fifth = tones[min(2, len(tones) - 1)] - 12
        for pulse, pitch in ((0, bass_root), (2, bass_fifth)):
            start = start_bar + pulse * beat
            bass.notes.append(pretty_midi.Note(velocity=82, pitch=pitch, start=start, end=start + beat * 0.82))

        if bar >= 4:
            for beat_index in range(4):
                start = start_bar + beat_index * beat
                pitch = motif[(bar * 4 + beat_index) % len(motif)]
                lead.notes.append(pretty_midi.Note(velocity=58 + (8 if beat_index == 0 else 0), pitch=pitch, start=start, end=start + beat * 0.62))

            for pulse in (0, 2):
                start = start_bar + pulse * beat
                drums.notes.append(pretty_midi.Note(velocity=96, pitch=36, start=start, end=start + 0.12))
            for pulse in (1, 3):
                start = start_bar + pulse * beat
                drums.notes.append(pretty_midi.Note(velocity=84, pitch=38, start=start, end=start + 0.12))
            for step in range(8):
                start = start_bar + step * (beat / 2.0)
                drums.notes.append(pretty_midi.Note(velocity=42, pitch=42, start=start, end=start + 0.05))

    midi.instruments.extend((piano, bass, pad, arp, lead, drums))
    midi.write(str(output))
    return output


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--bpm", type=float, default=92)
    parser.add_argument("--bars", type=int, default=16)
    parser.add_argument("--key", default="D minor")
    parser.add_argument("--output", default="output/composicion_base.mid")
    args = parser.parse_args()
    path = create_midi(args.bpm, args.bars, args.key, output_path=args.output)
    print(f"MIDI creado: {path}")


if __name__ == "__main__":
    main()
