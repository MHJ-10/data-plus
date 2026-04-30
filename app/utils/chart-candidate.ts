import { MapAllRolesResponse } from "./role-convertor";

export type ChartType = "bar" | "line" | "area" | "pie" | "treemap" | "scatter";

export interface ChartCandidate {
  type: ChartType;
  x?: string;
  y?: string;
  score: number;
}

export const generateCharts = (
  roles: MapAllRolesResponse[],
): ChartCandidate[] => {
  const dimensions = roles.filter((r) => r.role === "dimension");
  const measures = roles.filter((r) => r.role === "measure");
  const temporals = roles.filter((r) => r.role === "temporal");

  const charts: ChartCandidate[] = [];

  dimensions.forEach((dim) => {
    if (dim.stats.uniqueRatio > 0.7) return;

    measures.forEach((measure) => {
      charts.push({
        type: "bar",
        x: dim.column,
        y: measure.column,
        score: 0.8 + (1 - dim.stats.uniqueRatio),
      });

      if (dim.stats.uniqueRatio > 0.05) {
        charts.push({
          type: "treemap",
          x: dim.column,
          y: measure.column,
          score: 0.7,
        });
      }
    });
  });

  temporals.forEach((temp) => {
    measures.forEach((measure) => {
      charts.push({
        type: "line",
        x: temp.column,
        y: measure.column,
        score: 0.95,
      });

      charts.push({
        type: "area",
        x: temp.column,
        y: measure.column,
        score: 0.9,
      });
    });
  });

  dimensions.forEach((dim) => {
    const u = dim.stats.uniqueRatio;

    if (u > 0.02 && u < 0.3) {
      charts.push({
        type: "pie",
        x: dim.column,
        score: 0.85,
      });
    }
  });

  return charts;
};
