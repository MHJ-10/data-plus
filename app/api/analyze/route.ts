import { auth } from "@/lib/auth";
import { buildChartData } from "@/utils/chart-builder";
import { generateCharts } from "@/utils/chart-candidate";
import { mapAllRoles } from "@/utils/role-convertor";
import { detectAllColumns } from "@/utils/type-detection";
import { NextResponse } from "next/server";
import Papa from "papaparse";

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

  // const text = await file.text();

  // const { data } = Papa.parse(text, {
  //   header: true,
  //   dynamicTyping: true,
  //   skipEmptyLines: true,
  // });

  // const types = detectAllColumns(data);
  // const roles = mapAllRoles(types);
  // const charts = generateCharts(roles);
  // const chartData = charts.map((chart) => buildChartData(data, chart));

  return Response.json({
    ok: file.name,
  });
}
