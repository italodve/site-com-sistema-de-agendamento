import { Scissors, Globe, Share2 } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-6 h-6 text-gold" />
              <span className="font-serif text-xl font-bold text-gradient-gold">
                Sua Barbearia
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Estilo e tradição em cada corte. A melhor experiência em barbearia
              masculina da cidade.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gold">
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              {[
                { href: "#servicos", label: "Serviços" },
                { href: "#sobre", label: "Sobre Nós" },
                { href: "#equipe", label: "Equipe" },
                { href: "#contato", label: "Contato" },
                { href: "/agendar", label: "Agendar Horário" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gold">
              Redes Sociais
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-gold/10 hover:bg-gold/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Globe className="w-5 h-5 text-gold" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gold/10 hover:bg-gold/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Share2 className="w-5 h-5 text-gold" />
              </a>
            </div>
            <p className="text-muted text-sm mt-4">
              Siga-nos nas redes sociais e fique por dentro das novidades!
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} Sua Barbearia. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
