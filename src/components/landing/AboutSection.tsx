import { Award, Clock, Users, Shield } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Qualidade Premium",
    description: "Produtos e técnicas de primeira linha",
  },
  {
    icon: Clock,
    title: "Pontualidade",
    description: "Respeito pelo seu tempo com agendamento online",
  },
  {
    icon: Users,
    title: "Profissionais Experientes",
    description: "Equipe treinada e apaixonada pelo que faz",
  },
  {
    icon: Shield,
    title: "Higiene e Segurança",
    description: "Ambiente limpo e materiais esterilizados",
  },
];

export default function AboutSection() {
  return (
    <section id="sobre" className="py-24 px-4 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image placeholder */}
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-card to-border rounded-2xl overflow-hidden border border-border">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-12 h-12 text-gold" />
                  </div>
                  <p className="text-muted text-sm">Foto da Barbearia</p>
                  <p className="text-muted/50 text-xs mt-1">
                    Substitua por sua imagem
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-gold/20 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 border-2 border-gold/10 rounded-2xl -z-10" />
          </div>

          {/* Right - Content */}
          <div>
            <span className="text-gold text-sm font-medium uppercase tracking-widest">
              Sobre Nós
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-6">
              Mais que uma Barbearia,
              <br />
              <span className="text-gradient-gold">Uma Experiência</span>
            </h2>
            <div className="w-20 h-0.5 bg-gold mb-8" />
            <p className="text-muted text-lg leading-relaxed mb-6">
              Fundada com a missão de oferecer o melhor em barbearia masculina,
              a <strong className="text-foreground">Sua Barbearia</strong> é o
              lugar onde tradição encontra modernidade.
            </p>
            <p className="text-muted leading-relaxed mb-10">
              Nosso espaço foi pensado para proporcionar conforto e
              exclusividade. Aqui, cada cliente recebe atenção personalizada e
              sai com a confiança renovada. Venha conhecer e descubra por que
              somos referência na cidade.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{feature.title}</h4>
                      <p className="text-muted text-xs mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
