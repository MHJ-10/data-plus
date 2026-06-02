"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export const Navigation = () => {
  const router = useRouter();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 flex flex-wrap justify-center gap-4 delay-400 duration-700">
      <Button
        variant="primary"
        size="lg"
        onClick={() => router.replace("/dashboard")}
      >
        بازگشت به پیشخوان
      </Button>
      <Button variant="tertiary" size="lg" onClick={() => router.back()}>
        بازگشت به صفحه قبل
      </Button>
    </div>
  );
};
