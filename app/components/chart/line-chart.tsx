"use client";

import { Line, LineChart as RLineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartBaseProps } from "./interface";

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
        stroke="var(--color-link)"
        strokeWidth={2}
        dot={{ fill: "var(--color-accent)" }}
        activeDot={{ stroke: "var(--color-link)" }}
      />
      <Tooltip wrapperClassName="!bg-segment rounded-md !border-border !p-1" />
    </RLineChart>
  );
};

export default LineChart;
