"use client";

import { Calendar, Clock, User, Scissors, CreditCard, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Service, Barber } from "@/types";

interface BookingSummaryProps {
  service: Service;
  barber: Barber;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  onCustomerNameChange: (value: string) => void;
  onCustomerPhoneChange: (value: string) => void;
  onCustomerEmailChange: (value: string) => void;
  onConfirm: () => void;
  loading: boolean;
}

export default function BookingSummary({
  service,
  barber,
  date,
  time,
  customerName,
  customerPhone,
  customerEmail,
  onCustomerNameChange,
  onCustomerPhoneChange,
  onCustomerEmailChange,
  onConfirm,
  loading,
}: BookingSummaryProps) {
  const formattedDate = new Date(date + "T12:00:00").toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const isFormValid =
    customerName.trim().length >= 2 &&
    customerPhone.trim().length >= 10 &&
    customerEmail.trim().includes("@");

  return (
    <div>
      <h2 className="font-serif text-3xl font-bold mb-2 text-center">
        Confirme seu <span className="text-gradient-gold">Agendamento</span>
      </h2>
      <p className="text-muted text-center mb-8">
        Revise os dados e preencha suas informações
      </p>

      <div className="max-w-lg mx-auto space-y-6">
        {/* Summary card */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-lg text-gold mb-4">
            Resumo do Agendamento
          </h3>

          <div className="flex items-center gap-3">
            <Scissors className="w-5 h-5 text-gold shrink-0" />
            <div>
              <p className="text-sm text-muted">Serviço</p>
              <p className="font-medium">{service.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gold shrink-0" />
            <div>
              <p className="text-sm text-muted">Barbeiro</p>
              <p className="font-medium">{barber.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gold shrink-0" />
            <div>
              <p className="text-sm text-muted">Data</p>
              <p className="font-medium capitalize">{formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gold shrink-0" />
            <div>
              <p className="text-sm text-muted">Horário</p>
              <p className="font-medium">{time}</p>
            </div>
          </div>

          <div className="border-t border-border pt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gold shrink-0" />
              <span className="text-sm text-muted">Total</span>
            </div>
            <span className="text-gold font-serif text-2xl font-bold">
              {formatCurrency(service.price)}
            </span>
          </div>
        </div>

        {/* Customer info form */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-lg text-gold mb-2">
            Seus Dados
          </h3>

          <div>
            <label className="block text-sm text-muted mb-1.5">
              Nome completo *
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">
              Telefone / WhatsApp *
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => onCustomerPhoneChange(e.target.value)}
              placeholder="(11) 99999-9999"
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">
              E-mail *
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => onCustomerEmailChange(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted/50 focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        </div>

        {/* Confirm button */}
        <button
          onClick={onConfirm}
          disabled={!isFormValid || loading}
          className="w-full bg-gold hover:bg-gold-hover disabled:bg-gold/30 disabled:cursor-not-allowed text-background font-bold py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-gold/20 flex items-center justify-center gap-3 text-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Confirmar e Pagar
            </>
          )}
        </button>

        <p className="text-center text-muted text-xs">
          Você será redirecionado para o Mercado Pago para efetuar o pagamento
          via PIX, cartão de crédito ou boleto.
        </p>
      </div>
    </div>
  );
}
