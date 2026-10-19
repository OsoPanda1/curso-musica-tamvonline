import { useEffect, useMemo, useRef, useState } from "react";
import { AudioLines, Pause, Play, Square } from "lucide-react";
type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; label?: string; text: string }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "tip"; text: string }
  | { type: "practice"; title: string; items: string[] };

function blockToText(block: Block): string[] {
  switch (block.type) {
    case "p":
    case "h":
    case "tip":
      return [block.text];
    case "list":
      return block.items;
    case "code":
      return [block.label ?? "", block.text];
    case "table":
      return [block.head.join(". "), ...block.rows.map((row) => row.join(". "))];
    case "practice":
      return [block.title, ...block.items];
  }
}

export function LessonAudioNarration({ blocks }: { blocks: Block[] }) {
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [supported, setSupported] = useState(false);
  const chunksRef = useRef<string[]>([]);
  const indexRef = useRef(0);
  const mountedRef = useRef(false);

  const narration = useMemo(
    () => blocks.flatMap(blockToText).map((text) => text.trim()).filter(Boolean).join(". "),
    [blocks],
  );

  useEffect(() => {
    mountedRef.current = true;
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
    return () => {
      mountedRef.current = false;
      if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  function stop() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    chunksRef.current = [];
    indexRef.current = 0;
    setPlaying(false);
    setPaused(false);
  }

  function speakNext() {
    if (!mountedRef.current || indexRef.current >= chunksRef.current.length) {
      setPlaying(false);
      setPaused(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(chunksRef.current[indexRef.current]);
    utterance.lang = "es-MX";
    utterance.rate = 0.96;
    utterance.pitch = 1;
    utterance.onend = () => {
      indexRef.current += 1;
      speakNext();
    };
    utterance.onerror = () => {
      setPlaying(false);
      setPaused(false);
    };
    window.speechSynthesis.speak(utterance);
  }

  function play() {
    if (!supported || !narration) return;
    if (paused && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setPaused(false);
      setPlaying(true);
      return;
    }
    stop();
    // Chunk the narration to avoid browser speech engines truncating long utterances.
    chunksRef.current = narration.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map((s) => s.trim()).filter(Boolean) ?? [narration];
    indexRef.current = 0;
    setPlaying(true);
    speakNext();
  }

  function pause() {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.pause();
    setPaused(true);
    setPlaying(false);
  }

  return (
    <section aria-label="Audio de la lección" className="mt-6 rounded-2xl border border-border bg-panel p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AudioLines className="h-5 w-5 text-lavender" aria-hidden="true" />
          <div>
            <p className="font-semibold">Escuchar esta lección</p>
            <p className="text-xs text-muted-foreground">Narración sintetizada por el navegador · español</p>
          </div>
        </div>
        {supported ? (
          <div className="flex items-center gap-2">
            {!playing ? (
              <button type="button" onClick={play} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">
                <Play className="h-4 w-4" aria-hidden="true" /> {paused ? "Continuar" : "Reproducir"}
              </button>
            ) : (
              <button type="button" onClick={pause} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm">
                <Pause className="h-4 w-4" aria-hidden="true" /> Pausar
              </button>
            )}
            <button type="button" onClick={stop} className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm" aria-label="Detener narración">
              <Square className="h-4 w-4" aria-hidden="true" /> Detener
            </button>
          </div>
        ) : <p className="text-sm text-muted-foreground">La narración por voz no está disponible en este navegador.</p>}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">La voz disponible depende del sistema operativo y del navegador. Este reproductor no genera un archivo MP3 descargable.</p>
    </section>
  );
}
