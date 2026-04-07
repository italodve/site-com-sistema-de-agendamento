import { execSync } from "child_process";
import path from "path";

let dbReady = false;

export async function ensureDatabaseReady(): Promise<void> {
  if (dbReady) return;

  try {
    // Try a simple query to check if tables exist
    const { prisma } = await import("./prisma");
    await prisma.service.count();
    dbReady = true;
  } catch {
    // Tables likely don't exist - run prisma db push
    console.log("[db-setup] Tables not found, running prisma db push...");
    try {
      const prismaPath = path.join(
        process.cwd(),
        "node_modules",
        ".bin",
        "prisma"
      );
      execSync(`${prismaPath} db push --skip-generate --accept-data-loss`, {
        stdio: "inherit",
        timeout: 30000,
        env: process.env,
      });
      console.log("[db-setup] prisma db push succeeded");
      dbReady = true;
    } catch (pushError) {
      console.error("[db-setup] prisma db push failed:", pushError);
      throw pushError;
    }
  }
}
