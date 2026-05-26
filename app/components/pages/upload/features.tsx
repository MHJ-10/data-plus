"use client";

import { Card } from "@heroui/react";
import {
  BarChart3Icon,
  FileSpreadsheetIcon,
  LightbulbIcon,
  ShieldIcon,
} from "lucide-react";

const uploadFeatures = [
  {
    title: "فرمت‌های پشتیبانی‌شده",
    description:
      "آپلود فایل‌های CSV تا حجم ۱۰ مگابایت با پردازش سریع و خودکار داده‌ها",
    icon: FileSpreadsheetIcon,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "نمودارهای تولیدشده با هوش مصنوعی",
    description: "تولید خودکار نمودارها بر اساس الگوهای موجود در داده‌های شما",
    icon: BarChart3Icon,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "بینش‌های خودکار",
    description:
      "دریافت بینش‌های مبتنی بر هوش مصنوعی، روندها و شناسایی ناهنجاری‌ها",
    icon: LightbulbIcon,
    color: "from-green-500 to-green-600",
  },
  {
    title: "امن و خصوصی",
    description: "داده‌های شما رمزنگاری و با امنیت سطح سازمانی پردازش می‌شوند",
    icon: ShieldIcon,
    color: "from-orange-500 to-orange-600",
  },
];

export const Features = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {uploadFeatures.map(({ icon: Icon, title, description, color }) => (
        <Card key={title} className="border p-6">
          <Card.Header
            className={`flex size-12 items-center justify-center rounded-3xl bg-linear-to-r ${color}`}
          >
            <Icon className="text-background size-6" />
          </Card.Header>
          <Card.Content>
            <p className="text-foreground text-2xl font-bold">{title}</p>
            <p className="text-muted text-lg font-semibold">{description}</p>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
};
