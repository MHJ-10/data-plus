"use client";

import { Card } from "@heroui/react";
import { CpuIcon, DatabaseIcon, GaugeIcon, ShieldIcon } from "lucide-react";

const techFeatures = [
  {
    title: "موتور تحلیل هوشمند",
    description: "قدرت‌گرفته از الگوریتم‌های پیشرفته آماری",
    icon: CpuIcon,
  },
  {
    title: "تشخیص خودکار ساختار داده",
    description: "استخراج ساختار از دیتاست‌های پویا به‌صورت خودکار",
    icon: DatabaseIcon,
  },
  {
    title: "عملکرد با کارایی بالا",
    description: "پردازش کارآمد میلیون‌ها ردیف داده",
    icon: GaugeIcon,
  },
  {
    title: "حریم خصوصی در اولویت",
    description: "داده‌های شما هرگز از مرورگر شما خارج نمی‌شوند",
    icon: ShieldIcon,
  },
];

const TechnicalHighlight = () => {
  return (
    <div className="from-warning/50 via-accent/50 to-success/50 bg-linear-to-bl px-4 py-20">
      <div className="container mx-auto flex flex-col gap-16">
        <h3 className="text-foreground text-center text-5xl font-bold">
          قدرت‌گرفته از فناوری هوشمند
          <br />
          <span className="text-foreground/80 text-2xl font-normal">
            یک موتور تحلیل پیشرفته برای توسعه‌دهندگان و تیم‌های داده
          </span>
        </h3>

        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
          {techFeatures.map((feature, index) => (
            <Card
              key={index}
              className="text-foreground border-foreground/20 bg-foreground/10 rounded-2xl border p-6 backdrop-blur-lg"
            >
              <div className="border-foreground/20 bg-foreground/10 flex size-12 items-center justify-center rounded-xl bg-linear-to-br backdrop-blur-lg">
                <feature.icon className="size-6" />
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>

        <Card className="text-foreground border-foreground/20 bg-foreground/10 rounded-2xl border p-6 backdrop-blur-lg">
          <h5 className="text-foreground text-center text-3xl font-bold">
            معماری سازگار با توسعه‌دهندگان
            <br />
            <span className="text-foreground/80 text-lg font-normal">
              طراحی‌شده برای دیتاست‌های پویا با قابلیت تشخیص هوشمند نوع داده،
              شناسایی ارتباط بین داده‌ها و پیشنهاد خودکار نمودار مناسب. همچنین
              مشکلات رایج داده‌های واقعی مانند مقادیر ناقص، ناسازگاری نوع داده و
              ساختارهای نامنظم را به‌خوبی مدیریت می‌کند.
            </span>
          </h5>
        </Card>
      </div>
    </div>
  );
};

export default TechnicalHighlight;
