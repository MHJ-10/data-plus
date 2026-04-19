import { ColumnType } from "./type-detection";

type ColumnRole = "dimension" | "measure" | "temporal" | "ignore";

export function mapTypeToRole(
  type: ColumnType,
  stats: {
    uniqueRatio: number;
    avgStringLength: number;
  },
): ColumnRole {
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

export function mapAllRoles(data: Record<string, any>) {
  return Object.entries(data).map(
    ([column, { type, avgStringLength, uniqueRatio }]) => ({
      column,
      role: mapTypeToRole(type, {
        avgStringLength: avgStringLength,
        uniqueRatio,
      }),
    }),
  );
}
