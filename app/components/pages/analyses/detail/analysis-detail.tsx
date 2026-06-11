"use client";

import { ChartCard } from "@/components";
import { InsufficientDataIllustrationIcon } from "@/components/icons";
import { EmptyState } from "@/components/ui";
import { Chart, Prisma } from "@/generated/prisma/client";
import { useIntersectionObserver } from "@/hooks";
import { ChartType } from "@/utils/chart-candidate";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { AnalysisInfo } from "./analysis-info";
import { ColumnsMetadataTable } from "./columns-metadata-table";
import { InsightsCard } from "./insights-card";
import { PreviewTable } from "./preview-table";
import { Loading } from "./loading";

type AnalysisWithRelations = Prisma.AnalysisGetPayload<{
  include: {
    columnMetadata: true;
    insights: true;
  };
}>;

const AnalysisDetail = ({ analysis }: { analysis: AnalysisWithRelations }) => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["analysisDetails", analysis.id],
      queryFn: async ({
        pageParam,
      }): Promise<{
        data: Chart[];
        previousId: number;
        nextId: number;
      }> => {
        const res = await axios.get(`/api/analyses/charts/${analysis.id}`, {
          params: { page: pageParam },
        });
        return res.data;
      },
      initialPageParam: 1,
      getPreviousPageParam: (firstPage) => firstPage.previousId,
      getNextPageParam: (lastPage) => lastPage.nextId,
    });

  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-8">
      <AnalysisInfo analysis={analysis} />

      {!data?.pages[0].data.length && !analysis.insights?.length ? (
        <EmptyState
          title="داده کافی برای تولید نتایج وجود ندارد"
          description="دیتاست آپلودشده اطلاعات کافی برای تولید نمودارها یا بینش‌های هوش مصنوعی را ندارد. لطفاً دیتاستی با تعداد سطرها و ستون‌های بیشتر بارگذاری کنید."
          illustration={<InsufficientDataIllustrationIcon />}
        />
      ) : (
        <>
          <InsightsCard />

          <h3 className="mb-4 text-2xl font-bold">نمودارهای ایجادشده</h3>
          {data?.pages?.map((page, pageIndex) => (
            <div key={pageIndex} className="grid gap-5 lg:grid-cols-2">
              {page.data?.map((chart, chartIndex) => {
                const isLastPage = pageIndex === data.pages.length - 1;
                const isLastItem = chartIndex === page.data.length - 1;
                const isSecondLastItem = chartIndex === page.data.length - 2;

                const shouldAttachRef =
                  isLastPage && (isLastItem || isSecondLastItem);
                return (
                  <ChartCard
                    key={chart.id}
                    ref={shouldAttachRef ? ref : null}
                    title={chart.title}
                    types={chart.availableTypes as ChartType[]}
                    data={chart.chartData as Record<string, string | number>[]}
                    nameKey={chart.xField || "name"}
                    dataKey={chart.yField || "value"}
                  />
                );
              })}
            </div>
          ))}
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
