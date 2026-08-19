import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Prisma Client singleton with pg driver adapter (required by Prisma 7).
 *
 * Prisma 7 removed direct TCP connections from the core client; a driver
 * adapter must be passed explicitly. @prisma/adapter-pg uses the pg library
 * which reads DATABASE_URL at construction time.
 *
 * Next.js hot-reload in development creates many module instances, which
 * exhausts the connection pool. The global singleton pattern prevents this.
 *
 * @see https://pris.ly/d/driver-adapters
 * @see https://pris.ly/d/prisma7-client-config
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    // In build/CI contexts without a real DB, allow creation but it will fail
    // at query time with a clear error rather than at module import time.
    console.warn(
      "[db] DATABASE_URL is not set. Database queries will fail at runtime."
    );
  }

  const adapter = new PrismaPg({ connectionString: connectionString ?? "" });

  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
