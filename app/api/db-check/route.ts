import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const timestamp = new Date().toISOString();

  try {
    const [userCount, servicesCount, resultsCount, profile] = await Promise.all([
      prisma.user.count(),
      prisma.service.count(),
      prisma.result.count(),
      prisma.profile.findFirst(),
    ]);

    const notesRaw: any[] = await prisma.$queryRawUnsafe("SELECT * FROM notes;").catch(() => []);
    const notes = notesRaw.map((n) => ({
      ...n,
      id: typeof n.id === "bigint" ? Number(n.id) : n.id,
    }));

    return NextResponse.json({
      status: "CONNECTED",
      database: "Supabase PostgreSQL",
      project: "uovmrahapvbgaajojafc",
      region: "ap-southeast-2",
      timestamp,
      stats: {
        totalUsers: userCount,
        totalServices: servicesCount,
        totalResults: resultsCount,
        adminProfile: profile ? { name: profile.name, email: profile.email } : null,
        notesData: notes,
      },
      message: "Database is 100% attached, active, and querying live data from Supabase!",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "ERROR",
        message: "Failed to connect to database.",
        error: error?.message || String(error),
        timestamp,
      },
      { status: 500 }
    );
  }
}
