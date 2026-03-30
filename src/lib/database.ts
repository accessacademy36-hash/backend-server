import { prisma } from "./prisma";

// ─── Connect ──────────────────────────────────────────────────────────────────
export async function connectDatabase(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

// ─── Disconnect ───────────────────────────────────────────────────────────────
export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect();
    console.log("🔌 Database disconnected");
  } catch (error) {
    console.error("❌ Error while disconnecting:", error);
    process.exit(1);
  }
}

// ─── Health Check ─────────────────────────────────────────────────────────────
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}