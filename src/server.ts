import express from "express";
import { connectDatabase, disconnectDatabase } from "./lib/database";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

// ─── Health Route ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ─── TODO: Register your routers here ────────────────────────────────────────
// app.use("/api/users", userRouter);
// app.use("/api/subscriptions", subscriptionRouter);
// ...

// ─── Start ────────────────────────────────────────────────────────────────────
async function main() {
  await connectDatabase();

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });

  // ─── Graceful Shutdown ──────────────────────────────────────────────────────
  const shutdown = async (signal: string) => {
    console.log(`\n⚠️  ${signal} received — shutting down gracefully...`);
    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

main().catch((error) => {
  console.error("Fatal error during startup:", error);
  process.exit(1);
});