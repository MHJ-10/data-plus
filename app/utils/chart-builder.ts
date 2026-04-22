import { ChartCandidate } from "./chart-candidate";
import * as aq from "arquero";

export function buildChartData(data: any, chart: ChartCandidate) {
  const table = aq.fromJSON(data);

  console.log(table);

  // if (chart.type === "bar" || chart.type === "treemap") {
  //   return table
  //     .groupby(chart.x)
  //     .rollup({
  //       value: aq.op.mean(chart.y),
  //     })
  //     .objects();
  // }

  // // 🟣 PIE
  // if (chart.type === "pie") {
  //   return table
  //     .groupby(chart.x)
  //     .rollup({
  //       value: aq.op.count(),
  //     })
  //     .objects();
  // }

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

  return [];
}
