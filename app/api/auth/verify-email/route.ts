import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { VerifyEmailRequest } from "@/services";

export async function POST(req: NextRequest) {
  const { body } = await req.json();
  const { email, otp } = body as VerifyEmailRequest;

  if (!email || !otp) {
    return NextResponse.json(
      { error: "ایمیل یا کد اعتبارسنجی ارسال نشده است." },
      { status: 400 },
    );
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
    return NextResponse.json(
      { error: "کد تأیید نامعتبر یا منقضی شده است." },
      { status: 400 },
    );
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

  return NextResponse.json({ ok: true });
}
