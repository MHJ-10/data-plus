"use client";

import { Card, Skeleton } from "@heroui/react";
import { LockIcon } from "lucide-react";
import Image from "next/image";
import { SignupForm } from "./signup-form";

const Signup = () => {
  return (
    <div className="container mx-auto flex h-screen w-full items-center justify-center px-4">
      <div className="grid w-full grid-cols-1 place-items-center gap-15 lg:grid-cols-5">
        <Card className="flex w-full flex-col items-center border p-10 lg:col-span-2">
          <Card.Header className="flex flex-col items-center gap-4">
            <Image
              src="/logo.png"
              alt="data plus logo"
              width={50}
              height={50}
            />
            <h3 className="text-foreground text-center text-3xl font-bold">
              ایجاد حساب کاربری <br />
              <span className="text-muted text-xl font-medium">
                تحلیل دیتاست‌های خود را همین حالا شروع کنید
              </span>
            </h3>
          </Card.Header>
          <Card.Content className="w-full">
            <SignupForm />
          </Card.Content>
          <Card.Footer className="border-muted/30 text-muted border-t pt-4">
            <p className="text-muted flex items-center gap-2 text-xs">
              <LockIcon className="size-4" />
              اطلاعات شما به‌صورت امن و رمزنگاری‌شده نگهداری می‌شود
            </p>
          </Card.Footer>
        </Card>

        <Card
          className="hidden lg:col-span-3 lg:flex lg:justify-center"
          variant="transparent"
        >
          <Card.Header className="text-start">
            <h3 className="text-foreground text-4xl font-bold">
              داده‌ها را به تصمیم‌های هوشمند تبدیل کنید <br />
              <span className="text-muted text-2xl font-medium">
                فایل‌های خود را در لحظه تحلیل کنید و نمودارهای زیبا و insightهای
                کاربردی دریافت کنید.
              </span>
            </h3>
          </Card.Header>

          <Card.Content className="relative">
            <div className="from-muted/10 to-accent/10 absolute inset-0 rounded-2xl bg-linear-to-tr blur-xl" />
            <div className="border-border bg-background shadow-foreground/10 relative rounded-2xl border p-6 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="bg-danger size-3 rounded-full" />
                  <div className="bg-warning size-3 rounded-full" />
                  <div className="bg-success size-3 rounded-full" />
                </div>
                <div className="shadow-panel w-full space-y-5 rounded-lg p-4">
                  <Skeleton
                    animationType="shimmer"
                    className="h-3 w-3/4 rounded-lg"
                  />
                  <Skeleton
                    animationType="shimmer"
                    className="h-3 w-1/2 rounded-lg"
                  />
                  <Skeleton
                    animationType="shimmer"
                    className="h-3 w-1/3 rounded-lg"
                  />
                  <Skeleton
                    animationType="shimmer"
                    className="h-32 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
