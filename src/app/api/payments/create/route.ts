import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createPaymentPreference } from "@/lib/mercadopago";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { appointmentId } = body;

  if (!appointmentId) {
    return NextResponse.json(
      { error: "appointmentId is required" },
      { status: 400 }
    );
  }

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: { service: true, barber: true },
  });

  if (!appointment) {
    return NextResponse.json(
      { error: "Appointment not found" },
      { status: 404 }
    );
  }

  try {
    const preference = await createPaymentPreference({
      title: `${appointment.service.name} - Sua Barbearia`,
      description: `Agendamento com ${appointment.barber.name} em ${appointment.date} às ${appointment.startTime}`,
      price: appointment.service.price,
      appointmentId: appointment.id,
      payerEmail: appointment.customerEmail,
      payerName: appointment.customerName,
    });

    // Update appointment with payment info
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        paymentId: preference.id,
        paymentStatus: "pending",
      },
    });

    return NextResponse.json({
      preferenceId: preference.id,
      initPoint: preference.init_point,
      sandboxInitPoint: preference.sandbox_init_point,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    return NextResponse.json(
      { error: "Failed to create payment. Make sure MERCADOPAGO_ACCESS_TOKEN is configured." },
      { status: 500 }
    );
  }
}
