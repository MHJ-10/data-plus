import { InsightType, Prisma } from "@/generated/prisma/client";
import { useCompletion } from "@ai-sdk/react";
import { Button, Card } from "@heroui/react";
import { AlertTriangleIcon, LightbulbIcon, TrendingUpIcon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const insightTypeMap: Record<
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

export const InsightsCard = () => {
  const { completion, handleSubmit, isLoading, setInput } = useCompletion({
    api: "/api/ai",
  });

  const params = useParams();
  const analysisId = params.id as string;

  useEffect(() => {
    if (analysisId) {
      setInput(analysisId);
    }
  }, []);

  // console.log(JSON?.parse(completion));

  return (
    <div>
      <form
        className="flex gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <Button type="submit">Click</Button>
      </form>

      <Card className="border bg-transparent">
        <Card.Header className="mb-4 text-2xl font-bold">
          تحلیل‌های هوشمند
        </Card.Header>
        {Array.isArray(completion)
          ? completion.map((insight) => (
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
            ))
          : null}
      </Card>

      {isLoading && <p>Loading...</p>}
    </div>
  );
};
