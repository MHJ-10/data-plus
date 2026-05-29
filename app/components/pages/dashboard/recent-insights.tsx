"use client";

import { Insight } from "@/generated/prisma/client";
import { Card } from "@heroui/react";
import { LightbulbIcon } from "lucide-react";

const aiInsights = [
  {
    title: "شناسایی اوج درآمد",
    description: "درآمد ماه آوریل نسبت به مارس، ۶۷٪ افزایش داشته است",
  },
  {
    title: "پیشتازی دسته الکترونیک",
    description:
      "دسته الکترونیک با میانگین ۴٬۲۰۰ دلار، بالاترین ارزش تراکنش را دارد",
  },
  {
    title: "هشدار داده‌های ناقص",
    description: "۳٪ از مقادیر ستون موجودی در آخرین دیتاست ناقص هستند",
  },
];

export const RecentInsights = ({ insights }: { insights?: Insight[] }) => {
  return (
    <Card className="border">
      <Card.Header>
        <p className="text-foreground text-2xl font-semibold">
          تحلیل‌های هوشمند
        </p>
      </Card.Header>
      <Card.Content className="grid gap-8 md:grid-cols-3">
        {insights?.map((insight) => (
          <Card key={insight.id} variant="tertiary" className="p-5">
            <div className="flex items-start gap-3">
              <div className="bg-foreground/10 rounded-xl p-2">
                <LightbulbIcon className="text-foreground size-5" />
                <p>{insight.type}</p>
              </div>
              <div className="flex-1">
                <h3 className="text-foreground text-xl font-semibold">
                  {insight.title}
                </h3>
                <p className="text-muted text-lg">{insight.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </Card.Content>
    </Card>
  );
};
