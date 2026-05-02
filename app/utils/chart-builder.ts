import * as aq from "arquero";
import { ChartCandidate } from "./chart-candidate";

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
        data: chartData,
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
      const chartData = table
        .orderby(chart.x)
        .objects()
        .map((d) => ({
          x: d[chart.x],
          y: d[chart.y],
        }));

      return {
        typs: ["line", "area"],
        data: chartData,
        title: `نمودار ${chart.x} - ${chart.y}`,
      };
    }
  }

  return null;
}
