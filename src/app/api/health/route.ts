import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const result: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV || "unknown",
      databaseUrlSet: !!process.env.DATABASE_URL,
    },
  };

  // Test database connectivity
  try {
    await prisma.$queryRaw`SELECT 1`;
    result.database = { connected: true };
  } catch (error) {
    result.database = { connected: false, error: String(error) };
    result.status = "error";
    return NextResponse.json(result, { status: 503 });
  }

  // Check if tables exist and have data
  try {
    const serviceCount = await prisma.service.count();
    const barberCount = await prisma.barber.count();
    (result.database as Record<string, unknown>).tablesExist = true;
    (result.database as Record<string, unknown>).serviceCount = serviceCount;
    (result.database as Record<string, unknown>).barberCount = barberCount;
    result.status = serviceCount > 0 && barberCount > 0 ? "ok" : "no_data";
  } catch {
    (result.database as Record<string, unknown>).tablesExist = false;
    result.status = "no_tables";
  }

  return NextResponse.json(result);
}
