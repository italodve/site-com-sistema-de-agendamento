import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedDatabase } from "@/lib/seed";

export async function GET() {
  try {
    let barbers = await prisma.barber.findMany({
      where: { active: true },
      orderBy: { createdAt: "asc" },
    });

    // Auto-seed if database is empty
    if (barbers.length === 0) {
      await seedDatabase();
      barbers = await prisma.barber.findMany({
        where: { active: true },
        orderBy: { createdAt: "asc" },
      });
    }

    return NextResponse.json(barbers);
  } catch (error) {
    console.error("Error fetching barbers:", error);
    return NextResponse.json([], { status: 200 });
  }
}
