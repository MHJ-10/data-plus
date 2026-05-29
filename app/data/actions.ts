"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(id: string) {
  const analysis = await prisma.analysis.findUnique({
    where: { id },
  });

  if (!analysis) {
    throw new Error("Analysis not found");
  }

  await prisma.analysis.update({
    where: { id },
    data: {
      isFavorite: !analysis.isFavorite,
    },
  });

  revalidatePath("/dashboard/analyses");
  revalidatePath(`/dashboard/analyses/${id}`);
}

export async function deleteAnalysis(id: string) {
  const analysis = await prisma.analysis.findUnique({
    where: {
      id,
    },
  });

  if (!analysis) {
    throw new Error("تحلیل یافت نشد.");
  }

  await prisma.analysis.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/analyses");
  revalidatePath(`/dashboard/analyses/${id}`);
}
