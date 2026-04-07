"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  selected: string | null;
  onSelect: (date: string) => void;
}

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export default function DatePicker({ selected, onSelect }: DatePickerProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // Disable past dates and Sundays
    return date < todayStart || date.getDay() === 0;
  };

  const formatDateStr = (day: number) => {
    const m = (currentMonth + 1).toString().padStart(2, "0");
    const d = day.toString().padStart(2, "0");
    return `${currentYear}-${m}-${d}`;
  };

  const isPastMonth =
    currentYear < today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth <= today.getMonth());

  return (
    <div>
      <h2 className="font-serif text-3xl font-bold mb-2 text-center">
        Escolha a <span className="text-gradient-gold">Data</span>
      </h2>
      <p className="text-muted text-center mb-8">
        Selecione o dia do seu agendamento
      </p>

      <div className="max-w-md mx-auto bg-card border border-border rounded-2xl p-6">
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            disabled={isPastMonth}
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
              isPastMonth
                ? "text-muted/30 cursor-not-allowed"
                : "hover:bg-gold/10 text-muted hover:text-gold"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="font-serif text-xl font-bold">
            {MONTHS[currentMonth]} {currentYear}
          </h3>
          <button
            onClick={nextMonth}
            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gold/10 text-muted hover:text-gold transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center text-muted text-xs font-medium py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for offset */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Day cells */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = formatDateStr(day);
            const disabled = isDateDisabled(day);
            const isSelected = selected === dateStr;
            const isToday =
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear();

            return (
              <button
                key={day}
                onClick={() => !disabled && onSelect(dateStr)}
                disabled={disabled}
                className={cn(
                  "aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all",
                  disabled
                    ? "text-muted/30 cursor-not-allowed"
                    : isSelected
                    ? "bg-gold text-background font-bold"
                    : isToday
                    ? "border border-gold text-gold hover:bg-gold/10"
                    : "hover:bg-gold/10 hover:text-gold text-foreground"
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
