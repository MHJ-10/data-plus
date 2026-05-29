"use client";

import { Prisma } from "@/generated/prisma/client";
import { AnalysesTable } from "./analyses-table";
import { Filter } from "./filter";

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
  return (
    <div className="space-y-8">
      <div>
        <p className="text-foreground text-3xl font-bold">تحلیل‌ها</p>
        <p className="text-muted text-xl font-semibold">
          دیتاست‌های آپلودشده خود را مدیریت و بررسی کنید
        </p>
      </div>

      <Filter />

      <AnalysesTable analyses={analyses} total={total} />
    </div>
  );
};

export default Analyses;
