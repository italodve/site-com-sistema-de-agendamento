import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateAvailableSlots } from "@/lib/slots";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const barberId = searchParams.get("barberId");
  const serviceId = searchParams.get("serviceId");
  const date = searchParams.get("date");

  if (!barberId || !serviceId || !date) {
    return NextResponse.json(
      { error: "barberId, serviceId and date are required" },
      { status: 400 }
    );
  }

  // Only allow dates in the current month
  const now = new Date();
  const requestedDate = new Date(date + "T12:00:00");
  if (
    requestedDate.getMonth() !== now.getMonth() ||
    requestedDate.getFullYear() !== now.getFullYear()
  ) {
    return NextResponse.json(
      { error: "Agendamentos disponíveis apenas para o mês atual" },
      { status: 400 }
    );
  }

  // Get service duration
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  // Get day of week from date
  const dayOfWeek = new Date(date + "T12:00:00").getDay();

  // Get working hours for this barber on this day
  const workingHours = await prisma.workingHours.findMany({
    where: { barberId, dayOfWeek },
  });

  if (workingHours.length === 0) {
    return NextResponse.json({ slots: [] });
  }

  // Get existing appointments for this barber on this date
  // Filter out PENDING appointments older than 15 minutes (expired)
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
  const appointments = await prisma.appointment.findMany({
    where: {
      barberId,
      date,
      status: { not: "CANCELLED" },
      OR: [
        { status: { not: "PENDING" } },
        { createdAt: { gte: fifteenMinutesAgo } },
      ],
    },
  });

  // Get blocked slots
  const blockedSlots = await prisma.blockedSlot.findMany({
    where: { barberId, date },
  });

  const availableSlots = generateAvailableSlots(
    workingHours.map((wh) => ({
      startTime: wh.startTime,
      endTime: wh.endTime,
    })),
    appointments.map((a) => ({
      startTime: a.startTime,
      endTime: a.endTime,
    })),
    blockedSlots.map((bs) => ({
      startTime: bs.startTime,
      endTime: bs.endTime,
    })),
    service.durationMinutes
  );

  // Filter out past slots if date is today
  const today = new Date().toISOString().split("T")[0];
  let filteredSlots = availableSlots;
  if (date === today) {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    filteredSlots = availableSlots.filter((slot) => {
      const [h, m] = slot.split(":").map(Number);
      return h * 60 + m > currentMinutes;
    });
  }

  return NextResponse.json({ slots: filteredSlots });
}
