import { calculateColumnStats, calculateDataQuality, ColumnStatistics, DataQualityMetrics } from "./analytics";

export type ColumnType =
  | "boolean"
  | "number"
  | "date"
  | "id-like"
  | "text"
  | "category";

export interface DetectColumnTypeResponse {
  type: ColumnType;
  uniqueRatio: number;
  avgStringLength: number;
  uniqueCount: number;
  missingCount: number;
  stats?: ColumnStatistics;
  quality?: DataQualityMetrics;
}

function isBoolean(val: any) {
  if (typeof val === "boolean") return true;

  const v = String(val).toLowerCase();
  return ["true", "false", "yes", "no", "0", "1"].includes(v);
}

export function looksLikeId(colName: string) {
  const name = colName.toLowerCase();

  const idKeywords = ["id", "uuid", "ean", "code", "phone", "index"];

  if (idKeywords.some((k) => name.includes(k))) return true;
  return false;
}

function isNumber(val: any) {
  return typeof val === "number" && !isNaN(val);
}

function isDate(val: any) {
  const d = new Date(val);
  return !isNaN(d.getTime());
}

function detectColumnType(arr: any, colName: string): DetectColumnTypeResponse {
  const missingCount = arr.filter(
    (v: any) => v === null || v === undefined || v === "",
  ).length;

  const clean = arr.filter(
    (v: any) => v !== null && v !== undefined && v !== "",
  );

  let type: ColumnType | null;

  const total = clean.length;

  let numberCount = 0;
  let booleanCount = 0;
  let dateCount = 0;
  let stringCount = 0;

  let totalStringLength = 0;

  const uniqueSet = new Set<any>();
  const numericValues: number[] = [];

  clean.forEach((v: any) => {
    uniqueSet.add(v);

    if (isNumber(v)) {
      numberCount++;
      numericValues.push(v);
    } else if (isBoolean(v)) booleanCount++;
    else if (isDate(v)) dateCount++;
    else {
      stringCount++;
      totalStringLength += String(v).length;
    }
  });

  const uniqueCount = uniqueSet.size;
  const uniqueRatio = uniqueCount / total;

  const numberRatio = numberCount / total;
  const booleanRatio = booleanCount / total;
  const dateRatio = dateCount / total;

  const avgStringLength = stringCount > 0 ? totalStringLength / stringCount : 0;

  if (uniqueCount <= 2 && booleanRatio > 0.8) type = "boolean";
  else if (looksLikeId(colName)) type = "id-like";
  else if (numberRatio > 0.8) type = "number";
  else if (dateRatio > 0.7) type = "date";
  else if (avgStringLength > 20 && uniqueRatio > 0.5) type = "text";
  else type = "category";

  const result: DetectColumnTypeResponse = {
    avgStringLength,
    uniqueRatio,
    type,
    uniqueCount,
    missingCount,
  };

  // Calculate statistical properties for numeric columns
  if (type === "number" && numericValues.length > 0) {
    result.stats = calculateColumnStats(numericValues);
    result.quality = calculateDataQuality(arr, numericValues, uniqueCount);
  }

  return result;
}

function getRandomSample(arr: any[], size: number = 100) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

export function detectAllColumns(
  data: any[],
): Record<string, DetectColumnTypeResponse> {
  if (!data.length) return {} as Record<string, DetectColumnTypeResponse>;

  const columns = Object.keys(data[0]);

  const result: Record<string, DetectColumnTypeResponse> = {};

  const sampleData = getRandomSample(data, Math.min(data.length, 200));

  columns.forEach((col) => {
    const values = sampleData.map((row) => row[col]);

    result[col] = detectColumnType(values, col);
  });

  return result;
}
