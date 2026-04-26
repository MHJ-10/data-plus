"use client";

import { Pie, PieChart as RPieChart, Tooltip } from "recharts";
import { ChartBaseProps } from "./interface";

const PieChart = (props: ChartBaseProps) => {
  const { data, dataKey, nameKey } = props;

  return (
    <RPieChart className="aspect-[1] size-full" responsive>
      <Pie
        data={data}
        nameKey={nameKey || "name"}
        dataKey={dataKey || "value"}
        cx="50%"
        cy="50%"
        outerRadius="100%"
        fill="var(--color-link)"
        isAnimationActive={true}
      />
      <Tooltip />
    </RPieChart>
  );
};

export default PieChart;
