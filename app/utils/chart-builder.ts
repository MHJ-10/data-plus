import * as aq from "arquero";
import { ChartCandidate } from "./chart-candidate";

export function buildChartData(data: any, chart: ChartCandidate) {
  const table = aq.from(data);

  if (chart.x) {
    if (chart.type === "bar" || chart.type === "treemap") {
      const chartData = table
        .groupby(chart.x)
        .rollup({
          value: aq.op.mean(chart.y),
        })
        .objects();

      return {
        types: ["bar", "treemap"],
        data: chartData,
      };
    }

    if (chart.type === "pie") {
      const chartData = table
        .groupby(chart.x)
        .rollup({
          value: aq.op.count(),
        })
        .objects();

      return {
        types: ["pie"],
        data: chartData,
      };
    }

    if (chart.type === "line" || chart.type === "area") {
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
      };
    }
  }

  return null;
}
