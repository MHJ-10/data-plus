import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const PAGE_SIZE = 6;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const analysisId = (await params).id;
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");

    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "خطا در دریافت جزئیات نمودار" },
        { status: 401 },
      );
    }

    if (!analysisId) {
      return NextResponse.json(
        { error: "اطلاعات مورد نیاز ناقص است" },
        { status: 400 },
      );
    }

    const charts = await prisma.chart.findMany({
      where: {
        analysisId,
        analysis: {
          userId,
        },
      },
      orderBy: { id: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    if (!charts) {
      return NextResponse.json(
        {
          error: "نمودارها یافت نشد.",
        },
        { status: 404 },
      );
    }

    const totalCharts = await prisma.chart.count({
      where: {
        analysisId,
        analysis: { userId },
      },
    });

    const nextId = page < Math.ceil(totalCharts / PAGE_SIZE) ? page + 1 : null;
    const previousId = page === 1 ? null : page - 1;

    return NextResponse.json({
      data: charts,
      nextId,
      previousId,
    });
  } catch (error) {
    console.error("Error fetching charts:", error);
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات" },
      { status: 500 },
    );
  }
}
