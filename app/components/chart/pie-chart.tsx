"use client";

import { Pie, PieChart as RPieChart, Tooltip } from "recharts";
import { ChartBaseProps } from "./interface";

const PieChart = (props: ChartBaseProps) => {
  const { data, dataKey = "value", nameKey = "name" } = props;

  return (
    <RPieChart className="aspect-[1] size-full" responsive>
      <Pie
        data={data}
        nameKey={nameKey}
        dataKey={dataKey}
        cx="50%"
        cy="50%"
        outerRadius="100%"
        fill="var(--color-link)"
        stroke="var(--color-background)"
      />
      <Tooltip wrapperClassName="!bg-segment rounded-md !border-border !p-1" />
    </RPieChart>
  );
};

export default PieChart;
