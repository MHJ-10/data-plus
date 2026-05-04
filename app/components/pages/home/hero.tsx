"use client";

import { Button } from "@heroui/react";
import { LogInIcon, UploadIcon } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="mx-auto flex flex-col gap-8">
      <h1 className="text-center text-5xl font-bold md:text-6xl">
        تبدیل داده‌های خام به بینش‌های قابل‌استفاده{" "}
        <span className="from-accent/50 to-accent/70 bg-linear-to-l bg-clip-text text-transparent">
          در
        </span>
        <br className="hidden lg:block" />
        <span className="from-accent/70 to-accent bg-linear-to-l bg-clip-text text-transparent">
          چند ثانیه
        </span>
      </h1>

      <p className="text-center text-xl text-muted md:text-2xl">
        فایل‌های CSV را آپلود کنید و بلافاصله نمودارها و تحلیل‌های کاربردی
        دریافت کنید. <br /> بدون کدنویسی، بدون دردسر—فقط بکشید، رها کنید و شروع
        به کشف کنید.
      </p>

      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
        <Button size="lg" variant="primary">
          <Link href="/dashboard/upload" className="flex gap-2">
            آپلود دیتاست
            <UploadIcon className="animate-bounce" />
          </Link>
        </Button>
        <Button size="lg" variant="tertiary">
          <Link href="/login" className="flex gap-2">
            ورود به حساب کاربری
            <LogInIcon />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
