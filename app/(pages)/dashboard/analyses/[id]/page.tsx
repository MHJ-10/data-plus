import prisma from "@/lib/prisma";

const AnalysisDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const analysisId = (await params).id;

  const analysis = await prisma.analysis.findUnique({
    where: {
      id: analysisId,
    },
    include: {
      charts: true,
      columnMetadata: true,
      insights: true,
    },
  });

  return <h2 className="text-3xl font-bold">{JSON.stringify(analysis)}</h2>;
};

export default AnalysisDetailPage;
