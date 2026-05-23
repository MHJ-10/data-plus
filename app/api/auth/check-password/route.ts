import prisma from "@/lib/prisma";
import { CheckPasswordRequest } from "@/services";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { body } = await req.json();
  const { password, id } = body as CheckPasswordRequest;

  if (!password || !id) {
    return NextResponse.json(
      {
        error: "اطلاعات به درستی وارد نشده است.",
      },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "کاربر یافت نشد." }, { status: 400 });
  }

  const isValid = await compare(password, user.password || "");

  if (!isValid) {
    return NextResponse.json(
      { error: "رمز عبور فعلی نادرست است." },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
