"use client";

import { BarChart as RBarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { ChartBaseProps } from "./interface";

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
        fill="var(--color-link)"
        activeBar={{
          fill: "var(--color-accent)",
          stroke: "var(--color-accent)",
        }}
        radius={[10, 10, 0, 0]}
      />
    </RBarChart>
  );
};

export default BarChart;
