import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/seed";

export async function GET() {
  try {
    let services = await prisma.service.findMany({
      where: { active: true },
      orderBy: { createdAt: "asc" },
    });

    // Auto-seed if database is empty
    if (services.length === 0) {
      await seedDatabase();
      services = await prisma.service.findMany({
        where: { active: true },
        orderBy: { createdAt: "asc" },
      });
    }

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json([], { status: 200 });
  }
}
