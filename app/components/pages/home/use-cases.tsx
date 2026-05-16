"use client";

import { Card } from "@heroui/react";
import {
  FileTextIcon,
  LayoutDashboardIcon,
  SearchIcon,
  TableIcon,
} from "lucide-react";

const useCases = [
  {
    icon: SearchIcon,
    title: "کاوش داده",
    description:
      "درک سریع داده‌های جدید و کشف الگوهای پنهان بدون نیاز به نوشتن کوئری",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: LayoutDashboardIcon,
    title: "داشبوردهای کسب‌وکار",
    description:
      "ساخت داشبوردهای فوری برای ذی‌نفعان بدون نیاز به ابزارهای پیچیده BI",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: FileTextIcon,
    title: "گزارش‌گیری سریع",
    description:
      "تولید گزارش‌های بصری از داده‌های خام در چند ثانیه، نه چند ساعت",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: TableIcon,
    title: "تحلیل فایل CSV",
    description:
      "بدون نیاز به اکسل، از هر فایل CSV فوراً بینش بگیرید—بدون هیچ تنظیماتی",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

const UseCases = () => {
  return (
    <div className="animate-fadeIn flex flex-col items-center gap-8 [animation-range:entry] [animation-timeline:view()]">
      <h3 className="text-center text-4xl font-bold">
        ساخته‌شده برای سبک کار شما
        <br />
        <span className="text-muted text-2xl font-normal">
          از تحلیل سریع تا داشبوردهای آماده استفاده در عمل
        </span>
      </h3>

      <div className="grid w-full gap-6 md:grid-cols-2">
        {useCases.map(
          ({ icon: Icon, title, description, bgColor, iconColor }) => (
            <Card key={title} className="border">
              <Card.Header className="flex flex-row gap-4">
                <div
                  className={`size-13 bg-linear-to-br ${bgColor} flex items-center justify-center rounded-2xl`}
                >
                  <Icon className={`text-background size-10 ${iconColor}`} />
                </div>
              </Card.Header>

              <h3 className="text-xl">{title}</h3>
              <p className="text-muted">{description}</p>
            </Card>
          ),
        )}
      </div>
    </div>
  );
};

export default UseCases;
