import prisma from "@/lib/prisma";
import { DeleteAccountRequest } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { body } = await req.json();
  const { id } = body as DeleteAccountRequest;

  if (!id) {
    return NextResponse.json(
      { error: "شناسه کاربر ارسال نشده است." },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return NextResponse.json(
      {
        error: "کاربر یافت نشد.",
      },
      { status: 404 },
    );
  }

  await prisma.user.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}
