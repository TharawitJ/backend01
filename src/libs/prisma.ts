import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";
const adapter = new PrismaMariaDb({
  host:(process.env.DATABASE_HOST, "DATABASE_HOST"),
  user:(process.env.DATABASE_USER, "DATABASE_USER"),
  password:(process.env.DATABASE_PASSWORD, "DATABASE_PASSWORD"),
  database:(process.env.DATABASE_NAME, "DATABASE_NAME"),
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

// prisma.$queryRawUnsafe('show tables').then(console.log)

export { prisma };