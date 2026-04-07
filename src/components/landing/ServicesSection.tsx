import { Scissors, Sparkles, Crown, Baby, Palette, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const services = [
  {
    name: "Corte Masculino",
    description: "Corte moderno e estiloso com acabamento perfeito",
    price: 4500,
    duration: "30 min",
    icon: Scissors,
  },
  {
    name: "Barba",
    description: "Modelagem e aparação com navalha e toalha quente",
    price: 3000,
    duration: "20 min",
    icon: Sparkles,
  },
  {
    name: "Combo (Corte + Barba)",
    description: "Pacote completo com desconto especial",
    price: 6500,
    duration: "50 min",
    icon: Crown,
  },
  {
    name: "Corte Infantil",
    description: "Corte especial para crianças até 12 anos",
    price: 3500,
    duration: "25 min",
    icon: Baby,
  },
  {
    name: "Pigmentação",
    description: "Cobertura de fios brancos com pigmentação capilar",
    price: 5000,
    duration: "40 min",
    icon: Palette,
  },
  {
    name: "Sobrancelha",
    description: "Design e alinhamento de sobrancelha masculina",
    price: 1500,
    duration: "10 min",
    icon: Eye,
  },
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-medium uppercase tracking-widest">
            Nossos Serviços
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-6">
            O Melhor Para <span className="text-gradient-gold">Você</span>
          </h2>
          <div className="gold-separator mb-6" />
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Oferecemos uma variedade de serviços premium para que você saia
            sempre com a melhor aparência.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.name}
                className="group bg-card hover:bg-card-hover border border-border hover:border-gold/30 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gold/5"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <span className="text-muted text-sm bg-background/50 px-3 py-1 rounded-full">
                    {service.duration}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                  {service.name}
                </h3>
                <p className="text-muted text-sm mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gold font-serif text-2xl font-bold">
                    {formatCurrency(service.price)}
                  </span>
                  <a
                    href="/agendar"
                    className="text-sm text-gold border border-gold/30 hover:bg-gold hover:text-background px-4 py-2 rounded-lg transition-all"
                  >
                    Agendar
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
