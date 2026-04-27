"use client";

import { ResponsiveContainer, Tooltip, Treemap } from "recharts";
import { ChartBaseProps } from "./interface";

const CustomizedContent = (props: any) => {
  const { x, y, width, height, value, name, data, dataKey } = props;

  const getColor = (value: number, min: number, max: number) => {
    const ratio = max === min ? 1 : (value - min) / (max - min);

    const intensity = Math.round(30 + ratio * 70);

    return `color-mix(in srgb, var(--color-link) ${intensity}%, white)`;
  };

  const values = data.map((d: any) => d[dataKey]);

  const min = Math.min(...values);
  const max = Math.max(...values);

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: getColor(value, min, max),
        }}
      />
      {width > 50 && height > 25 && (
        <text
          x={x + 50}
          y={y + 20}
          className="fill-background text-center text-lg font-medium"
        >
          {name}
        </text>
      )}
    </g>
  );
};

const TreemapChart = (props: ChartBaseProps) => {
  const { data, dataKey, nameKey } = props;

  const valueKey = dataKey || "value";

  const sortedData = data.sort(
    (a, b) => (b[valueKey] as number) - (a[valueKey] as number),
  );

  return (
    <ResponsiveContainer className="size-full">
      <Treemap
        data={sortedData}
        nameKey={nameKey || "name"}
        dataKey={valueKey}
        fill="var(--color-foreground)"
        content={<CustomizedContent data={sortedData} dataKey={valueKey} />}
      >
        <Tooltip wrapperClassName="!bg-segment rounded-md !border-border !p-1" />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default TreemapChart;
