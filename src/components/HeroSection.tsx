import heroBible from "@/assets/hero-bible.jpg";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <img
        src={heroBible}
        alt="Bíblia aberta com luz divina"
        className="absolute inset-0 w-full h-full object-cover"
        width={1280}
        height={720}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />

      {/* Content */}
      <div className="relative z-10 container text-center px-4 flex flex-col items-center gap-6">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium animate-fade-up"
          style={{
            borderColor: "hsl(var(--gold-light) / 0.5)",
            color: "hsl(var(--gold-light))",
            backgroundColor: "hsl(var(--gold) / 0.12)",
            animationDelay: "0.1s",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-light animate-glow-pulse" />
          Leitura bíblica diária
        </div>

        {/* Title */}
        <h1
          className="font-display font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight animate-fade-up"
          style={{ color: "hsl(38 80% 96%)", animationDelay: "0.2s" }}
        >
          Palavra Viva
        </h1>

        {/* Tagline */}
        <p
          className="text-lg sm:text-xl md:text-2xl font-light max-w-md animate-fade-up"
          style={{ color: "hsl(38 50% 85%)", animationDelay: "0.35s" }}
        >
          Conecte-se com Deus todos os dias
        </p>

        {/* Divider cross */}
        <div
          className="flex items-center gap-3 animate-fade-up"
          style={{ animationDelay: "0.45s", color: "hsl(var(--gold-light))" }}
        >
          <div className="h-px w-12 bg-current opacity-50" />
          <span className="text-lg">✦</span>
          <div className="h-px w-12 bg-current opacity-50" />
        </div>

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 animate-fade-up"
          style={{ animationDelay: "0.55s" }}
        >
          <a
            href="#planos"
            className="px-8 py-3 rounded-xl text-base font-medium gradient-gold shadow-warm hover:opacity-90 transition-opacity"
            style={{ color: "hsl(var(--primary-foreground))" }}
          >
            Iniciar minha jornada
          </a>
          <a
            href="#verso"
            className="px-8 py-3 rounded-xl text-base font-medium border transition-colors"
            style={{
              borderColor: "hsl(38 80% 96% / 0.35)",
              color: "hsl(38 80% 96%)",
              backgroundColor: "hsl(38 80% 96% / 0.06)",
            }}
          >
            Verso do dia
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#verso"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"
        style={{ color: "hsl(38 60% 85%)" }}
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}
