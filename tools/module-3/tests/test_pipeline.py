from __future__ import annotations

import hashlib
from pathlib import Path
import sys
import tempfile
import unittest

import pretty_midi

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from music_utils import parse_chord, parse_note
from generate_midi import create_midi
from metadata import create_metadata


class MusicUtilityTests(unittest.TestCase):
    def test_note_parser_handles_accidentals_and_octaves(self):
        self.assertEqual(parse_note("C4"), 60)
        self.assertEqual(parse_note("F#3"), 54)
        self.assertEqual(parse_note("Bb3"), 58)
        self.assertEqual(parse_note("C", default_octave=3), 48)

    def test_chord_parser_handles_minor_and_flat_roots(self):
        self.assertEqual(parse_chord("Dmin", octave=3).pitches, (50, 53, 57))
        self.assertEqual(parse_chord("Bb maj", octave=3).pitches, (58, 62, 65))
        self.assertEqual(parse_chord("F", octave=3).pitches, (53, 57, 60))
        self.assertEqual(parse_chord("C7", octave=3).pitches, (48, 52, 55, 58))

    def test_invalid_symbols_fail_loudly(self):
        with self.assertRaises(ValueError):
            parse_note("H4")
        with self.assertRaises(ValueError):
            parse_chord("Dxyz")

    def test_midi_scaffold_has_six_tracks_and_intro_without_drums(self):
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / "composition.mid"
            create_midi(bpm=92, bars=8, output_path=target)
            midi = pretty_midi.PrettyMIDI(str(target))
            self.assertEqual(len(midi.instruments), 6)
            drum_tracks = [instrument for instrument in midi.instruments if instrument.is_drum]
            self.assertEqual(len(drum_tracks), 1)
            self.assertTrue(drum_tracks[0].notes)
            intro_end = 4 * (60 / 92) * 4
            # MIDI time is quantized to ticks on export; allow one small tick-scale tolerance.
            self.assertTrue(all(note.start >= intro_end - 0.001 for note in drum_tracks[0].notes))
            self.assertTrue(any(instrument.notes for instrument in midi.instruments if not instrument.is_drum))

    def test_metadata_hash_matches_audio_bytes(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            audio = root / "demo.wav"
            audio.write_bytes(b"deterministic-test-audio")
            output = root / "metadata.json"
            data = create_metadata(
                audio_path=audio,
                title="Test piece",
                human_author="Student",
                model_id="test-model",
                model_revision="test-revision",
                prompt="test prompt",
                negative_prompt="",
                seed=42,
                parameters={"steps": 10},
                license_statement="educational test",
                output_path=output,
            )
            expected = hashlib.sha256(audio.read_bytes()).hexdigest()
            self.assertEqual(data["sha256"], expected)
            self.assertTrue(output.is_file())


if __name__ == "__main__":
    unittest.main()
