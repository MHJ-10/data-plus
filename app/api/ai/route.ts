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
    where: { id: "cmq0xu0970001wq0mk4x1bw7c" },
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
    model: openrouter("arcee-ai/trinity-large-preview:free"),
    prompt: `You are an expert data analyst. Analyze this dataset and generate insightful observations.

Dataset Context:
${JSON.stringify(context, null, 2)}

Generate 5-8 high-quality insights. Focus on meaningful patterns, trends, correlations, and potential issues.
Be specific and use only the given data. Do not hallucinate.`,
  });

  return NextResponse.json({ result });
}
