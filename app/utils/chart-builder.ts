import * as aq from "arquero";
import { ChartCandidate } from "./chart-candidate";
import { roundToTwoDecimals } from "./formatter";

export function buildChartData(data: any, chart: ChartCandidate) {
  // Validate inputs
  if (!data || !Array.isArray(data) || data.length === 0) {
    return null;
  }

  if (!chart.x) {
    return null;
  }

  const table = aq.from(data);

  if (chart.category === "rectangular") {
    if (!chart.y) return null;

    const chartData = table
      .groupby(chart.x)
      .rollup({
        value: aq.op.mean(chart.y),
      })
      .objects();

    if (!chartData || chartData.length === 0) {
      return null;
    }

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
      title: `نمودار ${chart.x} در مقابل ${chart.y}`,
    };
  }

  if (chart.category === "circular") {
    const chartData = table
      .groupby(chart.x)
      .rollup({
        value: aq.op.count(),
      })
      .objects();

    if (!chartData || chartData.length === 0) {
      return null;
    }

    return {
      types: ["pie"],
      data: chartData,
      title: `توزیع ${chart.x}`,
    };
  }

  if (chart.category === "trend") {
    if (!chart.y) return null;

    // Group by x-axis and aggregate y values
    const chartData = table
      .groupby(chart.x)
      .rollup({
        value: aq.op.mean(chart.y),
      })
      .orderby(chart.x)
      .objects() as Array<Record<string, any>>;

    if (!chartData || chartData.length === 0) {
      return null;
    }

    return {
      types: ["line", "area"],
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
      title: `روند ${chart.y} بر مبنای ${chart.x}`,
    };
  }

  if (chart.category === "distribution") {
    if (!chart.y) {
      // Histogram for single column
      const values = data
        .map((row: any) => row[chart.x as string])
        .filter((v: any) => v !== null && v !== undefined && !isNaN(v))
        .map((v: any) => parseFloat(v));

      if (values.length === 0) return null;

      const min = Math.min(...values);
      const max = Math.max(...values);
      const bins = Math.min(20, Math.ceil(Math.sqrt(values.length)));
      const binWidth = (max - min) / bins;

      const histogram: Record<string, number> = {};

      for (let i = 0; i < bins; i++) {
        const binStart = min + i * binWidth;
        const binEnd = binStart + binWidth;
        const label = `${roundToTwoDecimals(binStart)}-${roundToTwoDecimals(binEnd)}`;
        histogram[label] = values.filter(
          (v) => v >= binStart && v < binEnd,
        ).length;
      }

      return {
        types: ["bar"],
        data: Object.entries(histogram).map(([label, count]) => ({
          [`${chart.x}`]: label,
          value: count,
        })),
        title: `توزیع ${chart.x}`,
      };
    } else {
      // Scatter chart for two columns
      const chartData = data
        .map((row: any) => ({
          x: parseFloat(row[chart.x as string]),
          y: parseFloat(row[chart.y as string]),
        }))
        .filter((d: any) => !isNaN(d.x) && !isNaN(d.y));

      if (chartData.length === 0) return null;

      return {
        types: ["scatter"],
        data: chartData.map((d: any) => ({
          [chart.x as string]: roundToTwoDecimals(d.x),
          [chart.y as string]: roundToTwoDecimals(d.y),
        })),
        title: `نمودار پراکندگی ${chart.x} و ${chart.y}`,
      };
    }
  }

  return null;
}
