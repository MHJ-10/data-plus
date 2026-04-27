"use client";
import { Area, AreaChart as RAreaChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartBaseProps } from "./interface";

const AreaChart = (props: ChartBaseProps) => {
  const { data, dataKey, nameKey } = props;

  return (
    <RAreaChart className="aspect-[1.618] size-full" responsive data={data}>
      <defs>
        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="var(--color-link)" stopOpacity={0.8} />
          <stop offset="95%" stopColor="var(--color-link)" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey={nameKey || "name"} stroke="var(--color-foreground)" />
      <YAxis width="auto" direction="ltr" stroke="var(--color-foreground)" />
      <Tooltip wrapperClassName="!bg-segment rounded-md !border-border !p-1" />
      <Area
        type="monotone"
        dataKey={dataKey || "value"}
        stroke="var(--color-accent)"
        fillOpacity={1}
        fill="url(#colorValue)"
      />
    </RAreaChart>
  );
};

export default AreaChart;
