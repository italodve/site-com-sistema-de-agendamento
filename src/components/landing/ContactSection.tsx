import { MapPin, Phone, Clock, Mail } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Endereço",
    value: "Rua da Barbearia, 123 - Centro",
    subvalue: "São Paulo, SP - CEP 01000-000",
  },
  {
    icon: Phone,
    label: "Telefone / WhatsApp",
    value: "(11) 99999-9999",
    subvalue: "Atendemos por WhatsApp",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contato@suabarbearia.com.br",
    subvalue: "Respondemos em até 24h",
  },
  {
    icon: Clock,
    label: "Horário de Funcionamento",
    value: "Seg a Sex: 09h - 19h",
    subvalue: "Sábado: 09h - 17h | Domingo: Fechado",
  },
];

export default function ContactSection() {
  return (
    <section id="contato" className="py-24 px-4 bg-card/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-medium uppercase tracking-widest">
            Contato
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-6">
            Onde <span className="text-gradient-gold">Estamos</span>
          </h2>
          <div className="gold-separator" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map placeholder */}
          <div className="aspect-[4/3] bg-card border border-border rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gold/30 mx-auto mb-3" />
                <p className="text-muted text-sm">Mapa do Google</p>
                <p className="text-muted/50 text-xs mt-1">
                  Substitua por um iframe do Google Maps
                </p>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.label}
                  className="flex items-start gap-4 bg-card border border-border rounded-xl p-5 hover:border-gold/20 transition-colors"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <p className="text-muted text-xs uppercase tracking-wider mb-1">
                      {info.label}
                    </p>
                    <p className="font-semibold">{info.value}</p>
                    <p className="text-muted text-sm mt-0.5">{info.subvalue}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
