import { AnalysisDetail } from "@/components";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

const AnalysisDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const analysisId = (await params).id;

  const session = await auth();

  const userId = session?.user?.id;

  const analysis = await prisma.analysis.findUnique({
    where: {
      id: analysisId,
      userId,
    },
    include: {
      columnMetadata: true,
      insights: true,
    },
  });

  if (!analysis) notFound();

  return <AnalysisDetail analysis={analysis} />;
};

export default AnalysisDetailPage;
