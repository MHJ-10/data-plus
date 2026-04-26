import * as aq from "arquero";
import { ChartCandidate } from "./chart-candidate";

export function buildChartData(data: any, chart: ChartCandidate) {
  const table = aq.from(data);
  const charts = [];

  // if (chart.type === "bar" || chart.type === "treemap") {
  //   return table
  //     .groupby(chart.x)
  //     .rollup({
  //       value: aq.op.mean(chart.y),
  //     })
  //     .objects();
  // }

  // // 🟣 PIE
  if (chart.type === "pie" && chart.x) {
    const chartData = table
      .groupby(chart.x)
      .rollup({
        value: aq.op.count(),
      })
      .objects();
    charts.push(chartData);
  }

  // // 🔵 LINE / AREA
  // if (chart.type === "line" || chart.type === "area") {
  //   return table
  //     .orderby(chart.x)
  //     .objects()
  //     .map((d) => ({
  //       x: d[chart.x],
  //       y: d[chart.y],
  //     }));
  // }

  return charts;
}
