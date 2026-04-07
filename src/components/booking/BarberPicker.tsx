"use client";

import { Scissors } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Barber } from "@/types";

interface BarberPickerProps {
  barbers: Barber[];
  selected: Barber | null;
  onSelect: (barber: Barber) => void;
}

export default function BarberPicker({
  barbers,
  selected,
  onSelect,
}: BarberPickerProps) {
  return (
    <div>
      <h2 className="font-serif text-3xl font-bold mb-2 text-center">
        Escolha o <span className="text-gradient-gold">Barbeiro</span>
      </h2>
      <p className="text-muted text-center mb-8">
        Selecione o profissional de sua preferência
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {barbers.map((barber) => {
          const isSelected = selected?.id === barber.id;

          return (
            <button
              key={barber.id}
              onClick={() => onSelect(barber)}
              className={cn(
                "text-center bg-card border-2 rounded-xl p-6 transition-all hover:-translate-y-0.5",
                isSelected
                  ? "border-gold shadow-lg shadow-gold/10"
                  : "border-border hover:border-gold/30"
              )}
            >
              {/* Avatar placeholder */}
              <div
                className={cn(
                  "w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center",
                  isSelected
                    ? "bg-gold/20 border-2 border-gold"
                    : "bg-card-hover border-2 border-border"
                )}
              >
                <Scissors
                  className={cn(
                    "w-8 h-8",
                    isSelected ? "text-gold" : "text-muted"
                  )}
                />
              </div>
              <h3 className="font-bold text-lg mb-1">{barber.name}</h3>
              <p className="text-muted text-sm leading-relaxed">{barber.bio}</p>
              {isSelected && (
                <span className="inline-block mt-3 text-xs bg-gold text-background px-3 py-1 rounded-full font-bold">
                  Selecionado
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
