import { ColumnType } from "./type-detection";
import { ColumnStatistics, DataQualityMetrics } from "./analytics";

type ColumnRole = "dimension" | "measure" | "temporal" | "ignore";

interface ColumnStat {
  uniqueRatio: number;
  avgStringLength: number;
}

export interface MapAllRolesResponse {
  column: string;
  role: ColumnRole;
  stats: ColumnStat;
  type: string;
  uniqueCount: number;
  missingCount: number;
  columnStats?: ColumnStatistics;
  quality?: DataQualityMetrics;
}

export function mapTypeToRole(type: ColumnType, stats: ColumnStat): ColumnRole {
  const { uniqueRatio, avgStringLength } = stats;

  if (type === "id-like") {
    return "ignore";
  }

  if (type === "date" || type === "temporal") {
    return "temporal";
  }

  if (type === "number") {
    return "measure";
  }

  if (type === "text") {
    if (avgStringLength > 30) return "ignore";

    return "dimension";
  }

  if (type === "category") {
    if (uniqueRatio > 0.9) return "ignore";

    return "dimension";
  }

  return "dimension";
}

export function mapAllRoles(data: Record<string, any>): MapAllRolesResponse[] {
  return Object.entries(data).map(
    ([
      column,
      { type, avgStringLength, uniqueRatio, uniqueCount, missingCount, stats, quality },
    ]) => ({
      column,
      type,
      uniqueCount,
      missingCount,
      stats: { avgStringLength, uniqueRatio },
      columnStats: stats,
      quality,
      role: mapTypeToRole(type, {
        avgStringLength,
        uniqueRatio,
      }),
    }),
  );
}
