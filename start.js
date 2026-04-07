const { execSync, spawn } = require("child_process");

// Log startup info
console.log(`[start] Node.js ${process.version}`);
console.log(`[start] cwd: ${process.cwd()}`);
console.log(`[start] __dirname: ${__dirname}`);

// Mask DATABASE_URL for logging
const dbUrl = process.env.DATABASE_URL || "";
if (dbUrl) {
  try {
    const url = new URL(dbUrl);
    console.log(`[start] DATABASE_URL host: ${url.hostname}:${url.port}`);
  } catch {
    console.log(`[start] DATABASE_URL set but unparseable (length: ${dbUrl.length})`);
  }
} else {
  console.error("[start] WARNING: DATABASE_URL is NOT set!");
}

function run(cmd) {
  console.log(`[start] Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: "inherit", timeout: 60000, shell: true });
    console.log(`[start] OK: ${cmd}`);
    return true;
  } catch (e) {
    console.error(`[start] FAILED: ${cmd} — ${e.message}`);
    return false;
  }
}

// Setup database
const dbPushOk = run("npx prisma db push --skip-generate --accept-data-loss");
if (!dbPushOk) {
  console.log("[start] db push failed — raw SQL fallback will create tables on first request");
}

if (dbPushOk) {
  if (!run("npx tsx prisma/seed.ts")) {
    console.log("[start] seed failed — auto-seed via API will handle it");
  }
} else {
  console.log("[start] skipping seed — auto-seed via API will handle it");
}

// Start Next.js
const port = process.env.PORT || "3000";
console.log(`[start] Starting Next.js on port ${port}...`);

const server = spawn("npx", ["next", "start", "-p", port, "-H", "0.0.0.0"], {
  stdio: "inherit",
  env: process.env,
  shell: true,
});

server.on("error", (err) => {
  console.error("[start] Failed to spawn Next.js:", err);
  process.exit(1);
});

server.on("close", (code) => {
  console.log(`[start] Next.js exited with code ${code}`);
  process.exit(code || 0);
});
