const { execSync, spawn } = require("child_process");
const path = require("path");

const prismaPath = path.join(__dirname, "node_modules", ".bin", "prisma");
const tsxPath = path.join(__dirname, "node_modules", ".bin", "tsx");

function run(cmd) {
  console.log(`[start] Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: "inherit", timeout: 60000 });
    console.log(`[start] Success: ${cmd}`);
  } catch (e) {
    console.error(`[start] FAILED: ${cmd}`);
    console.error(`[start] Error: ${e.message}`);
    // Continue - don't crash the deploy
  }
}

// Setup database tables
run(`${prismaPath} db push --skip-generate --accept-data-loss`);

// Seed initial data
run(`${tsxPath} prisma/seed.ts`);

// Start Next.js
const port = process.env.PORT || "3000";
console.log(`[start] Starting Next.js on port ${port}...`);

const server = spawn(
  path.join(__dirname, "node_modules", ".bin", "next"),
  ["start", "-p", port, "-H", "0.0.0.0"],
  { stdio: "inherit", env: process.env }
);

server.on("close", (code) => {
  console.log(`[start] Next.js exited with code ${code}`);
  process.exit(code || 0);
});
