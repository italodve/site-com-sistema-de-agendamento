import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || "";
  let maskedUrl = "NOT SET";
  if (dbUrl) {
    try {
      const url = new URL(dbUrl);
      maskedUrl = `${url.protocol}//${url.username}:***@${url.hostname}:${url.port || 5432}${url.pathname}`;
    } catch {
      maskedUrl = `INVALID (length: ${dbUrl.length})`;
    }
  }

  const result: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV || "unknown",
      databaseUrl: maskedUrl,
    },
  };

  // Test database connectivity
  try {
    await prisma.$queryRaw`SELECT 1`;
    result.database = { connected: true };
  } catch (error) {
    result.database = { connected: false, error: String(error) };
    result.status = "db_error";
    // Return 200 so healthcheck doesn't fail on DB issues
    return NextResponse.json(result);
  }

  // Check if tables exist and have data
  try {
    const serviceCount = await prisma.service.count();
    const barberCount = await prisma.barber.count();
    (result.database as Record<string, unknown>).tablesExist = true;
    (result.database as Record<string, unknown>).serviceCount = serviceCount;
    (result.database as Record<string, unknown>).barberCount = barberCount;
    result.status = serviceCount > 0 && barberCount > 0 ? "ok" : "no_data";
  } catch (error) {
    (result.database as Record<string, unknown>).tablesExist = false;
    (result.database as Record<string, unknown>).tableError = String(error);
    result.status = "no_tables";
  }

  return NextResponse.json(result);
}
