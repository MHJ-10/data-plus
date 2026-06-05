/**
 * Advanced Analytics Engine for Smart Chart Detection
 * Calculates statistical properties and provides intelligent recommendations
 */

export interface ColumnStatistics {
  mean?: number;
  median?: number;
  variance?: number;
  stdDev?: number;
  skewness?: number;
  kurtosis?: number;
  min?: number;
  max?: number;
  range?: number;
  q1?: number;
  q3?: number;
  iqr?: number;
}

export interface DataQualityMetrics {
  completeness: number; // 0-1 ratio of non-null values
  cardinality: number;
  cardinalityRatio: number;
  hasOutliers: boolean;
  outlierCount: number;
  outlierPercentage: number;
  isSkewed: boolean;
  isNormal: boolean;
  dataDensity: number; // How concentrated the data is
}

export interface CorrelationMatrix {
  [key1: string]: {
    [key2: string]: number;
  };
}

/**
 * Calculate mean of numeric array
 */
export function calculateMean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/**
 * Calculate median
 */
export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Calculate variance
 */
export function calculateVariance(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = calculateMean(values);
  const squareDiffs = values.map((v) => Math.pow(v - mean, 2));
  return calculateMean(squareDiffs);
}

/**
 * Calculate standard deviation
 */
export function calculateStdDev(values: number[]): number {
  return Math.sqrt(calculateVariance(values));
}

/**
 * Calculate skewness (measures asymmetry)
 * Positive = right skewed, Negative = left skewed, 0 = symmetric
 */
export function calculateSkewness(values: number[]): number {
  if (values.length < 3) return 0;

  const mean = calculateMean(values);
  const stdDev = calculateStdDev(values);

  if (stdDev === 0) return 0;

  const n = values.length;
  const skew = values.reduce(
    (sum, v) => sum + Math.pow((v - mean) / stdDev, 3),
    0,
  );

  return (n / ((n - 1) * (n - 2))) * skew;
}

/**
 * Calculate kurtosis (measures tail heaviness)
 */
export function calculateKurtosis(values: number[]): number {
  if (values.length < 4) return 0;

  const mean = calculateMean(values);
  const stdDev = calculateStdDev(values);

  if (stdDev === 0) return 0;

  const n = values.length;
  const kurt = values.reduce(
    (sum, v) => sum + Math.pow((v - mean) / stdDev, 4),
    0,
  );

  return (
    (n * (n + 1) * kurt) / ((n - 1) * (n - 2) * (n - 3)) -
    (3 * (n - 1) * (n - 1)) / ((n - 2) * (n - 3))
  );
}

/**
 * Calculate quartiles
 */
export function calculateQuartiles(values: number[]): {
  q1: number;
  q3: number;
} {
  if (values.length === 0) return { q1: 0, q3: 0 };

  const sorted = [...values].sort((a, b) => a - b);
  const q1Index = Math.floor(sorted.length * 0.25);
  const q3Index = Math.floor(sorted.length * 0.75);

  return {
    q1: sorted[q1Index],
    q3: sorted[q3Index],
  };
}

/**
 * Detect outliers using IQR method
 */
export function detectOutliers(values: number[]): {
  outliers: number[];
  count: number;
  percentage: number;
} {
  if (values.length === 0) return { outliers: [], count: 0, percentage: 0 };

  const sorted = [...values].sort((a, b) => a - b);
  const q1Index = Math.floor(sorted.length * 0.25);
  const q3Index = Math.floor(sorted.length * 0.75);

  const q1 = sorted[q1Index];
  const q3 = sorted[q3Index];
  const iqr = q3 - q1;

  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;

  const outliers = values.filter((v) => v < lowerBound || v > upperBound);

  return {
    outliers,
    count: outliers.length,
    percentage: (outliers.length / values.length) * 100,
  };
}

/**
 * Calculate column statistics for numeric data
 */
export function calculateColumnStats(values: number[]): ColumnStatistics {
  if (values.length === 0) return {};

  const mean = calculateMean(values);
  const median = calculateMedian(values);
  const variance = calculateVariance(values);
  const stdDev = calculateStdDev(values);
  const skewness = calculateSkewness(values);
  const kurtosis = calculateKurtosis(values);
  const { q1, q3 } = calculateQuartiles(values);

  return {
    mean,
    median,
    variance,
    stdDev,
    skewness,
    kurtosis,
    min: Math.min(...values),
    max: Math.max(...values),
    range: Math.max(...values) - Math.min(...values),
    q1,
    q3,
    iqr: q3 - q1,
  };
}

/**
 * Calculate data quality metrics
 */
export function calculateDataQuality(
  values: any[],
  numericValues: number[],
  uniqueCount: number,
): DataQualityMetrics {
  const totalCount = values.length;
  const missingCount = values.filter(
    (v) => v === null || v === undefined || "",
  ).length;
  const completeness = (totalCount - missingCount) / totalCount;

  const cardinalityRatio = uniqueCount / (totalCount - missingCount);
  const { count: outlierCount, percentage: outlierPercentage } =
    detectOutliers(numericValues);

  const skewness = calculateSkewness(numericValues);
  const isSkewed = Math.abs(skewness) > 1;
  const isNormal = Math.abs(skewness) < 0.5;

  // Data density: higher when values are concentrated in a narrower range
  const stats = calculateColumnStats(numericValues);
  const range = stats.range || 1;
  const stdDev = stats.stdDev || 0;
  const dataDensity = stdDev > 0 ? 1 / (1 + stdDev / range) : 0;

  return {
    completeness,
    cardinality: uniqueCount,
    cardinalityRatio,
    hasOutliers: outlierCount > 0,
    outlierCount,
    outlierPercentage,
    isSkewed,
    isNormal,
    dataDensity,
  };
}

/**
 * Calculate Pearson correlation coefficient between two numeric arrays
 */
export function calculateCorrelation(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length === 0) return 0;

  const meanX = calculateMean(x);
  const meanY = calculateMean(y);

  let numerator = 0;
  let sumSqX = 0;
  let sumSqY = 0;

  for (let i = 0; i < x.length; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    numerator += dx * dy;
    sumSqX += dx * dx;
    sumSqY += dy * dy;
  }

  const denominator = Math.sqrt(sumSqX * sumSqY);
  return denominator === 0 ? 0 : numerator / denominator;
}

/**
 * Calculate correlation matrix for all numeric columns
 */
export function calculateCorrelationMatrix(
  data: Record<string, number[]>,
): CorrelationMatrix {
  const columns = Object.keys(data);
  const matrix: CorrelationMatrix = {};

  columns.forEach((col1) => {
    matrix[col1] = {};
    columns.forEach((col2) => {
      if (col1 === col2) {
        matrix[col1][col2] = 1;
      } else if (matrix[col2]?.[col1] !== undefined) {
        matrix[col1][col2] = matrix[col2][col1];
      } else {
        matrix[col1][col2] = calculateCorrelation(data[col1], data[col2]);
      }
    });
  });

  return matrix;
}

/**
 * Find strong correlations above threshold
 */
export function findStrongCorrelations(
  correlationMatrix: CorrelationMatrix,
  threshold: number = 0.7,
): Array<{ col1: string; col2: string; correlation: number }> {
  const correlations: Array<{
    col1: string;
    col2: string;
    correlation: number;
  }> = [];

  const columns = Object.keys(correlationMatrix);

  columns.forEach((col1, i) => {
    columns.slice(i + 1).forEach((col2) => {
      const corr = Math.abs(correlationMatrix[col1][col2]);
      if (corr >= threshold) {
        correlations.push({
          col1,
          col2,
          correlation: correlationMatrix[col1][col2],
        });
      }
    });
  });

  return correlations.sort(
    (a, b) => Math.abs(b.correlation) - Math.abs(a.correlation),
  );
}
