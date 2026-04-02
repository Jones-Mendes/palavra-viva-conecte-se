import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Verso do Dia", href: "#verso" },
  { label: "Temas", href: "#temas" },
  { label: "Planos", href: "#planos" },
  { label: "Progresso", href: "#progresso" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center shadow-warm">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-semibold text-foreground tracking-wide">
            Palavra Viva
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#planos"
            className="px-4 py-2 text-sm font-medium rounded-lg gradient-gold text-primary-foreground shadow-warm hover:opacity-90 transition-opacity"
          >
            Começar agora
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-4 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#planos"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-2 text-sm font-medium rounded-lg gradient-gold text-primary-foreground text-center shadow-warm"
          >
            Começar agora
          </a>
        </div>
      )}
    </header>
  );
}
