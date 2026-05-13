import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { OTPEmailTemplate } from "../../../components/email-template";
import { SignupRequest } from "@/services";
import { hash } from "bcryptjs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { body } = await req.json();
  const { nickname, email, password } = body as SignupRequest;

  if (!nickname || !email || !password) {
    return NextResponse.json(
      { error: "لطفاً تمام فیلدها را پر کنید." },
      { status: 400 },
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "این ایمیل قبلاً ثبت شده است." },
      { status: 409 },
    );
  }

  const hashedPassword = await hash(password, 12);
  await prisma.user.create({
    data: {
      name: nickname,
      email,
      password: hashedPassword,
    },
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

  await resend.emails.send({
    from: "Data Plus <onboarding@resend.dev>",
    to: [email],
    subject: "کد تأیید ایمیل شما",
    react: OTPEmailTemplate({ nickname, otp }),
  });

  return NextResponse.json({ ok: true });
}
