"use server";

import { OTPEmailTemplate } from "@/components";
import prisma from "@/lib/prisma";
import { compare, hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { createUserSchema } from "./schema";
import { redirect } from "next/navigation";
import { encrypt } from "@/lib/encrypt";
import {
  CheckPasswordPayload,
  PromsieActionResponse,
  ResendOTPPayload,
  RunAnalysisParams,
  UpdateUserPayload,
  VerifyEmailPayload,
} from "./interface";
import { auth } from "@/lib/auth";
import {
  ChartCategory,
  ColumnRole,
  ColumnType,
  Prisma,
} from "@/generated/prisma/client";
import Papa from "papaparse";
import { detectAllColumns } from "@/utils/type-detection";
import { mapAllRoles } from "@/utils/role-convertor";
import { generateCharts } from "@/utils/chart-candidate";
import { buildChartData } from "@/utils/chart-builder";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createUser(
  _: any,
  formData: FormData,
): PromsieActionResponse {
  const { data, error } = createUserSchema.safeParse({
    nickname: formData.get("nickname"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (error) {
    return { error: "لطفاً تمام فیلدها را پر کنید." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return { error: "این ایمیل قبلاً ثبت شده است." };
  }

  const hashedPassword = await hash(data.password, 12);
  await prisma.user.create({
    data: {
      name: data.nickname,
      email: data.email,
      password: hashedPassword,
    },
  });

  const otp = Math.floor(100000 + Math.random() * 900000);

  console.log(otp);
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.verificationToken.create({
    data: {
      identifier: data.email,
      token: otp.toString(),
      expires,
    },
  });

  await resend.emails.send({
    from: "Data Plus <onboarding@resend.dev>",
    to: [data.email],
    subject: "کد تأیید ایمیل شما",
    react: OTPEmailTemplate({ nickname: data.nickname, otp }),
  });

  const encryptedData = await encrypt(JSON.stringify(data));

  redirect(`/verify-email?data=${encodeURIComponent(encryptedData)}`);
}

export async function resendOTP({ email, nickname }: ResendOTPPayload) {
  if (!email) {
    throw Error("ایمیل ارسال نشده است.");
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw Error("کاربر یافت نشده است.");
  }

  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  console.log(otp);

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: otp.toString(),
      expires,
    },
  });

  await resend.emails.send({
    from: "Data Plus <onboarding@resend.dev>",
    to: [email],
    subject: "کد تأیید ایمیل شما (دوباره ارسال شده)",
    react: OTPEmailTemplate({
      nickname: nickname || "کاربر",
      otp,
    }),
  });

  return { message: "کد جدید ارسال شد." };
}

export async function verifyEmail(payload: VerifyEmailPayload) {
  const { email, otp } = payload;

  if (!email || !otp) {
    throw Error("ایمیل یا کد اعتبارسنجی ارسال نشده است.");
  }

  const token = await prisma.verificationToken.findUnique({
    where: {
      identifier_token: {
        identifier: email,
        token: otp,
      },
    },
  });

  if (!token || token.expires < new Date()) {
    throw Error("کد تأیید نامعتبر یا منقضی شده است.");
  }

  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: email,
        token: otp,
      },
    },
  });

  return { message: "ثبت نام با موفقیت انجام شد." };
}

export async function checkPassword({ id, password }: CheckPasswordPayload) {
  if (!password || !id) throw Error("اطلاعات لازم ارسال نشده است.");

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) throw Error("کاربر یافت نشد.");

  const isValid = await compare(password, user.password || "");

  if (!isValid) throw Error("رمز عبور فعلی نادرست است.");

  return { message: "پس از اعمال تغییرات، آن‌ها را ذخیره کنید" };
}

export async function updateUser(payload: UpdateUserPayload) {
  const { id, nickName, newPassword } = payload;

  if (!id || !nickName?.trim()) {
    throw Error("اطلاعات به درستی وارد نشده است.");
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw Error("کاربر یافت نشد.");
  }

  const updateData: {
    name: string;
    password?: string;
  } = {
    name: nickName.trim(),
  };

  if (newPassword) {
    updateData.password = await hash(newPassword, 12);
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: updateData,
  });

  return { message: "اطلاعات با موفقیت بروزرسانی شد." };
}

export async function toggleFavorite(id: string) {
  const analysis = await prisma.analysis.findUnique({
    where: { id },
  });

  if (!analysis) {
    throw new Error("Analysis not found");
  }

  await prisma.analysis.update({
    where: { id },
    data: {
      isFavorite: !analysis.isFavorite,
    },
  });

  revalidatePath("/dashboard/analyses");
  revalidatePath(`/dashboard/analyses/${id}`);
}

export async function deleteAnalysis(id: string) {
  const analysis = await prisma.analysis.findUnique({
    where: {
      id,
    },
  });

  if (!analysis) {
    throw new Error("تحلیل یافت نشد.");
  }

  await prisma.analysis.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/analyses");
  revalidatePath(`/dashboard/analyses/${id}`);
}

export async function deleteAccount(userId: string) {
  if (!userId) throw Error("شناسه کاربر ارسال نشده است.");

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw Error("کاربر یافت نشد.");

  await prisma.user.delete({
    where: { id: userId },
  });

  return { message: "حساب کاربری با موفقیت حذف شد." };
}

export async function createAnalysis(formData: FormData) {
  const session = await auth();

  if (!session?.user?.id) throw Error("اطلاعات کاربر یافت نشد.");

  const file = formData.get("file") as File;

  if (!file) throw Error("فایل یافت نشد.");

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
    data,
    analysisId: analysis.id,
  });

  return {
    message: "انتقال به صفحه تحلیل",
    id: analysis.id,
  };
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
          // Statistical properties
          mean: role.columnStats?.mean,
          median: role.columnStats?.median,
          variance: role.columnStats?.variance,
          stdDev: role.columnStats?.stdDev,
          skewness: role.columnStats?.skewness,
          kurtosis: role.columnStats?.kurtosis,
          min: role.columnStats?.min,
          max: role.columnStats?.max,
          range: role.columnStats?.range,
          q1: role.columnStats?.q1,
          q3: role.columnStats?.q3,
          iqr: role.columnStats?.iqr,
          // Data quality metrics
          completeness: role.quality?.completeness,
          cardinalityRatio: role.quality?.cardinalityRatio,
          hasOutliers: role.quality?.hasOutliers,
          outlierCount: role.quality?.outlierCount,
          outlierPercentage: role.quality?.outlierPercentage,
          isSkewed: role.quality?.isSkewed,
          isNormal: role.quality?.isNormal,
          dataDensity: role.quality?.dataDensity,
        },
      });
    });

    const charts = generateCharts(roles, data);

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

      if (builtChart?.data.length) {
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
      } else {
        await prisma.chart.delete({
          where: {
            id: generatedChart.id,
          },
        });
      }
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
      },
    });
  } catch (error) {
    console.log(error);
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
