import { OTPEmailTemplate } from "@/components";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "Data Plus <dataplus@gmail.com>",
      to: ["mhj10mhj10jafari@gmail.com"],
      subject: "رمز یکبار مصرف برای ورود",
      react: OTPEmailTemplate({
        nickname: "MHJ10",
        otp: 223242,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
