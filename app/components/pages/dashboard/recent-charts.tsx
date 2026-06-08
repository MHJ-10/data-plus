"use client";

import { EmptyState } from "@/components";
import { EmptyChartsIllustrationIcon } from "@/components/icons";
import { ChartCard } from "@/components/ui";
import { Chart } from "@/generated/prisma/client";
import { ChartType } from "@/utils/chart-candidate";
import { Card } from "@heroui/react";

export const RecentCharts = ({ charts }: { charts?: Chart[] }) => {
  return (
    <Card className="space-y-2 border">
      <p className="text-foreground text-2xl font-semibold">چارت‌های اخیر</p>

      {charts?.length ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {charts.map((chart) => (
            <ChartCard
              key={chart.id}
              title={chart.title}
              data={chart.chartData as Record<string, string | number>[]}
              types={chart.availableTypes as ChartType[]}
              nameKey={chart.xField || "name"}
              dataKey={chart.yField || "value"}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="هنوز هیچ نموداری تولید نشده است"
          description="یک دیتاست آپلود کنید و تحلیل را آغاز کنید تا نمودارها به‌صورت خودکار تولید شوند."
          illustration={<EmptyChartsIllustrationIcon />}
          primaryAction={{ label: "آپلود دیتاست", href: "/dashboard/upload" }}
        />
      )}
    </Card>
  );
};
