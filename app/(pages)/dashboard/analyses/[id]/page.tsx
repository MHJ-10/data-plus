import { AnalysisDetail } from "@/components";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

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

  if (!analysis) notFound();

  return <AnalysisDetail analysis={analysis} />;
};

export default AnalysisDetailPage;
