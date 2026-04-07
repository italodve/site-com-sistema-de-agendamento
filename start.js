const { execSync, spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

// Log startup info
console.log(`[start] Node.js ${process.version}`);
console.log(`[start] __dirname: ${__dirname}`);
console.log(`[start] cwd: ${process.cwd()}`);

// Mask DATABASE_URL for logging (show only host)
const dbUrl = process.env.DATABASE_URL || "";
if (dbUrl) {
  try {
    const url = new URL(dbUrl);
    console.log(`[start] DATABASE_URL host: ${url.hostname}:${url.port}`);
  } catch {
    console.log(`[start] DATABASE_URL is set but could not parse (length: ${dbUrl.length})`);
  }
} else {
  console.error("[start] WARNING: DATABASE_URL is NOT set!");
}

// Find a working binary path
function findBinary(name) {
  const candidates = [
    path.join(__dirname, "node_modules", ".bin", name),
    path.join(process.cwd(), "node_modules", ".bin", name),
    `/app/node_modules/.bin/${name}`,
  ];

  for (const p of candidates) {
    if (fs.existsSync(p)) {
      console.log(`[start] Found ${name} at: ${p}`);
      return p;
    }
  }

  // Fallback to npx
  console.log(`[start] ${name} binary not found at known paths, using npx`);
  return `npx ${name}`;
}

function run(cmd) {
  const timestamp = new Date().toISOString();
  console.log(`[start] [${timestamp}] Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: "inherit", timeout: 60000 });
    console.log(`[start] [${new Date().toISOString()}] Success: ${cmd}`);
    return true;
  } catch (e) {
    console.error(`[start] [${new Date().toISOString()}] FAILED: ${cmd}`);
    console.error(`[start] Error: ${e.message}`);
    return false;
  }
}

// Setup database tables
const prismaPath = findBinary("prisma");
const dbPushOk = run(`${prismaPath} db push --skip-generate --accept-data-loss`);

if (!dbPushOk) {
  console.log("[start] prisma db push failed — tables will be created by API routes on first request (raw SQL fallback)");
}

// Seed initial data
if (dbPushOk) {
  const tsxPath = findBinary("tsx");
  const seedOk = run(`${tsxPath} prisma/seed.ts`);
  if (!seedOk) {
    console.log("[start] Seed failed — data will be auto-seeded by API routes on first request");
  }
} else {
  console.log("[start] Skipping seed (no tables) — will auto-seed via API routes");
}

// Start Next.js
const port = process.env.PORT || "3000";
console.log(`[start] Starting Next.js on port ${port}...`);

const nextPath = findBinary("next");
const server = spawn(
  nextPath,
  ["start", "-p", port, "-H", "0.0.0.0"],
  { stdio: "inherit", env: process.env }
);

server.on("close", (code) => {
  console.log(`[start] Next.js exited with code ${code}`);
  process.exit(code || 0);
});
