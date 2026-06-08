"use client";

import { EmptyState } from "@/components";
import { InsufficientDataIllustrationIcon } from "@/components/icons";
import ChartCard from "@/components/ui/chart-card";
import { Prisma } from "@/generated/prisma/client";
import { ChartType } from "@/utils/chart-candidate";
import { AnalysisInfo } from "./analysis-info";
import { ColumnsMetadataTable } from "./columns-metadata-table";
import { InsightsCard } from "./insights-card";
import { PreviewTable } from "./preview-table";

type AnalysisWithRelations = Prisma.AnalysisGetPayload<{
  include: {
    charts: true;
    columnMetadata: true;
    insights: true;
  };
}>;

interface AnalysisDetailProps {
  analysis: AnalysisWithRelations;
}

const AnalysisDetail = ({ analysis }: AnalysisDetailProps) => {
  return (
    <div className="space-y-8">
      <AnalysisInfo analysis={analysis} />

      {!analysis.charts.length && !analysis.insights.length ? (
        <EmptyState
          title="داده کافی برای تولید نتایج وجود ندارد"
          description="دیتاست آپلودشده اطلاعات کافی برای تولید نمودارها یا بینش‌های هوش مصنوعی را ندارد. لطفاً دیتاستی با تعداد سطرها و ستون‌های بیشتر بارگذاری کنید."
          illustration={<InsufficientDataIllustrationIcon />}
        />
      ) : (
        <>
          <InsightsCard />

          <h3 className="mb-4 text-2xl font-bold">نمودارهای ایجادشده</h3>
          <div className="grid gap-5 lg:grid-cols-2">
            {analysis.charts.map((chart) => (
              <ChartCard
                key={chart.title}
                title={chart.title}
                types={chart.availableTypes as ChartType[]}
                data={chart.chartData as Record<string, string | number>[]}
                nameKey={chart.xField || "name"}
                dataKey={chart.yField || "value"}
              />
            ))}
          </div>
        </>
      )}

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
