"use client";

import { Card } from "@heroui/react";
import { LockIcon } from "lucide-react";
import Image from "next/image";
import { LoginForm } from "./login-form";

const Login = ({ callbackUrl }: { callbackUrl?: string | undefined }) => {
  return (
    <div className="container mx-auto flex h-screen w-full items-center justify-center px-4">
      <div className="grid w-full grid-cols-1 place-items-center gap-15 lg:grid-cols-5">
        <Card className="flex w-full flex-col items-center border p-10 lg:col-span-2">
          <Card.Header className="flex flex-col items-center gap-4">
            <Image
              src="/logo.png"
              alt="data plus logo"
              width={60}
              height={60}
            />
            <h3 className="text-foreground text-center text-3xl font-bold">
              ورود به حساب کاربری
              <br />
              <span className="text-muted text-xl font-medium">
                برای ادامه، اطلاعات حساب خود را وارد کنید
              </span>
            </h3>
          </Card.Header>
          <Card.Content className="w-full">
            <LoginForm callbackUrl={callbackUrl} />
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
              خوش برگشتید به فضای کاری داده‌های خود
              <br />
              <span className="text-muted text-2xl font-medium">
                تحلیل و بصری‌سازی دیتاست‌های خود را با بینش‌های قدرتمند مبتنی بر
                هوش مصنوعی ادامه دهید.
              </span>
            </h3>
          </Card.Header>

          <Card.Content className="flex flex-row gap-4">
            <Card className="h-fit">
              <p className="text-foreground text-2xl font-bold">تحلیل هوشمند</p>
              <p className="text-muted text-lg font-semibold">
                پردازش خودکار و سریع دیتاست‌ها
              </p>
            </Card>
            <Card className="mt-6 h-fit">
              <p className="text-foreground text-2xl font-bold">
                بصری‌سازی پیشرفته
              </p>
              <p className="text-muted text-lg font-semibold">
                تولید نمودارهای حرفه‌ای در لحظه
              </p>
            </Card>
            <Card className="mt-12 h-fit">
              <p className="text-foreground text-2xl font-bold">
                حریم خصوصی امن
              </p>
              <p className="text-muted text-lg font-semibold">
                داده‌های شما داخل مرورگر باقی می‌مانند
              </p>
            </Card>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default Login;
