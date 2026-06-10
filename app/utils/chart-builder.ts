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
        data: chartData.map((d: any) => {
          const xKey = chart.x as string;
          const yKey = chart.y as string;
          return {
            [xKey]: d[xKey],
            [yKey]:
              "value" in d && typeof d.value === "number"
                ? roundToTwoDecimals(d.value)
                : 0,
          };
        }),
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
        [`${chart.x}`]: d[chart.x as string],
        [`${chart.y}`]: d[chart.y as string],
      }));

      return {
        types: ["line", "area"],
        data: chartData,
        title: `نمودار ${chart.x} - ${chart.y}`,
      };
    }
  }

  return null;
}
