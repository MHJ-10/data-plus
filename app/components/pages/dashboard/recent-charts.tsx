"use client";

import { ChartCard } from "@/components/ui";
import { Chart } from "@/generated/prisma/client";
import { ChartType } from "@/utils/chart-candidate";
import { Card } from "@heroui/react";

export const RecentCharts = ({ charts }: { charts?: Chart[] }) => {
  return (
    <Card className="space-y-2 border">
      <p className="text-foreground text-2xl font-semibold">چارت‌های اخیر</p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {charts?.map((chart) => (
          <ChartCard
            key={chart.id}
            title={chart.title}
            data={chart.chartData as Record<string, string | number>[]}
            types={chart.availableTypes as ChartType[]}
          />
        ))}
      </div>
    </Card>
  );
};
