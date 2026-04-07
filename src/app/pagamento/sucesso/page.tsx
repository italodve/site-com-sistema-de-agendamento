import Link from "next/link";
import { CheckCircle, Calendar, ArrowLeft, Scissors } from "lucide-react";

export default function SucessoPage() {
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
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>

          <h1 className="font-serif text-4xl font-bold mb-4">
            Agendamento <span className="text-gradient-gold">Confirmado!</span>
          </h1>

          <p className="text-muted text-lg mb-8 leading-relaxed">
            Seu pagamento foi aprovado e seu horário está reservado. Você
            receberá uma confirmação por e-mail com os detalhes do agendamento.
          </p>

          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3 justify-center text-success">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Horário reservado com sucesso</span>
            </div>
            <p className="text-muted text-sm mt-3">
              Lembre-se de chegar 5 minutos antes do horário agendado.
              Em caso de imprevisto, entre em contato pelo WhatsApp.
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
            <Link
              href="/agendar"
              className="flex items-center gap-2 border border-gold/30 text-gold hover:bg-gold/5 px-6 py-3 rounded-lg transition-all"
            >
              Novo Agendamento
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
