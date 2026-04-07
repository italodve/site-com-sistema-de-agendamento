import { prisma } from "./prisma";

let dbReady = false;

export async function ensureDatabaseReady(): Promise<void> {
  if (dbReady) return;

  try {
    // Quick check: can we query the Service table?
    await prisma.$queryRaw`SELECT 1 FROM "Service" LIMIT 1`;
    dbReady = true;
  } catch {
    // Tables don't exist — create them via raw SQL
    console.log("[db-setup] Tables not found, creating via raw SQL...");
    try {
      await createTables();
      console.log("[db-setup] Tables created successfully");
      dbReady = true;
    } catch (createError) {
      console.error("[db-setup] Failed to create tables:", createError);
      throw createError;
    }
  }
}

async function createTables(): Promise<void> {
  // Create tables in dependency order using CREATE TABLE IF NOT EXISTS
  // Schema derived from prisma/schema.prisma

  // 1. Service (no foreign keys)
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Service" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "price" INTEGER NOT NULL,
      "durationMinutes" INTEGER NOT NULL,
      "imageUrl" TEXT,
      "active" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
    )
  `);

  // 2. Barber (no foreign keys)
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Barber" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "bio" TEXT NOT NULL,
      "photoUrl" TEXT,
      "active" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Barber_pkey" PRIMARY KEY ("id")
    )
  `);

  // 3. WorkingHours (FK -> Barber)
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "WorkingHours" (
      "id" TEXT NOT NULL,
      "barberId" TEXT NOT NULL,
      "dayOfWeek" INTEGER NOT NULL,
      "startTime" TEXT NOT NULL,
      "endTime" TEXT NOT NULL,
      CONSTRAINT "WorkingHours_pkey" PRIMARY KEY ("id"),
      CONSTRAINT "WorkingHours_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE
    )
  `);

  // 4. Appointment (FK -> Barber, Service)
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Appointment" (
      "id" TEXT NOT NULL,
      "barberId" TEXT NOT NULL,
      "serviceId" TEXT NOT NULL,
      "customerName" TEXT NOT NULL,
      "customerPhone" TEXT NOT NULL,
      "customerEmail" TEXT NOT NULL,
      "date" TEXT NOT NULL,
      "startTime" TEXT NOT NULL,
      "endTime" TEXT NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'PENDING',
      "paymentId" TEXT,
      "paymentStatus" TEXT,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id"),
      CONSTRAINT "Appointment_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
      CONSTRAINT "Appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE
    )
  `);

  // 5. BlockedSlot (FK -> Barber)
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "BlockedSlot" (
      "id" TEXT NOT NULL,
      "barberId" TEXT NOT NULL,
      "date" TEXT NOT NULL,
      "startTime" TEXT NOT NULL,
      "endTime" TEXT NOT NULL,
      "reason" TEXT,
      CONSTRAINT "BlockedSlot_pkey" PRIMARY KEY ("id"),
      CONSTRAINT "BlockedSlot_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE
    )
  `);
}
