import { BookOpen, Clock, Star, Flame, Sprout, Cross, ChevronRight } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    id: "cronologico",
    icon: Clock,
    title: "Bíblia Cronológica",
    description: "Leia toda a Bíblia em ordem cronológica dos eventos",
    duration: "365 dias",
    chapters: "1.189 capítulos",
    difficulty: "Completo",
    color: "hsl(36 75% 38%)",
    colorBg: "hsl(36 75% 38% / 0.08)",
    popular: true,
  },
  {
    id: "devocional",
    icon: Sprout,
    title: "Devocional Diário",
    description: "Leituras curtas e meditativas para começar o dia",
    duration: "90 dias",
    chapters: "90 passagens",
    difficulty: "Iniciante",
    color: "hsl(140 40% 38%)",
    colorBg: "hsl(140 40% 38% / 0.08)",
    popular: false,
  },
  {
    id: "salmos",
    icon: Star,
    title: "Salmos e Provérbios",
    description: "Sabedoria e adoração para fortalecer sua espiritualidade",
    duration: "60 dias",
    chapters: "181 capítulos",
    difficulty: "Intermediário",
    color: "hsl(42 80% 50%)",
    colorBg: "hsl(42 80% 50% / 0.08)",
    popular: false,
  },
  {
    id: "novo-testamento",
    icon: Flame,
    title: "Novo Testamento",
    description: "Conheça a vida de Jesus e os ensinamentos apostólicos",
    duration: "90 dias",
    chapters: "260 capítulos",
    difficulty: "Iniciante",
    color: "hsl(18 55% 52%)",
    colorBg: "hsl(18 55% 52% / 0.08)",
    popular: false,
  },
  {
    id: "ano-inteiro",
    icon: BookOpen,
    title: "Um Capítulo por Dia",
    description: "Ritmo suave para quem está começando sua jornada bíblica",
    duration: "3 anos",
    chapters: "1.189 capítulos",
    difficulty: "Iniciante",
    color: "hsl(210 60% 42%)",
    colorBg: "hsl(210 60% 42% / 0.08)",
    popular: false,
  },
  {
    id: "evangelhos",
    icon: Cross,
    title: "Os Quatro Evangelhos",
    description: "Mergulhe profundamente na vida e obra de Jesus Cristo",
    duration: "30 dias",
    chapters: "89 capítulos",
    difficulty: "Iniciante",
    color: "hsl(280 40% 45%)",
    colorBg: "hsl(280 40% 45% / 0.08)",
    popular: false,
  },
];

const difficultyOrder = ["Iniciante", "Intermediário", "Completo"];

export default function ReadingPlans() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="planos" className="py-24 bg-background">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            ✦ Planos de Leitura ✦
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground mt-2 mb-4">
            Escolha seu caminho
          </h2>
          <p className="text-muted-foreground">
            Planos estruturados para todos os níveis, do iniciante ao leitor experiente.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selected === plan.id;
            return (
              <div
                key={plan.id}
                onClick={() => setSelected(isSelected ? null : plan.id)}
                className="relative rounded-2xl border p-6 cursor-pointer transition-all duration-200 shadow-card hover:shadow-warm group"
                style={{
                  backgroundColor: isSelected ? plan.colorBg : "hsl(var(--card))",
                  borderColor: isSelected ? plan.color + "55" : "hsl(var(--border))",
                  transform: isSelected ? "translateY(-2px)" : undefined,
                }}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <span
                    className="absolute -top-2.5 left-4 px-3 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: "var(--gradient-gold)",
                      color: "hsl(var(--primary-foreground))",
                    }}
                  >
                    Mais popular
                  </span>
                )}

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: plan.colorBg, color: plan.color }}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Difficulty */}
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {plan.difficulty}
                </span>

                <h3 className="font-display text-xl font-semibold text-foreground mt-1 mb-2">
                  {plan.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {plan.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground pt-4 border-t border-border">
                  <span>{plan.duration}</span>
                  <span>·</span>
                  <span>{plan.chapters}</span>
                </div>

                {/* CTA */}
                <div
                  className="mt-4 flex items-center gap-1 text-sm font-medium transition-colors"
                  style={{ color: isSelected ? plan.color : "hsl(var(--muted-foreground))" }}
                >
                  {isSelected ? "Plano selecionado ✓" : "Selecionar plano"}
                  {!isSelected && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Start button */}
        {selected && (
          <div className="text-center mt-10 animate-fade-up">
            <button
              className="px-10 py-3.5 rounded-xl font-medium gradient-gold shadow-warm hover:opacity-90 transition-opacity text-primary-foreground"
            >
              Começar "{plans.find((p) => p.id === selected)?.title}"
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
