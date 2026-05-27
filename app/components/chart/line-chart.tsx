"use client";

import { Line, LineChart as RLineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartBaseProps } from "./interface";
import { CHART_COLORS } from "@/constants";

const LineChart = (props: ChartBaseProps) => {
  const { data, dataKey = "value", nameKey = "name" } = props;

  return (
    <RLineChart className="aspect-[1.618] size-full" responsive data={data}>
      <XAxis dataKey={nameKey} stroke="var(--color-foreground)" />
      <YAxis
        width="auto"
        direction="ltr"
        dataKey={dataKey}
        stroke="var(--color-foreground)"
      />
      <Line
        type="monotone"
        dataKey={dataKey}
        stroke={CHART_COLORS[4]}
        strokeWidth={2}
        dot={{ fill: CHART_COLORS[5] }}
        activeDot={{ stroke: CHART_COLORS[5] }}
      />
      <Tooltip wrapperClassName="!bg-segment rounded-md !border-border !p-1" />
    </RLineChart>
  );
};

export default LineChart;
