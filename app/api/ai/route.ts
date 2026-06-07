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
  };

  const prompt = `
You are a professional data analyst.

Dataset Context:
${JSON.stringify(context, null, 2)}

TASK:
Generate 5 to 8 high-quality, actionable insights from this dataset.

RULES:
- Title: Very short and punchy (max 8-10 words, ideally one line)
- Description: Keep it concise — 1 to 2 sentences maximum (max 70 words)
- Each insight must be specific and reference real numbers, distributions, comparisons, or patterns.
- Do not hallucinate numbers.
- Prioritize different types: TREND, CORRELATION, WARNING, INSIGHT.
- Give a realistic score between 0.65 and 0.95.

IMPORTANT_NOTE: Return the insights in the requested JSON format only.
`;


  const result = await generateText({
    model: openrouter("nvidia/nemotron-3-ultra-550b-a55b:free"),
    prompt,
  });

  return NextResponse.json({ result, prompt });
}
