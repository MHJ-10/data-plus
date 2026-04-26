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
  const { data, dataKey, nameKey } = props;

  return (
    <RScatterChart className="aspect-[1.618] size-full" responsive>
      <XAxis
        type="number"
        dataKey={dataKey || "x"}
        stroke="var(--color-foreground)"
      />
      <YAxis
        type="number"
        dataKey={nameKey || "y"}
        width="auto"
        direction="ltr"
        stroke="var(--color-foreground)"
      />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter
        className="fill-link"
        activeShape={{ fill: "var(--color-accent)" }}
        data={data}
      />
    </RScatterChart>
  );
};

export default ScatterChart;
