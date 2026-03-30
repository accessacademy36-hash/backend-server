import { PrismaClient } from "@prisma/client";

// ─── Prisma Singleton ─────────────────────────────────────────────────────────
// In development, Next.js / ts-node hot-reloads can create multiple Prisma
// instances. We store one instance on the global object to reuse it.

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;