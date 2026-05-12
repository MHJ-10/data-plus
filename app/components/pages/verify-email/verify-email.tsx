"use client";

import { Button, Card, InputOTP, toast } from "@heroui/react";
import { MailIcon, MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyEmail } from "@/services";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const router = useRouter();

  const { mutate, isPending } = useVerifyEmail();

  const verifyCode = async (otp: string) => {
    mutate(
      { email, otp },
      {
        onError: (error) => {
          console.log(error);
          toast.danger("کد تأیید نامعتبر است.");
        },
        onSuccess: () => {
          toast.success("ثبت نام با موفقیت انجام شد.");
          router.push("/dashboard");
        },
      },
    );
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="flex flex-col items-center gap-4 border px-20 py-8">
        <Card.Header className="w-fit">
          <Card variant="tertiary">
            <MailIcon className="text-foreground size-8" />
          </Card>
        </Card.Header>
        <Card.Content className="space-y-2 text-center">
          <p className="text-foreground text-4xl font-bold">تأیید ایمیل</p>
          <p className="text-muted text-xl font-semibold">
            کد تأیید ۶ رقمی به این ایمیل ارسال شد:
          </p>
          <p className="text-foreground text-xl font-semibold break-all">
            {email || "ایمیل یافت نشد"}
          </p>
          <InputOTP
            maxLength={6}
            variant="secondary"
            onComplete={verifyCode}
            isDisabled={isPending}
          >
            <InputOTP.Group dir="ltr">
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
              <InputOTP.Slot index={4} />
              <InputOTP.Slot index={5} />
            </InputOTP.Group>
          </InputOTP>

          <p className="text-muted mt-2 text-xl font-semibold">
            کد را دریافت نکرده‌اید؟
          </p>
          <Button
            className="mx-auto font-bold"
            variant="ghost"
            size="lg"
            isPending={isPending}
          >
            ارسال مجدد
          </Button>
        </Card.Content>
        <Card.Footer className="border-border w-full border-t">
          <Button
            variant="ghost"
            className="mx-auto mt-2 font-bold"
            isPending={isPending}
          >
            <Link href="/signup" replace className="flex items-center gap-2">
              <MoveRightIcon /> بازگشت به صفحه ثبت‌نام
            </Link>
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default VerifyEmail;
