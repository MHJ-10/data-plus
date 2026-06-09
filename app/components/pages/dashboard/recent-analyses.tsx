"use client";

import { Prisma } from "@/generated/prisma/client";
import { Card, Chip } from "@heroui/react";
import { ArrowLeftIcon, BarChart3Icon } from "lucide-react";
import Link from "next/link";
import { analysisStatusMap } from "../analyses/analyses-table";
import { EmptyAnalysesIllustrationIcon } from "@/components/icons";
import { EmptyState } from "@/components";

export type AnalysisWithRelations = Prisma.AnalysisGetPayload<{
  include: {
    charts: {
      select: { id: true };
    };
  };
}>;

export const RecentAnalyses = ({
  analyses,
}: {
  analyses?: AnalysisWithRelations[];
}) => {
  return (
    <Card className="border p-6">
      <Card.Header className="flex flex-row items-center justify-between">
        <p className="text-foreground text-2xl font-semibold">تحلیل های‌اخیر</p>
        {analyses?.length ? (
          <Link
            href="/dashboard/analyses"
            className="text-foreground text-lg hover:underline"
          >
            مشاهده همه
          </Link>
        ) : null}
      </Card.Header>
      <Card.Content>
        {analyses?.length ? (
          analyses.map((analysis) => (
            <div
              key={analysis.id}
              className="hover:bg-background/70 group flex items-center justify-between rounded-2xl p-4 transition-colors"
            >
              <div className="flex-1">
                <p className="text-foreground text-lg font-medium">
                  {analysis.datasetName}
                </p>
                <div className="text-muted flex items-center gap-4 text-sm">
                  <span className="text-muted">
                    {new Date(analysis.createdAt).toLocaleString("fa-IR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-muted flex items-center gap-1">
                    <BarChart3Icon className="h-4 w-4" />
                    {analysis.charts.length} چارت
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Chip
                  color={analysisStatusMap[analysis.status].color}
                  size="lg"
                  variant="soft"
                >
                  {analysisStatusMap[analysis.status].label}
                </Chip>

                {analysis.status === "COMPLETED" ? (
                  <Link
                    href={`dashboard/analyses/${analysis.id}`}
                    className="text-foreground opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <ArrowLeftIcon className="size-5" />
                  </Link>
                ) : (
                  <p className="size-5"></p>
                )}
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            illustration={<EmptyAnalysesIllustrationIcon />}
            title="هنوز تحلیلی انجام نشده است"
            description="پس از آپلود و پردازش دیتاست‌ها، تحلیل‌های شما اینجا نمایش داده می‌شوند."
            primaryAction={{ label: "آپلود دیتاست", href: "/dashboard/upload" }}
          />
        )}
      </Card.Content>
    </Card>
  );
};
