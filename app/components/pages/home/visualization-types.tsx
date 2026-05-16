"use client";

import { Card } from "@heroui/react";
import {
  BarChartIcon,
  Grid3x3Icon,
  LineChartIcon,
  PieChartIcon,
  AreaChartIcon,
  ScatterChartIcon,
} from "lucide-react";

const chartTypes = [
  {
    icons: [BarChartIcon, Grid3x3Icon],
    titles: ["نمودار میله‌ای", "نقشه درختی"],
    description:
      "مناسب برای مقایسه دسته‌ها و نمایش رتبه‌بندی‌ها و بصری‌سازی داده‌های سلسله‌مراتبی و دسته‌بندی‌های تو در تو",
    gradient: "from-danger/40 to-danger/70",
  },
  {
    icons: [LineChartIcon, AreaChartIcon],
    titles: ["نمودار خطی", "نمودار ناحیه‌ای"],
    description:
      "ایده‌آل برای نمایش روندها در طول زمان و داده‌های پیوسته همراه با تاکید بر حجم و تغییرات تجمعی",
    gradient: "from-danger/70 to-danger",
  },
  {
    icons: [ScatterChartIcon],
    titles: ["نمودار پراکندگی"],
    description: "مناسب برای بررسی ارتباط بین متغیرها و شناسایی الگوها",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icons: [PieChartIcon],
    titles: ["نمودار دایره‌ای"],
    description: "نمایش سهم‌ها و تقسیم‌بندی‌های درصدی",
    gradient: "from-green-500 to-teal-600",
  },
];

const VisualizationTypes = () => {
  return (
    <div className="animate-fadeIn flex flex-col items-center gap-8 [animation-range:entry] [animation-timeline:view()]">
      <h3 className="text-center text-4xl font-bold">
        انواع نمودارها
        <br />
        <span className="text-muted text-2xl font-normal">
          به‌طور خودکار بهترین نوع نمایش داده برای اطلاعات شما انتخاب می‌شود
        </span>
      </h3>

      <div className="grid w-full gap-6 md:grid-cols-2">
        {chartTypes.map((chart, index) => (
          <Card key={index} className="border">
            <Card.Header className="flex flex-row gap-4">
              {chart.icons.map((Icon) => (
                <div
                  key={Icon.displayName}
                  className={`size-13 bg-linear-to-br ${chart.gradient} flex items-center justify-center rounded-2xl`}
                >
                  <Icon className="text-background size-8" />
                </div>
              ))}
            </Card.Header>

            <h3 className="text-xl">{chart.titles.join(" ، ")}</h3>
            <p className="text-muted">{chart.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VisualizationTypes;
