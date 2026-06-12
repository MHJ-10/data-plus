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
 * Check if a column looks like an identifier or useless for visualization
 */
function isUselessColumn(column: string): boolean {
  const name = column.toLowerCase();
  const uselessPatterns = [
    "id",
    "uuid",
    "code",
    "phone",
    "email",
    "zip",
    "zipcode",
    "postal",
    "phone_number",
    "employee_code",
    "user_code",
    "identifi",
    "hash",
    "token",
    "key",
    "pk",
    "fk",
    "ref",
  ];

  return uselessPatterns.some((p) => name.includes(p));
}

/**
 * Check if a measure-measure combination would be useful for scatter chart
 */
function isUsefulMeasurePair(col1: string, col2: string): boolean {
  // Don't pair with ID-like or useless columns
  if (isUselessColumn(col1) || isUselessColumn(col2)) {
    return false;
  }

  return true;
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
      // Lower threshold to 0.3 to catch more relationships, then filter by quality
      strongCorrelations = findStrongCorrelations(correlationMatrix, 0.3);
    }
  }

  // 1. RECTANGULAR CHARTS (Bar, Column) - with cardinality filtering
  dimensions.forEach((dim) => {
    // Skip very high-cardinality dimensions
    if (dim.stats.uniqueRatio > 0.7) return;

    // Limit rectangular charts per dimension to reduce duplication
    let rectCount = 0;
    const maxRectPerDim = 2; // Max 2 charts per dimension

    measures.forEach((measure) => {
      if (rectCount >= maxRectPerDim) return;

      const correlation =
        correlationMatrix?.[dim.column]?.[measure.column] ?? 0;
      const result = scoreRectangularChart(dim, measure, correlation);

      if (result && result.score > 0.5) {
        charts.push(result.chart);
        rectCount++;
      }
    });
  });

  // 2. TREND CHARTS (Line, Area) - temporal charts
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

  // 3. CIRCULAR CHARTS (Pie, Donut) - limit to best ones
  let circularCount = 0;
  const maxCircular = 3;

  dimensions
    .filter((d) => d.stats.uniqueRatio < 0.3) // Only low-cardinality dimensions
    .sort((a, b) => {
      // Sort by cardinality (prefer fewer categories)
      return a.uniqueCount - b.uniqueCount;
    })
    .forEach((dim) => {
      if (circularCount >= maxCircular) return;

      const result = scoreCircularChart(dim);
      if (result && result.score > 0.7) {
        charts.push(result.chart);
        circularCount++;
      }
    });

  // 4. SCATTER CHARTS (for correlated measures) - improved support
  const seenPairs = new Set<string>();

  if (strongCorrelations.length > 0) {
    // Sort by absolute correlation strength
    strongCorrelations.sort(
      (a, b) => Math.abs(b.correlation) - Math.abs(a.correlation),
    );

    strongCorrelations.forEach(({ col1, col2, correlation }) => {
      // Avoid duplicate pairs (col1-col2 and col2-col1)
      const pairKey = [col1, col2].sort().join("|");
      if (seenPairs.has(pairKey)) return;
      seenPairs.add(pairKey);

      // Skip useless pairs
      if (!isUsefulMeasurePair(col1, col2)) return;

      const measure1 = measures.find((m) => m.column === col1);
      const measure2 = measures.find((m) => m.column === col2);

      if (measure1 && measure2) {
        const result = scoreScatterChart(measure1, measure2, correlation);

        if (result && result.score > 0.4) {
          charts.push(result.chart);
        }
      }
    });
  }

  // 5. DISTRIBUTION CHARTS (Histogram) - limit to best measures
  let distCount = 0;
  const maxDist = 2;

  measures
    .sort((a, b) => {
      // Sort by variance (prefer more varied data)
      return (b.columnStats?.variance || 0) - (a.columnStats?.variance || 0);
    })
    .forEach((measure) => {
      if (distCount >= maxDist) return;

      const result = scoreDistributionChart(measure);
      if (result && result.score > 0.6) {
        charts.push(result.chart);
        distCount++;
      }
    });

  // Sort by score descending and limit to top results
  const sortedCharts = charts.sort((a, b) => b.score - a.score);

  // Limit total charts to avoid overwhelming the user
  const maxCharts = 30;
  return sortedCharts.slice(0, maxCharts);
};
