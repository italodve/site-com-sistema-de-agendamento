"use client";

import { Scissors, Sparkles, Crown, Baby, Palette, Eye } from "lucide-react";
import { cn, formatCurrency, formatDuration } from "@/lib/utils";
import type { Service } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  "Corte Masculino": Scissors,
  "Barba": Sparkles,
  "Combo (Corte + Barba)": Crown,
  "Corte Infantil": Baby,
  "Pigmentação": Palette,
  "Sobrancelha": Eye,
};

interface ServicePickerProps {
  services: Service[];
  selected: Service | null;
  onSelect: (service: Service) => void;
}

export default function ServicePicker({
  services,
  selected,
  onSelect,
}: ServicePickerProps) {
  return (
    <div>
      <h2 className="font-serif text-3xl font-bold mb-2 text-center">
        Escolha o <span className="text-gradient-gold">Serviço</span>
      </h2>
      <p className="text-muted text-center mb-8">
        Selecione o serviço que deseja agendar
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => {
          const Icon = iconMap[service.name] || Scissors;
          const isSelected = selected?.id === service.id;

          return (
            <button
              key={service.id}
              onClick={() => onSelect(service)}
              className={cn(
                "text-left bg-card border-2 rounded-xl p-6 transition-all hover:-translate-y-0.5",
                isSelected
                  ? "border-gold shadow-lg shadow-gold/10"
                  : "border-border hover:border-gold/30"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center",
                    isSelected ? "bg-gold/20" : "bg-gold/10"
                  )}
                >
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                {isSelected && (
                  <span className="text-xs bg-gold text-background px-2 py-1 rounded-full font-bold">
                    Selecionado
                  </span>
                )}
              </div>
              <h3 className="font-bold text-lg mb-1">{service.name}</h3>
              <p className="text-muted text-sm mb-4">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-gold font-serif text-xl font-bold">
                  {formatCurrency(service.price)}
                </span>
                <span className="text-muted text-sm">
                  {formatDuration(service.durationMinutes)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
