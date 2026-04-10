import Papa from "papaparse";
import { toJSON, DataFrame } from "danfojs";

// type ColumnType = "number" | "category" | "date" | "id" | "text";

// function detectColumnType(values: any[]): ColumnType {
//   const uniqueCount = new Set(values).size;

//   const isNumber = values.every((v) => !isNaN(Number(v)));
//   const isDate = values.every((v) => !isNaN(Date.parse(v)));

//   if (isNumber) return "number";
//   if (isDate) return "date";

//   // Heuristic for ID
//   if (uniqueCount === values.length) return "id";

//   // Heuristic for category
//   if (uniqueCount < values.length * 0.5) return "category";

//   return "text";
// }

// function isUsefulColumn(type: ColumnType) {
//   return type !== "id" && type !== "text";
// }

// function generateChartConfigs(columns) {
//   const categories = columns.filter((c) => c.type === "category");
//   const numbers = columns.filter((c) => c.type === "number");

//   const charts = [];

//   categories.forEach((cat) => {
//     numbers.forEach((num) => {
//       charts.push({
//         label: cat.name,
//         value: num.name,
//         types: ["bar", "pie", "treemap"],
//       });
//     });
//   });

//   return charts;
// }

// function suggestCharts(labelType, valueType, uniqueCount) {
//   if (labelType === "date") return ["line", "area"];

//   if (labelType === "category") {
//     if (uniqueCount < 6) return ["pie", "bar"];
//     return ["bar", "treemap"];
//   }

//   return ["bar"];
// }

function normalizeSummary(summary: DataFrame) {
  const statKeys = ["count", "mean", "std", "min", "median", "max", "variance"];

  const result = {};

  const summaryJSON = toJSON(summary, { format: "row" });

  if (!summaryJSON) return [];

  for (const col in summaryJSON) {
    result[col] = {};

    summaryJSON[col].forEach((value, i) => {
      result[col][statKeys[i]] = value;
    });
  }

  return result;
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return Response.json({ error: "No file uploaded" }, { status: 400 });
  }

  const text = await file.text();

  const result = Papa.parse(text, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  const df = new DataFrame(result.data);

  const summary = df.describe();

  const normalizedSummary = normalizeSummary(summary);

  return Response.json({
    data: result.data,
    summary: normalizedSummary,
  });
}
