"use client";

import { ResponsiveContainer, Tooltip, Treemap } from "recharts";
import { ChartBaseProps } from "./interface";
import { CHART_COLORS } from "@/constants";
import { Card } from "@heroui/react";

const CustomizedContent = (props: any) => {
  const { x, y, width, height, value, name, data, dataKey } = props;

  const getColor = (value: number, min: number, max: number) => {
    const ratio = max === min ? 1 : (value - min) / (max - min);

    const intensity = Math.round(30 + ratio * 70);

    return `color-mix(in srgb, ${CHART_COLORS[0]} ${intensity}%, white)`;
  };

  const truncateText = (text: number | string, maxWidth: number) => {
    if (!text) return "";

    const avgCharWidth = 6;
    const maxChars = Math.floor(maxWidth / avgCharWidth);

    if (text.toString().length <= maxChars) return text;

    return text.toString().slice(0, maxChars - 1) + "…";
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
          className="fill-black text-sm"
        >
          {truncateText(name || "unknown", width)}
        </text>
      )}
    </g>
  );
};

const CustomTreemapTooltip = ({ active, payload, nameKey, valueKey }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <Card className="bg-segment border-border rounded-md p-1">
      <p className="leading-4">{data[nameKey] || data.name}</p>
      <p className="leading-4" style={{ color: CHART_COLORS[0] }}>
        {valueKey}: {data[valueKey]}
      </p>
    </Card>
  );
};

const TreemapChart = (props: ChartBaseProps) => {
  const { data, dataKey = "value", nameKey = "name" } = props;

  const sortedData = [...data].sort(
    (a, b) => (b[dataKey] as number) - (a[dataKey] as number),
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <Treemap
        data={sortedData}
        nameKey={nameKey}
        dataKey={dataKey}
        fill={CHART_COLORS[0]}
        content={<CustomizedContent data={sortedData} dataKey={dataKey} />}
        stroke="black"
        isAnimationActive={false}
      >
        <Tooltip
          content={
            <CustomTreemapTooltip nameKey={nameKey} valueKey={dataKey} />
          }
        />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default TreemapChart;
