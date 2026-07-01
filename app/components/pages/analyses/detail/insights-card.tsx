"use client";

import { addInsights } from "@/data";
import { Insight, InsightType } from "@/generated/prisma/client";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { Card } from "@heroui/react";
import {
  AlertTriangleIcon,
  GitMergeIcon,
  LightbulbIcon,
  TrendingUpIcon,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { InsightsSkeleton } from "./loading";
import { insightSchema } from "@/data/schema";

export const insightTypeMap: Record<
  InsightType,
  { icon: React.ReactNode; color: string }
> = {
  INSIGHT: {
    icon: <LightbulbIcon />,
    color: "from-blue-500 to-blue-600",
  },
  CORRELATION: {
    icon: <GitMergeIcon />,
    color: "from-purple-500 to-purple-600",
  },
  TREND: {
    icon: <TrendingUpIcon />,
    color: "from-green-500 to-green-600",
  },
  WARNING: {
    icon: <AlertTriangleIcon />,
    color: "from-orange-500 to-orange-600",
  },
};

export const InsightsCard = ({ insights }: { insights?: Insight[] }) => {
  const params = useParams();
  const analysisId = params.id as string;

  const { object, submit, isLoading } = useObject({
    api: "/api/ai",
    schema: insightSchema,
    onFinish: async (res) => {
      const generatedInsights = res.object?.insights;
      if (generatedInsights?.length) {
        await addInsights({ id: analysisId, insights: generatedInsights });
      }
    },
  });

  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current || insights?.length) return;

    startedRef.current = true;
    submit(analysisId);
  }, [analysisId, insights, submit]);

  if (isLoading && !object?.insights?.length) return <InsightsSkeleton />;

  return (
    <>
      <Card className="border bg-transparent">
        <Card.Header className="mb-4 text-2xl font-bold">
          تحلیل‌های هوشمند
        </Card.Header>
        <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-4">
          {(insights?.length ? insights : object?.insights)?.map(
            (insight, i) => (
              <Card
                key={insight?.title || i}
                variant="tertiary"
                className="p-5"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`text-background rounded-xl bg-linear-to-r p-2 ${insight?.type ? insightTypeMap[insight?.type]?.color : ""}`}
                  >
                    {insight?.type ? insightTypeMap[insight?.type]?.icon : null}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground text-xl font-semibold">
                      {insight?.title}
                    </h3>
                    <p className="text-muted max-h-50 py-4 text-lg">
                      {insight?.description}
                    </p>
                  </div>
                </div>
              </Card>
            ),
          )}
        </div>
      </Card>
    </>
  );
};
