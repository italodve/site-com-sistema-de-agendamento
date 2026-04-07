const { execSync, spawn } = require("child_process");

function run(cmd) {
  console.log(`[start] Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: "inherit" });
    console.log(`[start] Done: ${cmd}`);
  } catch (e) {
    console.error(`[start] Warning - command failed: ${cmd}`);
  }
}

// Setup database
run("npx prisma db push --skip-generate");
run("npx tsx prisma/seed.ts");

// Start Next.js
const port = process.env.PORT || "3000";
console.log(`[start] Starting Next.js on port ${port}...`);

const server = spawn("npx", ["next", "start", "-p", port, "-H", "0.0.0.0"], {
  stdio: "inherit",
  env: process.env,
});

server.on("close", (code) => {
  process.exit(code);
});
