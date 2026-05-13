import prisma from "@/lib/prisma";
import { ResendOTPRequest } from "@/services";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { OTPEmailTemplate } from "../../../components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { body } = await req.json();
  const { email, nickname } = body as ResendOTPRequest;

  if (!email) {
    return NextResponse.json(
      { error: "ایمیل ارسال نشده است." },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { error: "کاربر یافت نشده است." },
      { status: 404 },
    );
  }

  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token: otp.toString(),
      expires,
    },
  });

  // Send email
  await resend.emails.send({
    from: "Data Plus <onboarding@resend.dev>",
    to: [email],
    subject: "کد تأیید ایمیل شما (دوباره ارسال شده)",
    react: OTPEmailTemplate({
      nickname: nickname || "کاربر",
      otp,
    }),
  });

  return NextResponse.json({ ok: true });
}
