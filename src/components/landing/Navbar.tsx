"use client";

import { useState, useEffect } from "react";
import { Menu, X, Scissors } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#equipe", label: "Equipe" },
  { href: "#galeria", label: "Galeria" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Scissors className="w-8 h-8 text-gold transition-transform group-hover:rotate-45" />
            <span className="font-serif text-2xl font-bold text-gradient-gold">
              Sua Barbearia
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted hover:text-gold transition-colors text-sm uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/agendar"
              className="bg-gold hover:bg-gold-hover text-background font-semibold px-6 py-2.5 rounded-lg transition-all hover:scale-105 text-sm uppercase tracking-wider"
            >
              Agendar Agora
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-muted hover:text-gold transition-colors text-sm uppercase tracking-wider py-2"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/agendar"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-gold hover:bg-gold-hover text-background font-semibold px-6 py-3 rounded-lg transition-all text-sm uppercase tracking-wider"
            >
              Agendar Agora
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
