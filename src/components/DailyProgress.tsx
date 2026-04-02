import { CheckCircle2, Circle, Flame, Trophy, CalendarDays } from "lucide-react";

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const today = new Date().getDay();

// Mock progress data
const weekProgress = weekDays.map((day, i) => ({
  day,
  done: i < today,
  today: i === today,
}));

const stats = [
  { icon: Flame, value: "12", label: "Dias seguidos", color: "hsl(18 55% 52%)" },
  { icon: CalendarDays, value: "47", label: "Dias lidos", color: "hsl(36 75% 38%)" },
  { icon: Trophy, value: "3", label: "Planos completos", color: "hsl(42 80% 50%)" },
];

const recentReadings = [
  { book: "João 3", chapter: "O Novo Nascimento", done: true, date: "Hoje" },
  { book: "João 2", chapter: "Bodas de Caná", done: true, date: "Ontem" },
  { book: "João 1", chapter: "O Verbo se fez Carne", done: true, date: "2 dias atrás" },
  { book: "Lucas 24", chapter: "A Ressurreição", done: false, date: "" },
];

export default function DailyProgress() {
  return (
    <section id="progresso" className="py-24 gradient-divine">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-sm font-medium uppercase tracking-widest text-primary">
            ✦ Seu Progresso ✦
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-foreground mt-2 mb-4">
            Cada dia conta
          </h2>
          <p className="text-muted-foreground">
            Acompanhe sua jornada e celebre cada conquista na leitura da Palavra.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Weekly tracker */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-xl font-semibold text-foreground mb-5">
              Esta semana
            </h3>
            <div className="flex gap-2 justify-between">
              {weekProgress.map(({ day, done, today: isToday }) => (
                <div key={day} className="flex flex-col items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">{day}</span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all"
                    style={{
                      borderColor: isToday
                        ? "hsl(var(--primary))"
                        : done
                        ? "hsl(var(--primary) / 0.3)"
                        : "hsl(var(--border))",
                      backgroundColor: done
                        ? "hsl(var(--primary) / 0.1)"
                        : isToday
                        ? "hsl(var(--primary) / 0.06)"
                        : "transparent",
                    }}
                  >
                    {done ? (
                      <CheckCircle2
                        className="w-5 h-5"
                        style={{ color: "hsl(var(--primary))" }}
                      />
                    ) : (
                      <Circle
                        className="w-4 h-4"
                        style={{
                          color: isToday
                            ? "hsl(var(--primary))"
                            : "hsl(var(--border))",
                        }}
                      />
                    )}
                  </div>
                  {isToday && (
                    <span
                      className="text-xs font-semibold"
                      style={{ color: "hsl(var(--primary))" }}
                    >
                      Hoje
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Progresso semanal</span>
                <span>{today}/7 dias</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full gradient-gold transition-all duration-700"
                  style={{ width: `${(today / 7) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-4">
            {stats.map(({ icon: Icon, value, label, color }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: color + "18", color }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p
                    className="font-display text-3xl font-semibold leading-none"
                    style={{ color }}
                  >
                    {value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent readings */}
          <div className="md:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-xl font-semibold text-foreground mb-5">
              Leituras recentes
            </h3>
            <div className="space-y-3">
              {recentReadings.map((reading, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-xl transition-colors hover:bg-secondary/50"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      reading.done
                        ? "bg-primary/10"
                        : "bg-muted"
                    }`}
                  >
                    {reading.done ? (
                      <CheckCircle2
                        className="w-4 h-4"
                        style={{ color: "hsl(var(--primary))" }}
                      />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{reading.book}</p>
                    <p className="text-xs text-muted-foreground truncate">{reading.chapter}</p>
                  </div>
                  {reading.date && (
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {reading.date}
                    </span>
                  )}
                  {!reading.done && (
                    <button
                      className="flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg gradient-gold text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      Ler agora
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
