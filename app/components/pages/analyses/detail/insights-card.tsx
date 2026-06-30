"use client";

import { Insight, InsightType } from "@/generated/prisma/client";
import { useCompletion } from "@ai-sdk/react";
import { Card } from "@heroui/react";
import { AlertTriangleIcon, LightbulbIcon, TrendingUpIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { InsightsSkeleton } from "./loading";

export const insightTypeMap: Record<
  InsightType,
  { icon: React.ReactNode; color: string }
> = {
  INSIGHT: {
    icon: <LightbulbIcon />,
    color: "from-blue-500 to-blue-600",
  },
  CORRELATION: {
    icon: <TrendingUpIcon />,
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

  const { completion, handleSubmit, isLoading, setInput } = useCompletion({
    api: "/api/ai",
  });

  useEffect(() => {
    if (!insights?.length && analysisId) {
      setInput(analysisId);
      handleSubmit();
    }
  }, [insights, handleSubmit, analysisId, setInput]);

  if (!insights?.length && !isLoading) return null;

  return (
    <div>
      {isLoading || (!insights?.length && !completion) ? (
        <InsightsSkeleton />
      ) : (
        <Card className="border bg-transparent">
          <Card.Header className="mb-4 text-2xl font-bold">
            تحلیل‌های هوشمند
          </Card.Header>
          <div className="grid gap-5 lg:grid-cols-2 2xl:grid-cols-4">
            {(insights?.length
              ? insights
              : JSON.parse(completion).insights
            ).map((insight: Insight) => (
              <Card key={insight.title} variant="tertiary" className="p-5">
                <div className="flex items-start gap-3">
                  <div
                    className={`text-background rounded-xl bg-linear-to-r p-2 ${insightTypeMap[insight.type as InsightType].color}`}
                  >
                    {insightTypeMap[insight.type as InsightType].icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-foreground text-xl font-semibold">
                      {insight.title}
                    </h3>
                    <p className="text-muted max-h-50 p-4 text-lg">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
