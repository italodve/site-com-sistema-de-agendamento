import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Skip if already seeded
  const existingServices = await prisma.service.count();
  if (existingServices > 0) {
    console.log("[seed] Database already seeded, skipping.");
    return;
  }

  console.log("[seed] Seeding database...");

  // Create services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: "Corte Masculino",
        description: "Corte moderno e estiloso com acabamento perfeito",
        price: 4500,
        durationMinutes: 30,
      },
    }),
    prisma.service.create({
      data: {
        name: "Barba",
        description: "Modelagem e aparação de barba com navalha e toalha quente",
        price: 3000,
        durationMinutes: 20,
      },
    }),
    prisma.service.create({
      data: {
        name: "Combo (Corte + Barba)",
        description: "Pacote completo de corte e barba com desconto especial",
        price: 6500,
        durationMinutes: 50,
      },
    }),
    prisma.service.create({
      data: {
        name: "Corte Infantil",
        description: "Corte especial para crianças até 12 anos",
        price: 3500,
        durationMinutes: 25,
      },
    }),
    prisma.service.create({
      data: {
        name: "Pigmentação",
        description: "Pigmentação capilar para cobertura de fios brancos",
        price: 5000,
        durationMinutes: 40,
      },
    }),
    prisma.service.create({
      data: {
        name: "Sobrancelha",
        description: "Design e alinhamento de sobrancelha masculina",
        price: 1500,
        durationMinutes: 10,
      },
    }),
  ]);

  // Create barbers
  const barbers = await Promise.all([
    prisma.barber.create({
      data: {
        name: "Carlos Silva",
        bio: "Barbeiro há mais de 10 anos, especialista em cortes clássicos e modernos.",
      },
    }),
    prisma.barber.create({
      data: {
        name: "Rafael Santos",
        bio: "Expert em degradê e designs exclusivos. Formado pela academia de barbearia.",
      },
    }),
    prisma.barber.create({
      data: {
        name: "Lucas Oliveira",
        bio: "Especialista em barba e tratamentos capilares. Apaixonado pela arte da barbearia.",
      },
    }),
  ]);

  // Create working hours for each barber (Monday to Saturday, 9:00 - 19:00)
  for (const barber of barbers) {
    for (let day = 1; day <= 6; day++) {
      await prisma.workingHours.create({
        data: {
          barberId: barber.id,
          dayOfWeek: day,
          startTime: "09:00",
          endTime: "19:00",
        },
      });
    }
  }

  console.log(`[seed] Created ${services.length} services`);
  console.log(`[seed] Created ${barbers.length} barbers`);
  console.log("[seed] Created working hours (Mon-Sat, 09:00-19:00)");
  console.log("[seed] Done!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("[seed] Error:", e);
    await prisma.$disconnect();
    // Don't exit with error code - this would break Railway deploy
  });
