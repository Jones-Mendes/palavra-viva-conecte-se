import { BookOpen, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="font-display text-xl font-semibold">Palavra Viva</p>
              <p className="text-xs opacity-60">Conecte-se com Deus todos os dias</p>
            </div>
          </div>

          {/* Verse */}
          <p className="font-display italic text-sm opacity-70 text-center max-w-xs">
            "A tua palavra é uma lâmpada para os meus pés e luz para o meu caminho."
            <br />
            <span className="not-italic text-xs opacity-80 tracking-wider">Salmos 119:105</span>
          </p>

          {/* Credits */}
          <p className="text-xs opacity-50 flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 fill-current" /> para a glória de Deus
          </p>
        </div>
      </div>
    </footer>
  );
}
