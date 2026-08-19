import { defineConfig } from "prisma/config";

/**
 * Prisma 7 configuration file.
 *
 * The datasource URL is read from the DATABASE_URL environment variable.
 * See .env.example for the required format.
 *
 * The pg driver adapter is configured in src/lib/db.ts for runtime use.
 * Prisma CLI (migrate, studio) uses the url here directly.
 *
 * @see https://pris.ly/d/config-datasource
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL ?? "",
  },
});
