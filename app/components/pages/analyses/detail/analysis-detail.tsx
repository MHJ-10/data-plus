"use client";

import ChartCard from "@/components/ui/chart-card";
import { Prisma } from "@/generated/prisma/client";
import { ChartType } from "@/utils/chart-candidate";
import { Button, Card } from "@heroui/react";
import { clsx } from "clsx";
import {
  ArrowRightIcon,
  CalendarIcon,
  Columns3Icon,
  DatabaseIcon,
  StarIcon,
} from "lucide-react";
import { ColumnsMetadataTable } from "./columns-metadata-table";
import { PreviewTable } from "./preview-table";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toggleFavorite } from "@/data/actions";
import { EmptyState } from "@/components";
import { InsufficientDataIllustrationIcon } from "@/components/icons";

type AnalysisWithRelations = Prisma.AnalysisGetPayload<{
  include: {
    charts: true;
    columnMetadata: true;
    insights: true;
  };
}>;

interface AnalysisDetailProps {
  analysis: AnalysisWithRelations;
}

const AnalysisDetail = ({ analysis }: AnalysisDetailProps) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const onFavoriteButtonClick = (id: string) => {
    startTransition(async () => {
      await toggleFavorite(id);
    });
  };

  return (
    <div className="space-y-8">
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
                {analysis.createdAt.toLocaleDateString("fa-IR", {
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

      {!analysis.charts.length && !analysis.insights.length ? (
        <EmptyState
          title="داده کافی برای تولید نتایج وجود ندارد"
          description="دیتاست آپلودشده اطلاعات کافی برای تولید نمودارها یا بینش‌های هوش مصنوعی را ندارد. لطفاً دیتاستی با تعداد سطرها و ستون‌های بیشتر بارگذاری کنید."
          illustration={<InsufficientDataIllustrationIcon />}
        />
      ) : (
        <>
          <Card className="border bg-transparent">Insights</Card>

          <h3 className="mb-4 text-2xl font-bold">نمودارهای ایجادشده</h3>
          <div className="grid gap-5 lg:grid-cols-2">
            {analysis.charts.map((chart) => (
              <ChartCard
                key={chart.title}
                title={chart.title}
                types={chart.availableTypes as ChartType[]}
                data={chart.chartData as Record<string, string | number>[]}
                nameKey={chart.xField || "name"}
              />
            ))}
          </div>
        </>
      )}

      <PreviewTable
        data={
          (analysis.datasetPreview as Record<string, string | number>[]) || []
        }
      />

      <ColumnsMetadataTable data={analysis.columnMetadata} />
    </div>
  );
};

export default AnalysisDetail;
