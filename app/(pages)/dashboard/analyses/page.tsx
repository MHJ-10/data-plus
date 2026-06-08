import { Analyses } from "@/components";
import { auth } from "@/lib/auth";
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

  const session = await auth();

  const userId = session?.user?.id;

  const pageNum = Number(params?.page ?? 1);
  const search = params?.search ?? "";
  const order = params?.order === "asc" ? "asc" : "desc";

  const analyses = await prisma.analysis.findMany({
    include: {
      charts: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: order,
    },
    take: 10,
    skip: (pageNum - 1) * 10,
    where: {
      userId,
      ...(search && {
        datasetName: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
  });

  const totalAnalyses = await prisma.analysis.count({
    where: {
      userId,
      ...(search && {
        datasetName: {
          contains: search,
          mode: "insensitive",
        },
      }),
    },
  });

  return <Analyses analyses={analyses} total={totalAnalyses} />;
};

export default AnalysesPage;
