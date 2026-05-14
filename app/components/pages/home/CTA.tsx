"use client";

import { Button } from "@heroui/react";
import { UploadIcon } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <div className="from-success/50 via-accent/50 to-warning/50 bg-linear-to-br px-4 py-20">
      <div className="container mx-auto flex flex-col items-center justify-center gap-16">
        <h3 className="text-foreground text-center text-6xl font-bold">
          همین حالا تحلیل داده‌های خود را شروع کنید
          <br />
          <span className="text-foreground/80 text-3xl font-normal">
            اولین دیتاست خود را آپلود کنید و در چند ثانیه به بینش‌های ارزشمند
            برسید.
          </span>
        </h3>

        <Button size="lg" variant="secondary">
          <Link href="/dashboard/upload" className="flex gap-2 text-2xl">
            دیتاست را آپلود کنید <UploadIcon className="animate-bounce" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CTA;
