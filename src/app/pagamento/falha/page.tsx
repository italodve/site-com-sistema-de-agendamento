import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCw, Scissors } from "lucide-react";

export default function FalhaPage() {
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
          <div className="w-20 h-20 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-error" />
          </div>

          <h1 className="font-serif text-4xl font-bold mb-4">
            Pagamento <span className="text-error">Não Aprovado</span>
          </h1>

          <p className="text-muted text-lg mb-8 leading-relaxed">
            Infelizmente, o pagamento não foi processado. Seu horário não foi
            reservado. Você pode tentar novamente ou escolher outra forma de
            pagamento.
          </p>

          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <p className="text-muted text-sm">
              Se o problema persistir, entre em contato conosco pelo WhatsApp
              para efetuar o agendamento manualmente.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/agendar"
              className="flex items-center gap-2 bg-gold hover:bg-gold-hover text-background font-bold px-6 py-3 rounded-lg transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Tentar Novamente
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 border border-border text-muted hover:text-gold hover:border-gold/30 px-6 py-3 rounded-lg transition-all"
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
