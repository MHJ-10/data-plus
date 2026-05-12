"use client";

import { useState } from "react";
import { Button, Card, InputOTP } from "@heroui/react";
import { MailIcon, MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const email = searchParams.get("email") ?? "";

  

  const verifyCode = async (value: string) => {
    if (!email) {
      setError("آدرس ایمیل یافت نشد. لطفاً دوباره ثبت‌نام کنید.");
      return;
    }

    setError(null);
    setIsLoading(true);

    const response = await fetch("/api/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: value }),
    });

    const result = await response.json();
    setIsLoading(false);

    if (!response.ok) {
      setError(result.error || "کد تأیید نامعتبر است.");
      return;
    }

    router.push("/dashboard");
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
          <InputOTP maxLength={6} variant="secondary" onComplete={verifyCode}>
            <InputOTP.Group dir="ltr">
              <InputOTP.Slot index={0} />
              <InputOTP.Slot index={1} />
              <InputOTP.Slot index={2} />
              <InputOTP.Slot index={3} />
              <InputOTP.Slot index={4} />
              <InputOTP.Slot index={5} />
            </InputOTP.Group>
          </InputOTP>

          {error && (
            <p className="text-danger text-lg font-semibold">{error}</p>
          )}
          {isLoading && (
            <p className="text-muted text-lg font-semibold">
              در حال بررسی کد...
            </p>
          )}

          <p className="text-muted mt-2 text-xl font-semibold">
            کد را دریافت نکرده‌اید؟
          </p>
          <Button className="mx-auto font-bold" variant="ghost" size="lg">
            ارسال مجدد
          </Button>
        </Card.Content>
        <Card.Footer className="border-border w-full border-t">
          <Button variant="ghost" className="mx-auto mt-2 font-bold">
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
