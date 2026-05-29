"use client";

import { Button } from "@heroui/react";
import { PlusIcon, UploadIcon } from "lucide-react";
import Link from "next/link";

export const NewAnalysis = () => {
  return (
    <div className="space-x-4">
      <Button
        size="lg"
        variant="tertiary"
        className="bg-foreground text-background hover:bg-foreground/90 text-xl transition-colors"
      >
        <Link
          href="/dashboard/upload"
          className="flex flex-row items-center gap-2"
        >
          بارگذاری دیتاست <UploadIcon />
        </Link>
      </Button>
      <Button size="lg" variant="tertiary" className="text-foreground text-xl">
        <Link
          href="dashboard/analyses"
          className="flex flex-row items-center gap-2"
        >
          شروع تحلیل جدید <PlusIcon />
        </Link>
      </Button>
    </div>
  );
};
