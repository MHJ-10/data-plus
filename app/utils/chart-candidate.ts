import { MapAllRolesResponse } from "./role-convertor";

export type ChartType = "bar" | "line" | "area" | "pie" | "treemap" | "scatter";

export type ChartCategory =
  | "rectangular"
  | "trend"
  | "circular"
  | "distribution";

export interface ChartCandidate {
  category: ChartCategory;
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
        category: "rectangular",
        x: dim.column,
        y: measure.column,
        score: 0.8 + (1 - dim.stats.uniqueRatio),
      });

      // if (dim.stats.uniqueRatio > 0.05) {
      //   charts.push({
      //     category: "rectangular",
      //     x: dim.column,
      //     y: measure.column,
      //     score: 0.7,
      //   });
      // }
    });
  });

  temporals.forEach((temp) => {
    measures.forEach((measure) => {
      charts.push({
        category: "trend",
        x: temp.column,
        y: measure.column,
        score: 0.95,
      });

      // charts.push({
      //   category: "distribution",
      //   x: temp.column,
      //   y: measure.column,
      //   score: 0.9,
      // });
    });
  });

  dimensions.forEach((dim) => {
    const u = dim.stats.uniqueRatio;

    if (u > 0.02 && u < 0.3) {
      charts.push({
        category: "circular",
        x: dim.column,
        score: 0.85,
      });
    }
  });

  return charts;
};
