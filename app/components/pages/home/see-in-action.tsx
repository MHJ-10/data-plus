"use client";

import ChartCard from "@/components/chart-card";
import { ChartType } from "@/utils/chart-candidate";
import { Card, Surface } from "@heroui/react";
import { DatabaseIcon, InfoIcon, TrendingUpIcon } from "lucide-react";

const items = [
  {
    title: "رشد ۶۹٪ درآمد",
    description:
      "با مقایسه سه‌ماهه اول و دوم ۲۰۲۶، روند رشد ماه‌به‌ماه به‌صورت پیوسته مشاهده می‌شود",
    icon: <TrendingUpIcon />,
  },
  {
    title: "اوج در آوریل",
    description: "بیشترین درآمد ثبت‌شده: ۶٬۲۰۰ دلار با ۳۴۰ کاربر فعال",
    icon: <InfoIcon />,
  },
  {
    title: "پیشتازی الکترونیک",
    description: "دسته برتر با سهم ۳۶٪ از بازار، پس از آن پوشاک با ۲۷٪",
    icon: <DatabaseIcon />,
  },
];

const data = [
  { name: "January", value: 1800 },
  { name: "February", value: 2000 },
  { name: "March", value: 2200 },
  { name: "April", value: 6200 },
  { name: "May", value: 5800 },
  { name: "June", value: 5400 },
];

const SeeInAction = () => {
  return (
    <div className="animate-fadeIn flex flex-col items-center gap-8 [animation-range:entry] [animation-timeline:view()]">
      <h3 className="text-center text-4xl font-bold">
        ببینید در عمل چگونه کار می‌کند <br />
        <span className="text-muted text-2xl font-normal">
          مشاهده کنید که داده‌های شما چگونه در لحظه به بینش‌های قابل‌استفاده
          تبدیل می‌شوند
        </span>
      </h3>

      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
        <Card
          className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-2"
          variant="transparent"
        >
          {["line", "bar", "pie"].map((type) => (
            <ChartCard
              className="h-70 first:col-span-full"
              key={type}
              data={data}
              hideActions
              types={[type as ChartType]}
            />
          ))}
        </Card>

        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <Surface
              key={item.title}
              className="text-foreground from-accent/60 to-accent/80 flex flex-col gap-3 rounded-3xl bg-linear-to-l p-6 text-lg font-bold"
            >
              <div className="bg-accent/10 w-fit rounded-2xl p-2">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Surface>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeeInAction;
