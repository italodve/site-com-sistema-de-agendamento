import Link from "next/link";
import { Calendar, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-background">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A960' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Star className="w-4 h-4 text-gold fill-gold" />
          <span className="text-gold text-sm font-medium tracking-wide">
            A melhor barbearia da cidade
          </span>
          <Star className="w-4 h-4 text-gold fill-gold" />
        </div>

        {/* Main heading */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fade-in-up">
          Estilo e Tradição
          <br />
          <span className="text-gradient-gold">em Cada Corte</span>
        </h1>

        {/* Separator */}
        <div className="gold-separator mb-6 animate-fade-in animation-delay-200" />

        {/* Subtitle */}
        <p className="text-muted text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          Experiência premium em barbearia masculina. Cortes modernos, barba
          impecável e um ambiente que você merece.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-400">
          <Link
            href="/agendar"
            className="group flex items-center gap-3 bg-gold hover:bg-gold-hover text-background font-bold px-8 py-4 rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-gold/20 text-lg"
          >
            <Calendar className="w-5 h-5 transition-transform group-hover:-rotate-12" />
            Agendar Horário
          </Link>
          <a
            href="#servicos"
            className="flex items-center gap-2 border border-gold/30 hover:border-gold text-gold px-8 py-4 rounded-lg transition-all hover:bg-gold/5 text-lg"
          >
            Ver Serviços
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-in-up animation-delay-600">
          {[
            { value: "5000+", label: "Clientes Atendidos" },
            { value: "10+", label: "Anos de Experiência" },
            { value: "4.9", label: "Avaliação Google" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-gold font-serif text-2xl sm:text-3xl font-bold">
                {stat.value}
              </div>
              <div className="text-muted text-xs sm:text-sm mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gold/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
