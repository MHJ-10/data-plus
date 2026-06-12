/**
 * Smart Chart Scoring Engine
 * Uses statistical properties and data quality metrics for intelligent recommendations
 */

import { MapAllRolesResponse } from "./role-convertor";
import { ChartCandidate } from "./chart-candidate";

export interface ScoringFactors {
  cardinality: number; // 0-1
  dataDensity: number; // 0-1
  correlation: number; // -1 to 1
  dataQuality: number; // 0-1
  distribution: number; // 0-1
  variance: number; // 0-1
}

export interface ScoringResult {
  chart: ChartCandidate;
  score: number;
  factors: ScoringFactors;
  reason: string;
}

/**
 * Score cardinality (low = good for categorical, high = good for scatter/trends)
 */
function scoreCardinality(uniqueRatio: number, role: string): number {
  if (role === "temporal") return 0.9; // Temporal always good
  if (role === "measure") return 0.8; // Measures good for scatter
  
  if (uniqueRatio < 0.05) return 0.95; // Very low cardinality = excellent categorical
  if (uniqueRatio < 0.1) return 0.85;
  if (uniqueRatio < 0.3) return 0.7;
  if (uniqueRatio < 0.5) return 0.5;
  if (uniqueRatio < 0.7) return 0.3;
  return 0.1; // Very high cardinality = poor for most charts
}

/**
 * Score data quality (completeness, no outliers, etc.)
 */
function scoreDataQuality(
  completeness: number,
  outlierPercentage: number,
): number {
  const completenessScore = completeness * 0.6;
  const outlierScore = (1 - Math.min(outlierPercentage / 10, 1)) * 0.4;
  return completenessScore + outlierScore;
}

/**
 * Score distribution characteristics for specific chart types
 */
function scoreDistribution(
  skewness: number,
  isNormal: boolean,
  stdDev: number | undefined,
): number {
  if (stdDev === undefined) return 0.5;

  // Normal distribution is ideal for many charts
  if (isNormal) return 0.95;

  // Slight skew is acceptable
  if (Math.abs(skewness) < 1) return 0.8;

  // Moderate skew
  if (Math.abs(skewness) < 2) return 0.6;

  // High skew - needs special charts
  return 0.3;
}

/**
 * Score variance/spread of data - improved to prefer more variance
 */
function scoreVariance(variance: number | undefined): number {
  if (variance === undefined) return 0.5;

  if (variance === 0) return 0.2; // No variation = boring
  if (variance < 0.1) return 0.5; // Very low variance
  if (variance < 1) return 0.7; // Low variance = some patterns
  if (variance < 10) return 0.85; // Good variance
  if (variance < 100) return 0.95; // High variance
  return 1; // Very high variance = perfect for exploration
}

/**
 * Score correlation strength for multi-variable charts
 */
function scoreCorrelation(correlation: number): number {
  const absCorr = Math.abs(correlation);

  if (absCorr > 0.9) return 1; // Very strong
  if (absCorr > 0.7) return 0.95; // Strong
  if (absCorr > 0.5) return 0.85; // Moderate
  if (absCorr > 0.4) return 0.7; // Weak-moderate (lowered threshold)
  if (absCorr > 0.3) return 0.5; // Weak
  return 0.2; // Very weak (still include for exploration)
}

/**
 * Score rectangular charts (bar, column)
 */
export function scoreRectangularChart(
  dimension: MapAllRolesResponse,
  measure: MapAllRolesResponse | undefined,
  correlationValue: number = 0,
): ScoringResult | null {
  if (!measure) return null;

  const cardinalityScore = scoreCardinality(dimension.stats.uniqueRatio, "dimension");
  const qualityScore = dimension.quality
    ? scoreDataQuality(dimension.quality.completeness, dimension.quality.outlierPercentage)
    : 0.8;

  const variance = measure.columnStats?.variance || 0;
  const varianceScore = scoreVariance(variance);

  const correlation = scoreCorrelation(correlationValue);

  const factors: ScoringFactors = {
    cardinality: cardinalityScore,
    dataDensity: dimension.quality?.dataDensity ?? 0.5,
    correlation,
    dataQuality: qualityScore,
    distribution: varianceScore,
    variance: varianceScore,
  };

  // Weighted scoring: cardinality is most important for rectangular charts
  const score =
    cardinalityScore * 0.35 +
    qualityScore * 0.25 +
    varianceScore * 0.25 +
    correlation * 0.15;

  return {
    chart: {
      category: "rectangular",
      x: dimension.column,
      y: measure.column,
      score,
    },
    score,
    factors,
    reason: `Good rectangular chart: ${dimension.column} vs ${measure.column}`,
  };
}

/**
 * Score trend charts (line, area) - prefer temporal dimensions
 */
export function scoreTrendChart(
  temporal: MapAllRolesResponse,
  measure: MapAllRolesResponse | undefined,
  correlationValue: number = 0,
): ScoringResult | null {
  if (!measure) return null;

  const cardinalityScore = scoreCardinality(temporal.stats.uniqueRatio, "temporal");
  const qualityScore = temporal.quality
    ? scoreDataQuality(temporal.quality.completeness, temporal.quality.outlierPercentage)
    : 0.8;

  const variance = measure.columnStats?.variance || 0;
  const varianceScore = scoreVariance(variance);

  const distribution =
    measure.columnStats && measure.quality
      ? scoreDistribution(
          measure.columnStats.skewness || 0,
          measure.quality.isNormal,
          measure.columnStats.stdDev,
        )
      : 0.7;

  const factors: ScoringFactors = {
    cardinality: cardinalityScore,
    dataDensity: temporal.quality?.dataDensity ?? 0.5,
    correlation: scoreCorrelation(correlationValue),
    dataQuality: qualityScore,
    distribution,
    variance: varianceScore,
  };

  // Temporal dimensions get high score for trends
  const score =
    cardinalityScore * 0.4 +
    qualityScore * 0.25 +
    varianceScore * 0.2 +
    distribution * 0.15;

  return {
    chart: {
      category: "trend",
      x: temporal.column,
      y: measure.column,
      score,
    },
    score,
    factors,
    reason: `Excellent trend analysis: ${temporal.column} over ${measure.column}`,
  };
}

/**
 * Score circular charts (pie, donut)
 */
export function scoreCircularChart(
  dimension: MapAllRolesResponse,
): ScoringResult | null {
  const uniqueRatio = dimension.stats.uniqueRatio;

  // Circular charts work best with low-to-moderate cardinality
  if (uniqueRatio > 0.3) return null;

  const cardinalityScore =
    uniqueRatio < 0.05
      ? 1 // Perfect: few categories
      : uniqueRatio < 0.1
        ? 0.95
        : uniqueRatio < 0.2
          ? 0.85
          : 0.7;

  const qualityScore = dimension.quality
    ? scoreDataQuality(dimension.quality.completeness, dimension.quality.outlierPercentage)
    : 0.8;

  const factors: ScoringFactors = {
    cardinality: cardinalityScore,
    dataDensity: dimension.quality?.dataDensity ?? 0.5,
    correlation: 0,
    dataQuality: qualityScore,
    distribution: 0.5,
    variance: 0.5,
  };

  const score = cardinalityScore * 0.6 + qualityScore * 0.4;

  return {
    chart: {
      category: "circular",
      x: dimension.column,
      score,
    },
    score,
    factors,
    reason: `Ideal for composition: ${dimension.column}`,
  };
}

/**
 * Score scatter charts (good for correlated measures)
 * Improved: lower thresholds and better variance consideration
 */
export function scoreScatterChart(
  measure1: MapAllRolesResponse,
  measure2: MapAllRolesResponse,
  correlation: number,
): ScoringResult | null {
  const corrScore = scoreCorrelation(correlation);

  // Lowered threshold to include weak correlations for exploration
  if (corrScore < 0.2) return null;

  const quality1 = measure1.quality
    ? scoreDataQuality(measure1.quality.completeness, measure1.quality.outlierPercentage)
    : 0.8;

  const quality2 = measure2.quality
    ? scoreDataQuality(measure2.quality.completeness, measure2.quality.outlierPercentage)
    : 0.8;

  const avgQuality = (quality1 + quality2) / 2;
  const variance1 = scoreVariance(measure1.columnStats?.variance);
  const variance2 = scoreVariance(measure2.columnStats?.variance);
  const avgVariance = (variance1 + variance2) / 2;

  // Prefer pairs with better variance
  const varianceBonus = avgVariance > 0.7 ? 0.1 : 0;

  const factors: ScoringFactors = {
    cardinality: 0.8,
    dataDensity: 0.7,
    correlation: corrScore,
    dataQuality: avgQuality,
    distribution: 0.7,
    variance: avgVariance,
  };

  // More weight on correlation strength, but also value variance and quality
  const score =
    corrScore * 0.4 +
    avgQuality * 0.3 +
    avgVariance * 0.25 +
    varianceBonus * 0.05;

  return {
    chart: {
      category: "distribution",
      x: measure1.column,
      y: measure2.column,
      score,
    },
    score,
    factors,
    reason: `Scatter plot: ${measure1.column} vs ${measure2.column} (r: ${correlation.toFixed(2)})`,
  };
}

/**
 * Score distribution/histogram charts
 */
export function scoreDistributionChart(
  measure: MapAllRolesResponse,
): ScoringResult | null {
  if (!measure.columnStats || !measure.quality) return null;

  const distribution = scoreDistribution(
    measure.columnStats.skewness || 0,
    measure.quality.isNormal,
    measure.columnStats.stdDev,
  );

  const variance = scoreVariance(measure.columnStats.variance);
  const quality = scoreDataQuality(
    measure.quality.completeness,
    measure.quality.outlierPercentage,
  );

  const factors: ScoringFactors = {
    cardinality: 0.7,
    dataDensity: measure.quality.dataDensity,
    correlation: 0,
    dataQuality: quality,
    distribution,
    variance,
  };

  const score = distribution * 0.4 + variance * 0.3 + quality * 0.3;

  return {
    chart: {
      category: "distribution",
      x: measure.column,
      score,
    },
    score,
    factors,
    reason: `Distribution analysis for ${measure.column}`,
  };
}
