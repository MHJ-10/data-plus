import { Analyses } from "@/components";
import prisma from "@/lib/prisma";

interface AnalysesPageParams {
  searchParams: Promise<{
    page?: string;
    search?: string;
    order?: "asc" | "desc";
  }>;
}

const AnalysesPage = async ({ searchParams }: AnalysesPageParams) => {
  const params = await searchParams;

  const pageNum = Number(params?.page ?? 1);
  const search = params?.search ?? "";
  const order = params?.order === "asc" ? "asc" : "desc";

  const analyses = await prisma.analysis.findMany({
    include: {
      charts: true,
    },
    orderBy: {
      createdAt: order,
    },
    take: 10,
    skip: (pageNum - 1) * 10,
    where: search
      ? {
          datasetName: {
            contains: search,
            mode: "insensitive",
          },
        }
      : undefined,
  });

  const totalAnalyses = await prisma.analysis.count({
    where: search
      ? {
          datasetName: {
            contains: search,
            mode: "insensitive",
          },
        }
      : undefined,
  });

  return <Analyses analyses={analyses} total={totalAnalyses} />;
};

export default AnalysesPage;
