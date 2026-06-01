import { Prisma, PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomBool() {
  return Math.random() > 0.5;
}

function randomDate() {
  const now = Date.now();
  const past = now - 1000 * 60 * 60 * 24 * 30; // last 30 days
  return new Date(past + Math.random() * (now - past));
}

const datasets = [
  "people-1000",
  "products-500",
  "sales-2024",
  "employees",
  "orders",
];

const analyses: Prisma.AnalysisCreateInput[] = [];

for (let i = 0; i < 47; i++) {
  const datasetName = datasets[i % datasets.length];

  analyses.push({
    user: {
      connect: { id: "cmpv7z85t0000uzb2iss8y9if" },
    },
    datasetName,
    analysisTimeMs: randomInt(5, 5000),
    columnsCount: randomInt(5, 20),
    rowsCount: randomInt(100, 5000),
    createdAt: randomDate(),
    updatedAt: randomDate(),
    status: Math.random() > 0.2 ? "COMPLETED" : "FAILED",
    isFavorite: randomBool(),
    originalFileName: `${datasetName}.csv`,
    originalFileSize: randomInt(10000, 5000000),
    datasetPreview: [
      {
        id: 1,
        sample: "data",
      },
    ],
  });
}

export async function main() {
  for (const u of analyses) {
    await prisma.analysis.create({ data: u });
  }
}

main();
