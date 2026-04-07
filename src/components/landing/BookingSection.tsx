import Link from "next/link";
import { Calendar, Clock, CreditCard } from "lucide-react";

export default function BookingSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-gold/10 to-gold/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="font-serif text-4xl sm:text-5xl font-bold mb-6">
          Pronto para o{" "}
          <span className="text-gradient-gold">Novo Visual</span>?
        </h2>
        <p className="text-muted text-lg mb-12 max-w-2xl mx-auto">
          Agende seu horário em poucos cliques. Escolha o serviço, barbeiro,
          data e horário que preferir. Rápido e fácil!
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: Calendar,
              step: "01",
              title: "Escolha o Horário",
              desc: "Selecione o serviço, barbeiro e horário ideal para você",
            },
            {
              icon: CreditCard,
              step: "02",
              title: "Confirme e Pague",
              desc: "Pague online via PIX, cartão ou boleto com segurança",
            },
            {
              icon: Clock,
              step: "03",
              title: "Apareça e Aproveite",
              desc: "Chegue no horário marcado e aproveite o atendimento",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-gold text-background text-xs font-bold rounded-full flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <Link
          href="/agendar"
          className="inline-flex items-center gap-3 bg-gold hover:bg-gold-hover text-background font-bold px-10 py-4 rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-gold/20 text-lg"
        >
          <Calendar className="w-5 h-5" />
          Agendar Meu Horário
        </Link>
      </div>
    </section>
  );
}
