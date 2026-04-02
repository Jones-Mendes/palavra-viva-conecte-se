import { Brain, Sparkles, HeartHandshake, CloudSun, ShieldCheck, BookOpen } from "lucide-react";
import { useMemo, useState } from "react";

type ThemeId = "ansiedade" | "perdao" | "esperanca" | "gratidao" | "sabedoria";

type Theme = {
  id: ThemeId;
  label: string;
  description: string;
  color: string;
  colorBg: string;
  icon: typeof Brain;
};

type Suggestion = {
  reference: string;
  text: string;
  insight: string;
};

const themes: Theme[] = [
  {
    id: "ansiedade",
    label: "Ansiedade",
    description: "Paz em meio a pensamentos inquietos",
    color: "hsl(210 60% 42%)",
    colorBg: "hsl(210 60% 42% / 0.08)",
    icon: CloudSun,
  },
  {
    id: "perdao",
    label: "Perdao",
    description: "Cura e reconciliacao no coracao",
    color: "hsl(140 40% 38%)",
    colorBg: "hsl(140 40% 38% / 0.08)",
    icon: HeartHandshake,
  },
  {
    id: "esperanca",
    label: "Esperanca",
    description: "Confianca no futuro que Deus conduz",
    color: "hsl(36 75% 38%)",
    colorBg: "hsl(36 75% 38% / 0.08)",
    icon: Sparkles,
  },
  {
    id: "gratidao",
    label: "Gratidao",
    description: "Alegria por tudo o que Deus ja fez",
    color: "hsl(42 80% 50%)",
    colorBg: "hsl(42 80% 50% / 0.08)",
    icon: ShieldCheck,
  },
  {
    id: "sabedoria",
    label: "Sabedoria",
    description: "Direcao pratica para decisoes diarias",
    color: "hsl(18 55% 52%)",
    colorBg: "hsl(18 55% 52% / 0.08)",
    icon: BookOpen,
  },
];

const initialSuggestions: Record<ThemeId, Suggestion[]> = {
  ansiedade: [
    {
      reference: "Filipenses 4:6-7",
      text: "Nao andem ansiosos por coisa alguma, mas em tudo, pela oracao e suplicas...",
      insight: "Convite para entregar preocupacoes e receber paz que guarda o coracao.",
    },
    {
      reference: "Mateus 6:34",
      text: "Portanto, nao se preocupem com o amanha...",
      insight: "Foco no presente e confianca diaria na provisao de Deus.",
    },
    {
      reference: "Salmos 94:19",
      text: "Quando a ansiedade ja me dominava no intimo, o teu consolo trouxe alivio a minha alma.",
      insight: "O consolo de Deus reduz a carga emocional e devolve serenidade.",
    },
  ],
  perdao: [
    {
      reference: "Efesios 4:32",
      text: "Sejam bondosos e compassivos uns para com os outros... perdoando-se mutuamente...",
      insight: "Perdao como escolha ativa, sustentada pela graca recebida.",
    },
    {
      reference: "Colossenses 3:13",
      text: "Suportem-se uns aos outros e perdoem as queixas que tiverem...",
      insight: "A cura comeca quando soltamos o direito de retribuir a dor.",
    },
    {
      reference: "Mateus 18:21-22",
      text: "Nao lhe digo ate sete, mas ate setenta vezes sete.",
      insight: "Perdao continuo como estilo de vida, nao evento isolado.",
    },
  ],
  esperanca: [
    {
      reference: "Romanos 15:13",
      text: "Que o Deus da esperanca os encha de toda alegria e paz...",
      insight: "Esperanca alimentada por fe gera alegria e paz reais.",
    },
    {
      reference: "Lamentacoes 3:21-23",
      text: "Quero trazer a memoria o que me pode dar esperanca...",
      insight: "Relembrar a fidelidade de Deus sustenta dias dificeis.",
    },
    {
      reference: "Isaias 40:31",
      text: "Mas os que esperam no Senhor renovam as suas forcas...",
      insight: "Esperanca e fonte de renovacao e resistencia.",
    },
  ],
  gratidao: [
    {
      reference: "1 Tessalonicenses 5:18",
      text: "Deem gracas em todas as circunstancias...",
      insight: "Gratidao como disciplina espiritual transforma a perspectiva.",
    },
    {
      reference: "Salmos 103:2",
      text: "Bendiga o Senhor a minha alma! Nao esqueca nenhuma de suas bencaos!",
      insight: "Listar bencaos e um antidoto contra a ingratidao.",
    },
    {
      reference: "Colossenses 3:15",
      text: "Sejam agradecidos.",
      insight: "A gratidao cria um ambiente de paz no coracao.",
    },
  ],
  sabedoria: [
    {
      reference: "Tiago 1:5",
      text: "Se algum de voces tem falta de sabedoria, peca-a a Deus...",
      insight: "A sabedoria comeca com humildade e oracao.",
    },
    {
      reference: "Proverbios 3:5-6",
      text: "Confie no Senhor de todo o seu coracao... e ele endireitara os seus caminhos.",
      insight: "Confiar em Deus clareia decisoes e reduz confusao.",
    },
    {
      reference: "Salmos 32:8",
      text: "Eu o instruirei e o ensinarei no caminho que voce deve seguir...",
      insight: "Deus promete direcao pratica para escolhas diarias.",
    },
  ],
};

export default function ThemeSuggestions() {
  const [selected, setSelected] = useState<ThemeId>("ansiedade");
  const [themeSuggestions, setThemeSuggestions] = useState<Record<ThemeId, Suggestion[]>>(
    initialSuggestions
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedTheme = useMemo(
    () => themes.find((theme) => theme.id === selected),
    [selected]
  );

  const currentSuggestions = themeSuggestions[selected];

  const generateSuggestions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL ?? "";
      const response = await fetch(`${apiBase}/api/theme-suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          theme: selected,
          locale: "pt-BR",
        }),
      });

      if (!response.ok) {
        throw new Error("request failed");
      }

      const data = (await response.json()) as { suggestions?: Suggestion[] };
      if (!data?.suggestions?.length) {
        throw new Error("invalid response");
      }

      setThemeSuggestions((previous) => ({
        ...previous,
        [selected]: data.suggestions ?? previous[selected],
      }));
    } catch {
      setError("Nao foi possivel gerar sugestoes agora.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="temas" className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            * Tema do Coracao *
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground mt-2 mb-4">
            Escolha um tema e receba sugestoes
          </h2>
          <p className="text-muted-foreground">
            A I.A. recomenda textos biblicos relacionados ao que voce esta vivendo hoje.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-8">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center text-primary-foreground">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Selecione um tema
                </h3>
                <p className="text-sm text-muted-foreground">
                  Clique para guiar a recomendacao da I.A.
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              {themes.map((theme) => {
                const Icon = theme.icon;
                const isSelected = theme.id === selected;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setSelected(theme.id)}
                    className="flex items-center gap-4 rounded-xl border p-4 text-left transition-all hover:shadow-warm"
                    style={{
                      borderColor: isSelected ? theme.color + "55" : "hsl(var(--border))",
                      backgroundColor: isSelected ? theme.colorBg : "hsl(var(--card))",
                    }}
                  >
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: theme.colorBg, color: theme.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-foreground">
                        {theme.label}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {theme.description}
                      </span>
                    </span>
                    {isSelected && <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: theme.color }}>ativo</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Sugestao da I.A.
                </span>
                <h3 className="font-display text-2xl font-semibold text-foreground mt-2">
                  {selectedTheme?.label}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  {selectedTheme?.description}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: selectedTheme?.colorBg ?? "hsl(var(--muted))",
                  color: selectedTheme?.color ?? "hsl(var(--foreground))",
                }}
              >
                <Sparkles className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-4">
              {currentSuggestions.map((item) => (
                <div
                  key={item.reference}
                  className="rounded-xl border border-border bg-background/70 p-4"
                >
                  <p className="text-sm text-foreground leading-relaxed mb-3">
                    {item.text}
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                      {item.reference}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.insight}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <p className="text-xs text-destructive mt-4">
                {error}
              </p>
            )}

            <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-muted-foreground">
                Base inicial com curadoria. A I.A. gera novas combinacoes sob demanda.
              </span>
              <button
                onClick={generateSuggestions}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg gradient-gold text-primary-foreground text-sm font-medium shadow-warm hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {isLoading ? "Gerando..." : "Gerar novas sugestoes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
