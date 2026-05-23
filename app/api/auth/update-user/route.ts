import prisma from "@/lib/prisma";
import { UpdateUserRequest } from "@/services";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { body } = await req.json();

  const { id, nickName, newPassword } = body as UpdateUserRequest;

  if (!id || !nickName?.trim()) {
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
    return NextResponse.json(
      {
        error: "کاربر یافت نشد.",
      },
      { status: 404 },
    );
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

  const res = await prisma.user.update({
    where: {
      id,
    },
    data: updateData,
  });

  console.log(res)

  return NextResponse.json({ ok: true });
}
