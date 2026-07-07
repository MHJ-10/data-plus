"use server";

import { insightSchema } from "@/data/schema";
import prisma from "@/lib/prisma";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { Output, streamText } from "ai";
import { NextRequest } from "next/server";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: NextRequest) {
  const analysisId = await req.json();

  const analysis = await prisma.analysis.findUnique({
    where: { id: analysisId },
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
  // You are a professional data analyst.

  // Dataset Context:
  // ${JSON.stringify(context, null, 2)}

  // TASK:
  // Generate 5 to 7 high-quality, actionable insights.

  // RULES:
  // - Title: Very short and punchy (max 8-10 words)
  // - Description: 1 sentence only (max 60-70 words). Be specific with numbers.
  // - Use real data only. Do not hallucinate.
  // - Vary the types: TREND, INSIGHT, WARNING, CORRELATION.
  // - Score: realistic importance (0.65 - 0.95)

  // Respond with valid JSON only.
  // IMPORTANT_NOTE: write title and description in persian language.
  // `;

  try {
    const result = streamText({
      model: openrouter("tencent/hy3:free", {
        extraBody: {
          models: [
            "nvidia/nemotron-3-ultra-550b-a55b:free",
            "nvidia/nemotron-3-super-120b-a12b:free",
            "openai/gpt-oss-120b:free",
          ],
        },
      }),
      prompt,
      output: Output.object({
        schema: insightSchema,
      }),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.log(error);
    return new Response("ERROR", { status: 500 });
  }
}

// tencent/hy3:free
// nvidia/nemotron-3-ultra-550b-a55b:free
// nvidia/nemotron-3-super-120b-a12b:free
// openai/gpt-oss-120b:free
// poolside/laguna-m.1:free
// openai/gpt-oss-20b:free
// poolside/laguna-xs-2.1:free

// Google Gemma 4 26B A4B
// Google Gemma 4 31B
// Qwen 3 Next 80B
// Qwen 3 Coder
// OpenAI GPT-OSS 120B
// Meta Llama 3.3 70B
// Meta Llama 3.2 3B
// Hermes 3 Llama 405B
// Dolphin Mistral Venice
