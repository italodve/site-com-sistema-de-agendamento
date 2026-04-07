"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Scissors } from "lucide-react";
import Link from "next/link";
import BookingStepper from "@/components/booking/BookingStepper";
import ServicePicker from "@/components/booking/ServicePicker";
import BarberPicker from "@/components/booking/BarberPicker";
import DatePicker from "@/components/booking/DatePicker";
import TimeSlotPicker from "@/components/booking/TimeSlotPicker";
import BookingSummary from "@/components/booking/BookingSummary";
import type { Service, Barber } from "@/types";

export default function AgendarPage() {
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Booking state
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // Fetch services and barbers on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const [servicesRes, barbersRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/barbers"),
        ]);
        if (!servicesRes.ok) {
          const detail = await servicesRes.text().catch(() => "");
          throw new Error(`Serviços: ${servicesRes.status} ${detail}`);
        }
        if (!barbersRes.ok) {
          const detail = await barbersRes.text().catch(() => "");
          throw new Error(`Barbeiros: ${barbersRes.status} ${detail}`);
        }
        const [servicesData, barbersData] = await Promise.all([
          servicesRes.json(),
          barbersRes.json(),
        ]);
        setServices(Array.isArray(servicesData) ? servicesData : []);
        setBarbers(Array.isArray(barbersData) ? barbersData : []);
      } catch (err) {
        console.error("Error loading data:", err);
        const msg = err instanceof Error ? err.message : String(err);
        setError(`Erro ao carregar dados: ${msg}`);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Fetch available slots when barber + service + date are selected
  const fetchSlots = useCallback(async () => {
    if (!selectedBarber || !selectedService || !selectedDate) return;

    setSlotsLoading(true);
    try {
      const params = new URLSearchParams({
        barberId: selectedBarber.id,
        serviceId: selectedService.id,
        date: selectedDate,
      });
      const res = await fetch(`/api/available-slots?${params}`);
      if (!res.ok) throw new Error("Failed to fetch slots");
      const data = await res.json();
      setAvailableSlots(data.slots || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
      setAvailableSlots([]);
    } finally {
      setSlotsLoading(false);
    }
  }, [selectedBarber, selectedService, selectedDate]);

  useEffect(() => {
    if (step === 3) {
      fetchSlots();
    }
  }, [step, fetchSlots]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setTimeout(() => setStep(1), 300);
  };

  const handleBarberSelect = (barber: Barber) => {
    setSelectedBarber(barber);
    setTimeout(() => setStep(2), 300);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setTimeout(() => setStep(3), 300);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setTimeout(() => setStep(4), 300);
  };

  const handleConfirm = async () => {
    if (
      !selectedService ||
      !selectedBarber ||
      !selectedDate ||
      !selectedTime
    )
      return;

    setConfirmLoading(true);

    try {
      // Create appointment
      const appointmentRes = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          barberId: selectedBarber.id,
          serviceId: selectedService.id,
          customerName,
          customerPhone,
          customerEmail,
          date: selectedDate,
          startTime: selectedTime,
        }),
      });

      if (!appointmentRes.ok) {
        let errorMsg = "Erro ao criar agendamento";
        try {
          const error = await appointmentRes.json();
          errorMsg = error.error || errorMsg;
        } catch {
          // Response was not JSON
        }
        alert(errorMsg);
        setConfirmLoading(false);
        return;
      }

      const appointment = await appointmentRes.json();

      // Create payment
      const paymentRes = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: appointment.id }),
      });

      if (paymentRes.ok) {
        const payment = await paymentRes.json();
        // Redirect to Mercado Pago checkout
        if (payment.initPoint) {
          window.location.href = payment.initPoint;
          return;
        }
        if (payment.sandboxInitPoint) {
          window.location.href = payment.sandboxInitPoint;
          return;
        }
      }

      // If payment creation fails (e.g., no API key), redirect to success page directly
      window.location.href = `/pagamento/sucesso?appointmentId=${appointment.id}`;
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Erro ao processar agendamento. Tente novamente.");
    } finally {
      setConfirmLoading(false);
    }
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Voltar</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-gold" />
            <span className="font-serif text-xl font-bold text-gradient-gold">
              Sua Barbearia
            </span>
          </Link>
          <div className="w-20" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <BookingStepper currentStep={step} />

        {/* Back button (within steps) */}
        {step > 0 && (
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-muted hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Voltar ao passo anterior</span>
          </button>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-3 border-gold/30 border-t-gold rounded-full animate-spin mb-4" />
            <p className="text-muted">Carregando serviços...</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gold text-background rounded-lg hover:bg-gold-light transition-colors font-medium"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Step content */}
        {!loading && !error && step === 0 && (
          <ServicePicker
            services={services}
            selected={selectedService}
            onSelect={handleServiceSelect}
          />
        )}
        {!loading && !error && step === 1 && (
          <BarberPicker
            barbers={barbers}
            selected={selectedBarber}
            onSelect={handleBarberSelect}
          />
        )}
        {!loading && !error && step === 2 && (
          <DatePicker
            selected={selectedDate}
            onSelect={handleDateSelect}
          />
        )}
        {!loading && !error && step === 3 && (
          <TimeSlotPicker
            slots={availableSlots}
            selected={selectedTime}
            onSelect={handleTimeSelect}
            loading={slotsLoading}
          />
        )}
        {!loading && !error && step === 4 && selectedService && selectedBarber && selectedDate && selectedTime && (
          <BookingSummary
            service={selectedService}
            barber={selectedBarber}
            date={selectedDate}
            time={selectedTime}
            customerName={customerName}
            customerPhone={customerPhone}
            customerEmail={customerEmail}
            onCustomerNameChange={setCustomerName}
            onCustomerPhoneChange={setCustomerPhone}
            onCustomerEmailChange={setCustomerEmail}
            onConfirm={handleConfirm}
            loading={confirmLoading}
          />
        )}
      </div>
    </div>
  );
}
