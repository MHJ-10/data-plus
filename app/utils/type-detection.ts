import { calculateColumnStats, calculateDataQuality, ColumnStatistics, DataQualityMetrics } from "./analytics";

export type ColumnType =
  | "boolean"
  | "number"
  | "date"
  | "id-like"
  | "text"
  | "category"
  | "temporal";

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

/**
 * Detect if a column name suggests it's temporal (year, month, etc.)
 */
export function looksLikeTemporal(colName: string): boolean {
  const name = colName.toLowerCase();
  
  const temporalKeywords = [
    "year", "month", "quarter", "week", "day", "date", "time",
    "سال", "ماه", "روز", "هفته", "ربع", "سال", // Persian equivalents
    "year_", "_year", "month_", "_month", "day_", "_day",
    "yyyy", "mm", "dd", "hh", "mmm", "mmmm"
  ];

  return temporalKeywords.some((k) => name.includes(k));
}

/**
 * Detect if numeric values look like they represent a temporal sequence (year, month, etc.)
 */
export function looksLikeTemporalSequence(values: number[]): boolean {
  if (values.length < 3) return false;

  const sorted = [...values].sort((a, b) => a - b);
  const unique = new Set(sorted).size;

  // Check for year-like patterns (1300-2100)
  if (sorted[0] >= 1300 && sorted[sorted.length - 1] <= 2100) {
    if (unique >= values.length * 0.8) return true; // Most values are unique
  }

  // Check for month-like patterns (1-12)
  if (sorted[0] >= 1 && sorted[sorted.length - 1] <= 12) {
    if (unique >= 10) return false; // Too many unique values for months
    return true;
  }

  // Check for day-like patterns (1-31)
  if (sorted[0] >= 1 && sorted[sorted.length - 1] <= 31) {
    if (unique > 20) return false; // Probably not day
    return true;
  }

  // Check for week-like patterns (1-53)
  if (sorted[0] >= 1 && sorted[sorted.length - 1] <= 53) {
    if (unique > 40) return false;
    return true;
  }

  return false;
}

/**
 * Detect if a column is likely an encoded categorical (numeric but truly categorical)
 */
export function looksLikeEncodedCategory(
  colName: string,
  uniqueRatio: number,
  uniqueCount: number,
  values: number[]
): boolean {
  const name = colName.toLowerCase();

  // Common category-related keywords
  const categoryKeywords = [
    "status", "category", "type", "class", "level", "grade", "rating", "score",
    "priority", "severity", "gender", "gender_id", "gender_code",
    "category_id", "type_id", "status_id", "rank",
    "وضعیت", "نوع", "دسته", "گروه", "سطح", "درجه" // Persian
  ];

  const looksLikeCategory = categoryKeywords.some((k) => name.includes(k));

  // If column name suggests it's categorical, use low cardinality threshold
  if (looksLikeCategory) {
    return uniqueCount <= 20 && uniqueRatio < 0.5;
  }

  // Otherwise, use conservative heuristics
  // If very few unique values relative to row count, likely categorical
  if (uniqueCount <= 10 && uniqueRatio < 0.15) {
    // Check if values form a sequence (like 1, 2, 3, 4 for status)
    const sorted = [...new Set(values)].sort((a, b) => a - b);
    
    // If values are sequential small integers, likely a category code
    if (sorted[0] >= 0 && sorted[sorted.length - 1] <= 10) {
      return true;
    }
  }

  return false;
}

export function looksLikeId(colName: string) {
  const name = colName.toLowerCase();

  const idKeywords = ["id", "uuid", "ean", "code", "phone", "index", "identifi", "employee_code", "user_code"];

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

  // Priority-based detection
  if (uniqueCount <= 2 && booleanRatio > 0.8) {
    type = "boolean";
  } else if (looksLikeId(colName)) {
    type = "id-like";
  } else if (dateRatio > 0.7) {
    type = "date";
  } else if (numberRatio > 0.8) {
    // Check if it looks temporal despite being numeric
    if (looksLikeTemporal(colName) || looksLikeTemporalSequence(numericValues)) {
      type = "temporal";
    }
    // Check if it looks like an encoded category
    else if (looksLikeEncodedCategory(colName, uniqueRatio, uniqueCount, numericValues)) {
      type = "category";
    } else {
      type = "number";
    }
  } else if (avgStringLength > 20 && uniqueRatio > 0.5) {
    type = "text";
  } else {
    type = "category";
  }

  const result: DetectColumnTypeResponse = {
    avgStringLength,
    uniqueRatio,
    type,
    uniqueCount,
    missingCount,
  };

  // Calculate statistical properties for numeric columns
  if ((type === "number" || type === "temporal") && numericValues.length > 0) {
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
