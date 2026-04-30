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

  const truncateText = (text: string, maxWidth: number) => {
    const avgCharWidth = 6;
    const maxChars = Math.floor(maxWidth / avgCharWidth);

    if (text.length <= maxChars) return text;

    return text.slice(0, maxChars - 1) + "…";
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
        style={{ fill: getColor(value, min, max) }}
      />
      {width > 50 && height > 25 && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor="middle"
          className="fill-background text-sm"
        >
          {truncateText(name, width)}
        </text>
      )}
    </g>
  );
};

const TreemapChart = (props: ChartBaseProps) => {
  const { data, dataKey = "value", nameKey = "name" } = props;

  const sortedData = data.sort(
    (a, b) => (b[dataKey] as number) - (a[dataKey] as number),
  );

  return (
    <ResponsiveContainer className="size-full">
      <Treemap
        data={sortedData}
        nameKey={nameKey}
        dataKey={dataKey}
        fill="var(--color-foreground)"
        content={<CustomizedContent data={sortedData} dataKey={dataKey} />}
      >
        <Tooltip wrapperClassName="!bg-segment rounded-md !border-border !p-1" />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default TreemapChart;
