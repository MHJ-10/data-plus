import { ColumnType } from "./type-detection";

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
}

export function mapTypeToRole(type: ColumnType, stats: ColumnStat): ColumnRole {
  const { uniqueRatio, avgStringLength } = stats;

  if (type === "id-like") {
    return "ignore";
  }

  if (type === "date") {
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
      { type, avgStringLength, uniqueRatio, uniqueCount, missingCount },
    ]) => ({
      column,
      type,
      uniqueCount,
      missingCount,
      stats: { avgStringLength, uniqueRatio },
      role: mapTypeToRole(type, {
        avgStringLength,
        uniqueRatio,
      }),
    }),
  );
}
