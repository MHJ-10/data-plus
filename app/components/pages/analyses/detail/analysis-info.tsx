"use client";

import { toggleFavorite } from "@/data";
import { Analysis } from "@/generated/prisma/client";
import { Button } from "@heroui/react";
import { clsx } from "clsx";
import {
  ArrowRightIcon,
  CalendarIcon,
  Columns3Icon,
  DatabaseIcon,
  StarIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const AnalysisInfo = ({ analysis }: { analysis: Analysis }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const onFavoriteButtonClick = (id: string) => {
    startTransition(async () => {
      await toggleFavorite(id);
    });
  };
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <Button
          size="sm"
          variant="ghost"
          isIconOnly
          onClick={() => router.back()}
        >
          <ArrowRightIcon className="size-5" />
        </Button>

        <div>
          <h1 className="text-3xl font-semibold">{analysis.datasetName}</h1>
          <div className="text-muted flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <CalendarIcon className="size-4" />
              {new Date(analysis.createdAt).toLocaleDateString("fa-IR", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <DatabaseIcon className="size-4" />
              ردیف‌ها {analysis.rowsCount}
            </span>
            <span className="flex items-center gap-1">
              <Columns3Icon className="size-4" />
              ستون‌ها {analysis.columnsCount}
            </span>
          </div>
        </div>
      </div>

      <Button
        isIconOnly
        variant="ghost"
        className="group hover:bg-transparent"
        isPending={isPending}
        onClick={() => onFavoriteButtonClick(analysis.id)}
      >
        <StarIcon
          className={clsx("group-hover:text-warning size-6", {
            "fill-warning text-warning": analysis.isFavorite,
          })}
        />
      </Button>
    </div>
  );
};
