import {
  ChartCategory,
  ColumnRole,
  ColumnType,
  Prisma,
} from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { buildChartData } from "@/utils/chart-builder";
import { generateCharts } from "@/utils/chart-candidate";
import { mapAllRoles } from "@/utils/role-convertor";
import { detectAllColumns } from "@/utils/type-detection";
import { NextResponse } from "next/server";
import Papa from "papaparse";

interface RunAnalysisParams {
  analysisId: string;
  data: unknown[];
}

const runAnalysis = async ({ data, analysisId }: RunAnalysisParams) => {
  try {
    const start = Date.now();

    const types = detectAllColumns(data);

    const roles = mapAllRoles(types);

    roles.forEach(async (role) => {
      await prisma.columnMetadata.create({
        data: {
          analysisId,
          columnName: role.column,
          role: role.role.toUpperCase() as ColumnRole,
          type: role.type.toUpperCase().replaceAll("-", "_") as ColumnType,
          missingCount: role.missingCount,
          uniqueCount: role.uniqueCount,
          averageLength: role.stats.avgStringLength,
          uniqueRatio: role.stats.uniqueRatio,
        },
      });
    });

    const charts = generateCharts(roles);

    charts.forEach(async (chart) => {
      const generatedChart = await prisma.chart.create({
        data: {
          analysisId,
          category: chart.category.toUpperCase() as ChartCategory,
          xField: chart.x || null,
          yField: chart.y || null,
          score: chart.score,
          title: "",
          chartData: [],
          availableTypes: [],
        },
      });

      const builtChart = buildChartData(data, chart);

      await prisma.chart.update({
        where: {
          id: generatedChart.id,
        },
        data: {
          title: builtChart?.title,
          chartData: builtChart?.data,
          availableTypes: builtChart?.types,
        },
      });
    });

    const end = Date.now();

    const analysisTimeMs = end - start;

    await prisma.analysis.update({
      where: {
        id: analysisId,
      },
      data: {
        status: "COMPLETED",
        analysisTimeMs,
        // charts:{},
        // columnMetadata:[],
      },
    });
  } catch (error) {
    await prisma.analysis.update({
      where: {
        id: analysisId,
      },
      data: {
        status: "FAILED",
      },
    });
  }
};

export async function POST(req: Request) {
  const formData = await req.formData();

  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      {
        error: "اطلاعات کاربر یافت نشد.",
      },
      {
        status: 401,
      },
    );
  }

  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      {
        error: "فایل یافت نشد.",
      },
      { status: 400 },
    );
  }

  const text = await file.text();

  const { data } = Papa.parse(text, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  const totalColumns = Object.keys(data[0] as object).length;

  const datasetPreview = data.slice(0, 5) as Prisma.InputJsonValue;

  const analysis = await prisma.analysis.create({
    data: {
      userId: session.user.id,
      datasetName: file.name.split(".csv")[0],
      status: "PROCESSING",
      rowsCount: data.length,
      columnsCount: totalColumns,
      datasetPreview,
      originalFileName: file.name,
      originalFileSize: file.size,
    },
  });

  runAnalysis({
    analysisId: analysis.id,
    data,
  });

  return Response.json({
    ok: file.name,
    analysisId: analysis.id,
  });
}
