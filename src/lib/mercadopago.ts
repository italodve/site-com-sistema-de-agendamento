import { MercadoPagoConfig, Preference } from "mercadopago";

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;

let client: MercadoPagoConfig | null = null;

function getClient(): MercadoPagoConfig {
  if (!client) {
    if (!accessToken) {
      throw new Error(
        "MERCADOPAGO_ACCESS_TOKEN is not set. Please add it to your .env.local file."
      );
    }
    client = new MercadoPagoConfig({ accessToken });
  }
  return client;
}

export async function createPaymentPreference(params: {
  title: string;
  description: string;
  price: number; // in centavos
  appointmentId: string;
  payerEmail: string;
  payerName: string;
}) {
  const mpClient = getClient();
  const preference = new Preference(mpClient);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const result = await preference.create({
    body: {
      items: [
        {
          id: params.appointmentId,
          title: params.title,
          description: params.description,
          quantity: 1,
          unit_price: params.price / 100,
          currency_id: "BRL",
        },
      ],
      payer: {
        email: params.payerEmail,
        name: params.payerName,
      },
      back_urls: {
        success: `${baseUrl}/pagamento/sucesso?appointmentId=${params.appointmentId}`,
        failure: `${baseUrl}/pagamento/falha?appointmentId=${params.appointmentId}`,
        pending: `${baseUrl}/pagamento/pendente?appointmentId=${params.appointmentId}`,
      },
      auto_return: "approved",
      external_reference: params.appointmentId,
      notification_url: `${baseUrl}/api/payments/webhook`,
    },
  });

  return result;
}
