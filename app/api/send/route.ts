import { OTPEmailTemplate } from "../../components/email-template";
import { NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "Data Plus <onboarding@resend.dev>",
      to: [body.email],
      subject: "رمز یکبار مصرف برای ورود",
      react: OTPEmailTemplate({
        nickname: body.nickname,
        otp: body.otp,
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
