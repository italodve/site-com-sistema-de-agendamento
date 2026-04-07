import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    barberId,
    serviceId,
    customerName,
    customerPhone,
    customerEmail,
    date,
    startTime,
  } = body;

  if (
    !barberId ||
    !serviceId ||
    !customerName ||
    !customerPhone ||
    !customerEmail ||
    !date ||
    !startTime
  ) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  // Get service to calculate end time
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
  });

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  // Calculate end time
  const [startH, startM] = startTime.split(":").map(Number);
  const totalMinutes = startH * 60 + startM + service.durationMinutes;
  const endH = Math.floor(totalMinutes / 60);
  const endM = totalMinutes % 60;
  const endTime = `${endH.toString().padStart(2, "0")}:${endM
    .toString()
    .padStart(2, "0")}`;

  // Check for conflicts
  const conflicting = await prisma.appointment.findFirst({
    where: {
      barberId,
      date,
      status: { not: "CANCELLED" },
      AND: [
        { startTime: { lt: endTime } },
        { endTime: { gt: startTime } },
      ],
    },
  });

  if (conflicting) {
    return NextResponse.json(
      { error: "This time slot is no longer available" },
      { status: 409 }
    );
  }

  // Create appointment
  const appointment = await prisma.appointment.create({
    data: {
      barberId,
      serviceId,
      customerName,
      customerPhone,
      customerEmail,
      date,
      startTime,
      endTime,
      status: "PENDING",
    },
    include: {
      service: true,
      barber: true,
    },
  });

  return NextResponse.json(appointment, { status: 201 });
}
