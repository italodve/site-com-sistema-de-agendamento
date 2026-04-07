"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { label: "Serviço" },
  { label: "Barbeiro" },
  { label: "Data" },
  { label: "Horário" },
  { label: "Confirmar" },
];

interface BookingStepperProps {
  currentStep: number;
}

export default function BookingStepper({ currentStep }: BookingStepperProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center">
          {/* Step circle */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all border-2",
                i < currentStep
                  ? "bg-gold border-gold text-background"
                  : i === currentStep
                  ? "border-gold text-gold bg-gold/10"
                  : "border-border text-muted bg-card"
              )}
            >
              {i < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-2 hidden sm:block",
                i <= currentStep ? "text-gold" : "text-muted"
              )}
            >
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {i < steps.length - 1 && (
            <div
              className={cn(
                "w-8 sm:w-16 h-0.5 mx-1 transition-colors",
                i < currentStep ? "bg-gold" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
