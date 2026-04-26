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
      <XAxis type="number" dataKey={dataKey || "x"} />
      <YAxis type="number" dataKey={nameKey || "y"} width="auto" />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter
        activeShape={{ fill: "var(--color-accent)" }}
        data={data}
        fill="var(--color-link)"
      />
    </RScatterChart>
  );
};

export default ScatterChart;
