import prisma from "@/lib/prisma";

const AnalyzeDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const analysisId = (await params).id;

  const analysis = await prisma.analysis.findUnique({
    where: {
      id: analysisId,
    },
  });

  return <h2 className="text-3xl font-bold">{JSON.stringify(analysis)}</h2>;
};

export default AnalyzeDetail;
