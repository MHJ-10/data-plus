"use client";

import { ChartCard } from "@/components/ui";
import { Chart } from "@/generated/prisma/client";
import { useIntersectionObserver } from "@/hooks";
import { ChartType } from "@/utils/chart-candidate";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export const VirtualizedCharts = ({ analysisId }: { analysisId: string }) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["analysisDetails", analysisId],
      queryFn: async ({
        pageParam,
      }): Promise<{
        data: Chart[];
        previousId: number;
        nextId: number;
      }> => {
        const res = await axios.get(`/api/analyses/charts/${analysisId}`, {
          params: { page: pageParam },
        });
        return res.data;
      },
      initialPageParam: 1,
      getPreviousPageParam: (firstPage) => firstPage.previousId,
      getNextPageParam: (lastPage) => lastPage.nextId,
    });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
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
    </div>
  );
};
