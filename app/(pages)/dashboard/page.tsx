import { Dashboard } from "@/components";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

const DashboardPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const recentAnalysis = await prisma.analysis.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
    where: { userId },
    include: { charts: { select: { id: true } } },
  });
  const totalAnalysis = await prisma.analysis.count({ where: { userId } });

  const recentCharts = await prisma.chart.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
    where: { analysis: { userId } },
  });
  const totalCharts = await prisma.chart.count({
    where: { analysis: { userId } },
  });

  const recentInsights = await prisma.insight.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    where: { analysis: { userId } },
  });
  const totalInsights = await prisma.insight.count({
    where: { analysis: { userId } },
  });

  const totalColumnMetadata = await prisma.columnMetadata.count({
    where: { analysis: { userId } },
  });

  return (
    <Dashboard
      stats={{
        analyses: totalAnalysis,
        charts: totalCharts,
        insights: totalInsights,
        columneMetadata: totalColumnMetadata,
      }}
      recentData={{
        analyses: recentAnalysis,
        charts: recentCharts,
        insights: recentInsights,
      }}
    />
  );
};

export default DashboardPage;
