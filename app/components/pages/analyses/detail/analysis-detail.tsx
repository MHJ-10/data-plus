"use client";

import { Prisma } from "@/generated/prisma/client";
import { AnalysisInfo } from "./analysis-info";
import { ColumnsMetadataTable } from "./columns-metadata-table";
import { InsightsCard } from "./insights-card";
import { PreviewTable } from "./preview-table";
import { VirtualizedCharts } from "./virtualized-charts";

type AnalysisWithRelations = Prisma.AnalysisGetPayload<{
  include: {
    columnMetadata: true;
    insights: true;
  };
}>;

const AnalysisDetail = ({ analysis }: { analysis: AnalysisWithRelations }) => {
  return (
    <div className="space-y-8">
      <AnalysisInfo analysis={analysis} />

      {/* {!data?.pages[0].data.length && !analysis.insights?.length ? (
        <EmptyState
          title="داده کافی برای تولید نتایج وجود ندارد"
          description="دیتاست آپلودشده اطلاعات کافی برای تولید نمودارها یا بینش‌های هوش مصنوعی را ندارد. لطفاً دیتاستی با تعداد سطرها و ستون‌های بیشتر بارگذاری کنید."
          illustration={<InsufficientDataIllustrationIcon />}
        />
      ) : ( */}
      <>
        <InsightsCard />
        <VirtualizedCharts analysisId={analysis.id} />
      </>
      {/* )} */}

      <PreviewTable
        data={
          (analysis.datasetPreview as Record<string, string | number>[]) || []
        }
      />

      <ColumnsMetadataTable data={analysis.columnMetadata} />
    </div>
  );
};

export default AnalysisDetail;
