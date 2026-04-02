import { BookMarked, Share2, Heart } from "lucide-react";
import { useEffect, useState } from "react";

type VerseData = {
  text: string;
  reference: string;
  theme: string;
};

type ApiVerse = {
  text: string;
  book: {
    name: string;
  };
  chapter: number;
  number: number;
};

const fallbackVerses: VerseData[] = [
  {
    text: "Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.",
    reference: "Salmos 119:105",
    theme: "Orientação",
  },
  {
    text: "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.",
    reference: "Provérbios 3:5",
    theme: "Fé",
  },
  {
    text: "Tudo posso naquele que me fortalece.",
    reference: "Filipenses 4:13",
    theme: "Força",
  },
];

const getFallbackVerse = (): VerseData => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  return fallbackVerses[dayOfYear % fallbackVerses.length];
};

export default function VerseOfDay() {
  const [liked, setLiked] = useState(false);
  const [verse, setVerse] = useState<VerseData>(getFallbackVerse);
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  const shareVerse = async () => {
    const text = `"${verse.text}" — ${verse.reference}`;
    if (navigator.share) {
      await navigator.share({ text });
    } else {
      await navigator.clipboard.writeText(text);
      alert("Verso copiado!");
    }
  };

  useEffect(() => {
    const token = import.meta.env.VITE_ABIBLIA_TOKEN as string | undefined;
    if (!token) {
      setStatus("idle");
      return;
    }

    const controller = new AbortController();
    setStatus("loading");

    fetch("https://www.abibliadigital.com.br/api/verses/nvi/random", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("API error");
        }
        return (await response.json()) as ApiVerse;
      })
      .then((data) => {
        setVerse({
          text: data.text,
          reference: `${data.book.name} ${data.chapter}:${data.number}`,
          theme: "Biblia",
        });
        setStatus("idle");
      })
      .catch(() => {
        if (controller.signal.aborted) {
          return;
        }
        setStatus("idle");
        setVerse(getFallbackVerse());
      });

    return () => controller.abort();
  }, []);

  return (
    <section id="verso" className="py-24 gradient-divine">
      <div className="container max-w-3xl px-4">
        <div className="text-center mb-12">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            ✦ Verso do Dia ✦
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground mt-2">
            {new Date().toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h2>
        </div>

        <div
          className="relative rounded-2xl p-8 sm:p-12 shadow-card border border-border bg-card text-center"
          style={{ background: "hsl(var(--verse-bg))" }}
        >
          <span
            className="absolute top-4 left-6 font-display text-7xl leading-none opacity-15 text-primary select-none"
            aria-hidden
          >
            "
          </span>
          <span
            className="absolute bottom-4 right-6 font-display text-7xl leading-none opacity-15 text-primary select-none"
            aria-hidden
          >
            "
          </span>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <BookMarked className="w-3.5 h-3.5" />
            {verse.theme}
          </div>

          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-light italic text-foreground leading-relaxed mb-6">
            {status === "loading" ? "Carregando verso..." : `"${verse.text}"`}
          </blockquote>

          <cite className="not-italic text-sm font-medium text-primary uppercase tracking-widest">
            — {verse.reference}
          </cite>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                liked
                  ? "bg-accent/10 border-accent/30 text-accent"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              {liked ? "Salvo" : "Salvar"}
            </button>
            <button
              onClick={shareVerse}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Compartilhar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
