"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marcos Almeida",
    text: "Melhor barbearia que já frequentei! O Carlos é um artista com a tesoura. Ambiente incrível e atendimento nota 10.",
    rating: 5,
  },
  {
    name: "Pedro Henrique",
    text: "Sempre saio satisfeito. O sistema de agendamento é muito prático, não preciso mais esperar em fila. Recomendo demais!",
    rating: 5,
  },
  {
    name: "João Victor",
    text: "A atenção aos detalhes é impressionante. A barba fica perfeita toda vez. Já indiquei para todos os meus amigos.",
    rating: 5,
  },
  {
    name: "André Costa",
    text: "Faço combo toda semana e não troco por nada. Profissionais excelentes e preço justo. Barbearia top!",
    rating: 5,
  },
  {
    name: "Felipe Souza",
    text: "O ambiente é muito aconchegante e os barbeiros são muito habilidosos. Meu degradê nunca ficou tão bom!",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="depoimentos" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-medium uppercase tracking-widest">
            Depoimentos
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-6">
            O que Dizem <span className="text-gradient-gold">Nossos Clientes</span>
          </h2>
          <div className="gold-separator" />
        </div>

        {/* Testimonial card */}
        <div className="relative bg-card border border-border rounded-2xl p-8 md:p-12">
          <Quote className="absolute top-6 left-6 w-12 h-12 text-gold/10" />

          <div className="text-center relative z-10">
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({ length: testimonials[current].rating }).map(
                (_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-gold fill-gold"
                  />
                )
              )}
            </div>

            {/* Text */}
            <p className="text-lg md:text-xl leading-relaxed text-foreground/90 mb-8 max-w-2xl mx-auto italic">
              &ldquo;{testimonials[current].text}&rdquo;
            </p>

            {/* Author */}
            <div>
              <p className="font-serif text-xl font-bold text-gold">
                {testimonials[current].name}
              </p>
              <p className="text-muted text-sm mt-1">Cliente</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 border border-border hover:border-gold rounded-full flex items-center justify-center transition-colors hover:text-gold"
              aria-label="Depoimento anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === current
                      ? "bg-gold w-6"
                      : "bg-border hover:bg-muted"
                  }`}
                  aria-label={`Ir para depoimento ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 border border-border hover:border-gold rounded-full flex items-center justify-center transition-colors hover:text-gold"
              aria-label="Próximo depoimento"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
