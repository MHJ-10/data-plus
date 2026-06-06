"use server";

import prisma from "@/lib/prisma";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import { NextResponse } from "next/server";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function GET() {
  const analysis = await prisma.analysis.findUnique({
    where: { id: "cmq2daa020020brb2vzoz2lye" },
    include: {
      columnMetadata: true,
      charts: true,
    },
  });

  if (!analysis) throw new Error("Analysis not found");

  const context = {
    datasetName: analysis.datasetName,
    rows: analysis.rowsCount,
    columns: analysis.columnsCount,
    columnsInfo: analysis.columnMetadata.map((c) => ({
      name: c.columnName,
      type: c.type,
      role: c.role,
      missing: c.missingCount,
      unique: c.uniqueCount,
      mean: c.mean,
      median: c.median,
      variance: c.variance,
      stdDev: c.stdDev,
      skewness: c.skewness,
      kurtosis: c.kurtosis,
      min: c.min,
      max: c.max,
      range: c.range,
      q1: c.q1,
      q3: c.q3,
      iqr: c.iqr,
      // Data quality metrics
      completeness: c.completeness,
      cardinalityRatio: c.cardinalityRatio,
      hasOutliers: c.hasOutliers,
      outlierCount: c.outlierCount,
      outlierPercentage: c.outlierPercentage,
      isSkewed: c.isSkewed,
      isNormal: c.isNormal,
      dataDensity: c.dataDensity,
    })),
    charts: analysis.charts.map((c) => ({
      title: c.title,
      type: c.category,
      x: c.xField,
      y: c.yField,
    })),
  };

  const result = await generateText({
    model: openrouter("nvidia/nemotron-3-ultra-550b-a55b:free"),
    prompt: `You are an expert data analyst.

Dataset Context:
${JSON.stringify(context, null, 2)}

TASK:
Generate 5 to 8 high-quality, actionable insights from this dataset.

RULES:
- Each insight must be specific and reference real numbers, distributions, comparisons, or patterns from the data.
- Do not hallucinate numbers.
- Prioritize different types: TREND, CORRELATION, WARNING, INSIGHT.
- Make the title short and punchy (one line).
- Description should be 2-4 sentences, informative and professional.
- Give a realistic score between 0.6 and 1.0 based on how important/strong the insight is.

Return the insights in the requested JSON format only.
`,
  });

  return NextResponse.json({ result });
}
