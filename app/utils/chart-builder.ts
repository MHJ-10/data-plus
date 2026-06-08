import * as aq from "arquero";
import { ChartCandidate } from "./chart-candidate";
import { roundToTwoDecimals } from "./formatter";

export function buildChartData(data: any, chart: ChartCandidate) {
  const table = aq.from(data);

  if (chart.x) {
    if (chart.category === "rectangular") {
      const chartData = table
        .groupby(chart.x)
        .rollup({
          value: aq.op.mean(chart.y),
        })
        .objects();

      return {
        types: ["bar", "treemap"],
        data: chartData.map((d) => ({
          ...d,
          [`${chart.y}`]:
            "value" in d && typeof d.value === "number"
              ? roundToTwoDecimals(d.value)
              : 0,
        })),
        title: `نمودار ${chart.x} - ${chart.y}`,
      };
    }

    if (chart.category === "circular") {
      const chartData = table
        .groupby(chart.x)
        .rollup({
          value: aq.op.count(),
        })
        .objects();

      return {
        types: ["pie"],
        data: chartData,
        title: `نمودار ${chart.x}`,
      };
    }

    if (chart.category === "trend") {
      const chartData = (
        table.orderby(chart.x).objects() as Array<Record<string, any>>
      ).map((d) => ({
        x: d[chart.x as string],
        y: d[chart.y as string],
      }));

      return {
        typs: ["line", "area"],
        data: chartData.map((d) => ({
          ...d,
          [`${chart.y}`]:
            "y" in d && typeof d.y === "number" ? roundToTwoDecimals(d.y) : 0,
        })),
        title: `نمودار ${chart.x} - ${chart.y}`,
      };
    }
  }

  return null;
}
