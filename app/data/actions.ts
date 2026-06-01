"use server";

import { OTPEmailTemplate } from "@/components";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { createUserSchema } from "./schema";
import { redirect } from "next/navigation";
import { encrypt } from "@/lib/encrypt";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createUser(_: any, formData: FormData) {
  const { data, error } = createUserSchema.safeParse({
    nickname: formData.get("nickname"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (error) {
    return {
      error: "لطفاً تمام فیلدها را پر کنید.",
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return {
      error: "این ایمیل قبلاً ثبت شده است.",
    };
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
