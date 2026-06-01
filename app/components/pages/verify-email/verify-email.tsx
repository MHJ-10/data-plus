"use client";

import { Button, Card, InputOTP, toast } from "@heroui/react";
import { MailIcon, MoveRightIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignupRequest, useVerifyEmail } from "@/services";
import { decrypt } from "@/lib/encrypt";
import { signIn } from "next-auth/react";
import { useEffect, useRef, useState, useTransition } from "react";
import { resendOTP } from "@/data";

const VerifyEmail = ({ encryptedData }: { encryptedData?: string }) => {
  const [userData, setUserData] = useState<SignupRequest | null>(null);
  const [timer, setTimer] = useState(20);
  const otpRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  const { mutate, isPending } = useVerifyEmail();

  const [isResendPending, startResendTransition] = useTransition();

  const startTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    const getUserData = async () => {
      if (encryptedData) {
        const stringifedData = await decrypt(decodeURIComponent(encryptedData));
        setUserData(JSON.parse(stringifedData) as SignupRequest);
      }
    };
    getUserData();
  }, [encryptedData]);

  useEffect(() => {
    if (otpRef.current) {
      otpRef.current.focus();
    }
    startTimer();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const verifyCode = async (otp: string) => {
    if (userData) {
      mutate(
        { email: userData.email, otp },
        {
          onSuccess: async () => {
            await signIn("credentials", {
              redirect: false,
              email: userData.email,
              password: userData.password,
            });
            toast.success("ثبت نام با موفقیت انجام شد.");
            router.push("/dashboard");
          },
        },
      );
    }
  };

  const handleResendOTP = () => {
    if (userData && timer === 0) {
      const { email, nickname } = userData;

      startResendTransition(async () => {
        await resendOTP({ email, nickname })
          .then((res) => {
            toast.success(res.message);
            setTimer(120);
            startTimer();
          })
          .catch((err) => toast.danger(err.message));
      });
    }
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
          <p className="text-foreground min-h-7 text-xl font-semibold break-all">
            {userData?.email}
          </p>
          <InputOTP
            maxLength={6}
            variant="secondary"
            onComplete={verifyCode}
            isDisabled={isPending}
            ref={otpRef}
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
            isPending={isResendPending}
            isDisabled={timer > 0 || isResendPending}
            onPress={handleResendOTP}
          >
            {timer > 0 ? `ارسال مجدد (${timer}s)` : "ارسال مجدد"}
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
