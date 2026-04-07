import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MercadoPagoConfig, Payment } from "mercadopago";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Mercado Pago sends different notification types
  if (body.type === "payment" || body.action === "payment.updated") {
    const paymentId = body.data?.id;

    if (!paymentId) {
      return NextResponse.json({ received: true });
    }

    try {
      const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
      if (!accessToken) {
        console.error("MERCADOPAGO_ACCESS_TOKEN not configured");
        return NextResponse.json({ error: "Not configured" }, { status: 500 });
      }

      const client = new MercadoPagoConfig({ accessToken });
      const paymentApi = new Payment(client);
      const paymentData = await paymentApi.get({ id: paymentId });

      const externalReference = paymentData.external_reference;

      if (externalReference) {
        let newStatus: string;

        switch (paymentData.status) {
          case "approved":
            newStatus = "CONFIRMED";
            break;
          case "rejected":
          case "cancelled":
            newStatus = "CANCELLED";
            break;
          default:
            newStatus = "PENDING";
        }

        await prisma.appointment.update({
          where: { id: externalReference },
          data: {
            paymentStatus: paymentData.status ?? "unknown",
            status: newStatus,
          },
        });
      }
    } catch (error) {
      console.error("Webhook error:", error);
    }
  }

  return NextResponse.json({ received: true });
}
