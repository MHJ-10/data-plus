"use client";

import {
  ScatterChart as RScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ChartBaseProps } from "./interface";

const ScatterChart = (props: ChartBaseProps) => {
  const { data, dataKey = "x", nameKey = "y" } = props;

  return (
    <RScatterChart className="h-75 w-full" responsive>
      <XAxis type="number" dataKey={dataKey} stroke="var(--color-foreground)" />
      <YAxis
        type="number"
        dataKey={nameKey}
        width="auto"
        direction="ltr"
        stroke="var(--color-foreground)"
      />
      <Tooltip
        wrapperClassName="!bg-segment rounded-md !border-border !p-1"
        cursor={{ strokeDasharray: "3 3" }}
      />
      <Scatter
        className="fill-link"
        activeShape={{ fill: "var(--color-accent)" }}
        data={data}
        fill="var(--color-foreground)"
      />
    </RScatterChart>
  );
};

export default ScatterChart;
