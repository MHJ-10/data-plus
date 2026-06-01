"use client";

import { resendOTP, verifyEmail } from "@/data";
import { SignupPayload } from "@/data/interface";
import { decrypt } from "@/lib/encrypt";
import { Button, Card, InputOTP, toast } from "@heroui/react";
import { MailIcon, MoveRightIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

const VerifyEmail = ({ encryptedData }: { encryptedData?: string }) => {
  const [userData, setUserData] = useState<SignupPayload | null>(null);
  const [timer, setTimer] = useState(120);
  const otpRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const router = useRouter();

  const [isVerifyPending, startVerifyTransition] = useTransition();

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
        setUserData(JSON.parse(stringifedData));
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
      const { email, password } = userData;
      startVerifyTransition(async () => {
        await verifyEmail({ email, otp, password })
          .then(async (res) => {
            await signIn("credentials", {
              redirect: false,
              email,
              password,
            });
            toast.success(res.message);
            router.push("/dashboard");
          })
          .catch((err) => toast.danger(err.message));
      });
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
            isDisabled={isVerifyPending}
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
            isPending={isResendPending || isVerifyPending}
            isDisabled={timer > 0 || isResendPending || isVerifyPending}
            onPress={handleResendOTP}
          >
            {timer > 0 ? `ارسال مجدد (${timer}s)` : "ارسال مجدد"}
          </Button>
        </Card.Content>
        <Card.Footer className="border-border w-full border-t">
          <Button
            variant="ghost"
            className="mx-auto mt-2 font-bold"
            isPending={isVerifyPending || isResendPending}
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
