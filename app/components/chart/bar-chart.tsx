"use client";

import { BarChart as RBarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { ChartBaseProps } from "./interface";

const BarChart = (props: ChartBaseProps) => {
  const { data, dataKey, nameKey } = props;

  return (
    <RBarChart
      accessibilityLayer
      className="aspect-[1.618] size-full"
      responsive
      data={data}
    >
      <XAxis dataKey={nameKey || "name"} stroke="var(--color-foreground)" />
      <YAxis width="auto" direction="ltr" stroke="var(--color-foreground)" />
      <Tooltip />
      <Bar
        dataKey={dataKey || "value"}
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
