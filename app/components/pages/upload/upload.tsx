"use client";
import { Faq } from "./faq";
import { Features } from "./features";
import { UploadCard } from "./upload-card";

const Upload = () => {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-foreground text-3xl font-bold">آپلود دیتاست</p>
        <p className="text-muted text-xl font-semibold">
          دیتاست خود را بارگذاری کنید و بینش‌های هوشمند را به‌صورت خودکار دریافت
          کنید
        </p>
      </div>

      <Features />

      <UploadCard />

      <Faq />
    </div>
  );
};

export default Upload;
