"use client";

import { EmptyState } from "@/components";
import { EmptyInsightsIllustrationIcon } from "@/components/icons";
import { Insight } from "@/generated/prisma/client";
import { Card } from "@heroui/react";
import { insightTypeMap } from "../analyses/detail/insights-card";

export const RecentInsights = ({ insights }: { insights?: Insight[] }) => {
  return (
    <Card className="border">
      <Card.Header>
        <p className="text-foreground text-2xl font-semibold">
          تحلیل‌های هوشمند
        </p>
      </Card.Header>

      {insights?.length ? (
        <Card.Content className="grid gap-8 md:grid-cols-3">
          {insights.map((insight) => (
            <Card key={insight.id} variant="tertiary" className="p-5">
              <div className="flex items-start gap-3">
                <div
                  className={`text-background rounded-xl bg-linear-to-r p-2 ${insightTypeMap[insight.type].color}`}
                >
                  {insightTypeMap[insight.type].icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground mb-2 text-xl font-semibold">
                    {insight.title}
                  </h3>
                  <p className="text-muted text-lg">{insight.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </Card.Content>
      ) : (
        <EmptyState
          title="هنوز بینشی در دسترس نیست"
          description="پس از تحلیل داده‌ها، یافته‌ها، روندها و پیشنهادهای تولیدشده توسط هوش مصنوعی در اینجا نمایش داده خواهند شد."
          illustration={<EmptyInsightsIllustrationIcon />}
          primaryAction={{ label: "آپلود دیتاست", href: "/dashboard/upload" }}
        />
      )}
    </Card>
  );
};
