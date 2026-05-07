import { Button } from "@heroui/react";
import { UploadIcon } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <div className="from-success/60 via-accent to-success/60 bg-linear-to-bl px-8 py-20">
      <div className="container mx-auto flex flex-col items-center justify-center gap-16">
        <h3 className="text-background text-center text-6xl font-bold">
          همین حالا تحلیل داده‌های خود را شروع کنید
          <br />
          <span className="text-background/80 text-3xl font-normal">
            اولین دیتاست خود را آپلود کنید و در چند ثانیه به بینش‌های ارزشمند
            برسید.
          </span>
        </h3>

        <Button size="lg" variant="secondary">
          <Link href="/dashabord/upload" className="flex gap-2 text-2xl">
            دیتاست را آپلود کنید <UploadIcon className="animate-bounce" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CTA;
