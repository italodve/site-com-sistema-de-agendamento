"use client";

import { Clock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSlotPickerProps {
  slots: string[];
  selected: string | null;
  onSelect: (time: string) => void;
  loading: boolean;
}

export default function TimeSlotPicker({
  slots,
  selected,
  onSelect,
  loading,
}: TimeSlotPickerProps) {
  return (
    <div>
      <h2 className="font-serif text-3xl font-bold mb-2 text-center">
        Escolha o <span className="text-gradient-gold">Horário</span>
      </h2>
      <p className="text-muted text-center mb-8">
        Selecione o horário disponível
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-gold animate-spin" />
          <span className="text-muted ml-3">Carregando horários...</span>
        </div>
      ) : slots.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-2xl">
          <Clock className="w-12 h-12 text-muted/30 mx-auto mb-4" />
          <p className="text-muted text-lg">
            Nenhum horário disponível nesta data.
          </p>
          <p className="text-muted/60 text-sm mt-2">
            Tente selecionar outra data ou barbeiro.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-w-xl mx-auto">
          {slots.map((slot) => (
            <button
              key={slot}
              onClick={() => onSelect(slot)}
              className={cn(
                "py-3 px-4 rounded-xl text-center font-medium transition-all border-2",
                selected === slot
                  ? "bg-gold text-background border-gold font-bold"
                  : "bg-card border-border hover:border-gold/30 hover:bg-gold/5 text-foreground"
              )}
            >
              <Clock
                className={cn(
                  "w-4 h-4 mx-auto mb-1",
                  selected === slot ? "text-background" : "text-gold"
                )}
              />
              {slot}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
