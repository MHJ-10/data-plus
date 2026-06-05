"use client";

import { Prisma } from "@/generated/prisma/client";
import { AnalysesTable } from "./analyses-table";
import { Filter } from "./filter";
import { EmptyState } from "@/components";
import { EmptyTableIllustrationIcon } from "@/components/icons";
import { Button } from "@heroui/react";
import axios from "axios";

type AnalysisWithRelations = Prisma.AnalysisGetPayload<{
  include: {
    charts: true;
  };
}>;

export interface AnalysesProps {
  analyses: AnalysisWithRelations[];
  total: number;
}

const Analyses = ({ analyses, total }: AnalysesProps) => {
  const getInsight = async () => {
    await axios
      .get("/api/ai")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-foreground text-3xl font-bold">تحلیل‌ها</p>
        <p className="text-muted text-xl font-semibold">
          دیتاست‌های آپلودشده خود را مدیریت و بررسی کنید
        </p>
      </div>

      <Button onClick={getInsight}>Generate Insight</Button>

      {analyses.length ? (
        <>
          <Filter />
          <AnalysesTable analyses={analyses} total={total} />
        </>
      ) : (
        <EmptyState
          title="هنوز تحلیلی برای نمایش وجود ندارد"
          description="دیتاست‌های خود را آپلود کنید و تحلیل را آغاز کنید تا نتایج اینجا ظاهر شوند."
          illustration={<EmptyTableIllustrationIcon />}
          primaryAction={{ label: "آپلود دیتاست", href: "/dashboard/upload" }}
        />
      )}
    </div>
  );
};

export default Analyses;
