import { Globe, Scissors } from "lucide-react";

const barbers = [
  {
    name: "Carlos Silva",
    role: "Barbeiro Master",
    bio: "Barbeiro há mais de 10 anos, especialista em cortes clássicos e modernos.",
    specialties: ["Corte Clássico", "Degradê", "Barba"],
  },
  {
    name: "Rafael Santos",
    role: "Barbeiro Especialista",
    bio: "Expert em degradê e designs exclusivos. Formado pela academia de barbearia.",
    specialties: ["Degradê", "Design", "Pigmentação"],
  },
  {
    name: "Lucas Oliveira",
    role: "Barbeiro & Barber Artist",
    bio: "Especialista em barba e tratamentos capilares. Apaixonado pela arte da barbearia.",
    specialties: ["Barba", "Tratamento Capilar", "Sobrancelha"],
  },
];

export default function TeamSection() {
  return (
    <section id="equipe" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-medium uppercase tracking-widest">
            Nossa Equipe
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold mt-4 mb-6">
            Profissionais de <span className="text-gradient-gold">Elite</span>
          </h2>
          <div className="gold-separator mb-6" />
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Conheça os barbeiros que vão transformar o seu visual.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {barbers.map((barber) => (
            <div
              key={barber.name}
              className="group bg-card border border-border hover:border-gold/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gold/5"
            >
              {/* Photo placeholder */}
              <div className="aspect-[3/4] bg-gradient-to-br from-card-hover to-border relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center">
                    <Scissors className="w-10 h-10 text-gold/50" />
                  </div>
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Social icon */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5 text-background" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold group-hover:text-gold transition-colors">
                  {barber.name}
                </h3>
                <p className="text-gold text-sm mt-1">{barber.role}</p>
                <p className="text-muted text-sm mt-3 leading-relaxed">
                  {barber.bio}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {barber.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
