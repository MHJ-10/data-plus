"use client";
import { Area, AreaChart as RAreaChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartBaseProps } from "./interface";
import { CHART_COLORS } from "@/constants";

const AreaChart = (props: ChartBaseProps) => {
  const { data, dataKey = "value", nameKey = "name" } = props;

  return (
    <RAreaChart className="h-75 w-full" responsive data={data}>
      <defs>
        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={CHART_COLORS[5]} stopOpacity={0.8} />
          <stop offset="95%" stopColor={CHART_COLORS[5]} stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey={nameKey} stroke="var(--color-foreground)" />
      <YAxis width="auto" direction="ltr" stroke="var(--color-foreground)" />
      <Tooltip wrapperClassName="!bg-segment rounded-md !border-border !p-1" />
      <Area
        type="monotone"
        dataKey={dataKey}
        stroke={CHART_COLORS[4]}
        fillOpacity={1}
        fill="url(#colorValue)"
      />
    </RAreaChart>
  );
};

export default AreaChart;
