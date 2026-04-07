import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const barbers = await prisma.barber.findMany({
      where: { active: true },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(barbers);
  } catch (error) {
    console.error("Error fetching barbers:", error);
    return NextResponse.json([], { status: 200 });
  }
}
