const { execSync } = require("child_process");
const path = require("path");

// ── Diagnostics ──
console.log(`[start] Node ${process.version}, cwd: ${process.cwd()}`);

const dbUrl = process.env.DATABASE_URL || "";
if (dbUrl) {
  try {
    const url = new URL(dbUrl);
    console.log(`[start] DATABASE_URL: ${url.hostname}:${url.port || 5432}`);
  } catch {
    console.log(`[start] DATABASE_URL set (length: ${dbUrl.length})`);
  }
} else {
  console.error("[start] WARNING: DATABASE_URL is NOT set!");
}

// ── Database setup (prisma db push) ──
try {
  const prismaDir = path.dirname(require.resolve("prisma/package.json"));
  const prismaBin = path.join(prismaDir, "build", "index.js");
  console.log("[start] Running prisma db push...");
  execSync(`node "${prismaBin}" db push --skip-generate --accept-data-loss`, {
    stdio: "inherit",
    timeout: 30000,
  });
  console.log("[start] prisma db push OK");
} catch (e) {
  console.error("[start] prisma db push FAILED:", e.message);
  console.log("[start] Tables will be created via raw SQL on first API request");
}

// ── Seed (skip — auto-seed handles it via API routes) ──
console.log("[start] Seed will run automatically on first API request");

// ── Start Next.js programmatically ──
const port = parseInt(process.env.PORT || "3000", 10);
console.log(`[start] Starting Next.js on 0.0.0.0:${port}...`);

const { startServer } = require("next/dist/server/lib/start-server");

startServer({
  dir: process.cwd(),
  isDev: false,
  hostname: "0.0.0.0",
  port: port,
}).catch((err) => {
  console.error("[start] Next.js failed to start:", err);
  process.exit(1);
});
