import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "../fonts/geist-latin.woff2",
  variable: "--font-inter",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

export const metadata: Metadata = {
  title: "Sua Barbearia | Estilo e Tradição em Cada Corte",
  description:
    "Agende seu horário na melhor barbearia da cidade. Cortes masculinos, barba, combo e muito mais. Atendimento de qualidade com os melhores profissionais.",
  keywords: ["barbearia", "corte masculino", "barba", "agendamento", "barbershop"],
  openGraph: {
    title: "Sua Barbearia | Estilo e Tradição em Cada Corte",
    description:
      "Agende seu horário na melhor barbearia da cidade. Cortes masculinos, barba, combo e muito mais.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
