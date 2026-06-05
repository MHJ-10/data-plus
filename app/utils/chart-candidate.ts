import { MapAllRolesResponse } from "./role-convertor";
import {
  scoreRectangularChart,
  scoreTrendChart,
  scoreCircularChart,
  scoreScatterChart,
  scoreDistributionChart,
  ScoringResult,
} from "./chart-scoring";
import {
  CorrelationMatrix,
  calculateCorrelationMatrix,
  findStrongCorrelations,
} from "./analytics";

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

export interface ChartRecommendation extends ScoringResult {
  type: ChartType;
}

/**
 * Generate chart candidates with smart scoring
 */
export const generateCharts = (
  roles: MapAllRolesResponse[],
  rawData?: any[],
): ChartCandidate[] => {
  const dimensions = roles.filter((r) => r.role === "dimension");
  const measures = roles.filter((r) => r.role === "measure");
  const temporals = roles.filter((r) => r.role === "temporal");

  const charts: ChartCandidate[] = [];

  // Calculate correlations if we have measures and raw data
  let correlationMatrix: CorrelationMatrix | null = null;
  let strongCorrelations: Array<{
    col1: string;
    col2: string;
    correlation: number;
  }> = [];

  if (measures.length > 1 && rawData && rawData.length > 0) {
    const numericData: Record<string, number[]> = {};
    measures.forEach((measure) => {
      numericData[measure.column] = rawData
        .map((row) => parseFloat(row[measure.column]))
        .filter((v) => !isNaN(v));
    });

    if (Object.keys(numericData).length > 1) {
      correlationMatrix = calculateCorrelationMatrix(numericData);
      strongCorrelations = findStrongCorrelations(correlationMatrix, 0.5);
    }
  }

  // 1. RECTANGULAR CHARTS (Bar, Column)
  dimensions.forEach((dim) => {
    // Skip high-cardinality dimensions
    if (dim.stats.uniqueRatio > 0.7) return;

    measures.forEach((measure) => {
      const correlation =
        correlationMatrix?.[dim.column]?.[measure.column] ?? 0;
      const result = scoreRectangularChart(dim, measure, correlation);

      if (result && result.score > 0.5) {
        charts.push(result.chart);
      }
    });
  });

  // 2. TREND CHARTS (Line, Area)
  temporals.forEach((temp) => {
    measures.forEach((measure) => {
      const correlation =
        correlationMatrix?.[temp.column]?.[measure.column] ?? 0;
      const result = scoreTrendChart(temp, measure, correlation);

      if (result && result.score > 0.6) {
        charts.push(result.chart);
      }
    });
  });

  // 3. CIRCULAR CHARTS (Pie, Donut)
  dimensions.forEach((dim) => {
    const result = scoreCircularChart(dim);

    if (result && result.score > 0.7) {
      charts.push(result.chart);
    }
  });

  // 4. SCATTER CHARTS (for correlated measures)
  if (strongCorrelations.length > 0) {
    strongCorrelations.forEach(({ col1, col2, correlation }) => {
      const measure1 = measures.find((m) => m.column === col1);
      const measure2 = measures.find((m) => m.column === col2);

      if (measure1 && measure2) {
        const result = scoreScatterChart(measure1, measure2, correlation);

        if (result && result.score > 0.5) {
          charts.push(result.chart);
        }
      }
    });
  }

  // 5. DISTRIBUTION CHARTS (Histogram)
  measures.forEach((measure) => {
    const result = scoreDistributionChart(measure);

    if (result && result.score > 0.6) {
      charts.push(result.chart);
    }
  });

  // Sort by score descending
  return charts.sort((a, b) => b.score - a.score);
};
