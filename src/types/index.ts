export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  imageUrl: string | null;
  active: boolean;
}

export interface Barber {
  id: string;
  name: string;
  bio: string;
  photoUrl: string | null;
  active: boolean;
}

export interface WorkingHours {
  id: string;
  barberId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface Appointment {
  id: string;
  barberId: string;
  serviceId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  paymentId: string | null;
  paymentStatus: string | null;
  createdAt: string;
}

export interface BlockedSlot {
  id: string;
  barberId: string;
  date: string;
  startTime: string;
  endTime: string;
  reason: string | null;
}

export interface BookingState {
  step: number;
  service: Service | null;
  barber: Barber | null;
  date: string | null;
  time: string | null;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}
