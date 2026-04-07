import Link from "next/link";
import { Clock, ArrowLeft, Scissors } from "lucide-react";

export default function PendentePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-center">
          <Link href="/" className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-gold" />
            <span className="font-serif text-xl font-bold text-gradient-gold">
              Sua Barbearia
            </span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-gold" />
          </div>

          <h1 className="font-serif text-4xl font-bold mb-4">
            Pagamento <span className="text-gradient-gold">Pendente</span>
          </h1>

          <p className="text-muted text-lg mb-8 leading-relaxed">
            Seu pagamento está sendo processado. Assim que for confirmado, seu
            horário será reservado automaticamente e você receberá uma
            confirmação por e-mail.
          </p>

          <div className="bg-card border border-border rounded-2xl p-6 mb-8 space-y-3">
            <p className="text-foreground font-medium">
              Pagamento via PIX ou Boleto?
            </p>
            <p className="text-muted text-sm">
              O PIX é confirmado em poucos segundos. Boletos podem levar até 2
              dias úteis para compensar. Seu horário ficará reservado por 15
              minutos enquanto aguardamos a confirmação.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 bg-gold hover:bg-gold-hover text-background font-bold px-6 py-3 rounded-lg transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
