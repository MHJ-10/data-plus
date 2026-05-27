"use client";

import { BarChart as RBarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { ChartBaseProps } from "./interface";
import { CHART_COLORS } from "@/constants";

const BarChart = (props: ChartBaseProps) => {
  const { data, dataKey = "value", nameKey = "name" } = props;

  return (
    <RBarChart
      accessibilityLayer
      className="aspect-[1.618] size-full"
      responsive
      data={data}
    >
      <XAxis dataKey={nameKey} stroke="var(--color-foreground)" />
      <YAxis width="auto" direction="ltr" stroke="var(--color-foreground)" />
      <Tooltip wrapperClassName="!bg-segment rounded-md !border-border !p-1" />
      <Bar
        dataKey={dataKey}
        fill={CHART_COLORS[0]}
        activeBar={{
          fill: CHART_COLORS[1],
          stroke: CHART_COLORS[1],
        }}
        radius={[10, 10, 0, 0]}
      />
    </RBarChart>
  );
};

export default BarChart;
