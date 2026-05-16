"use client";

import { Card } from "@heroui/react";
import {
  BinaryIcon,
  Code2Icon,
  LightbulbIcon,
  ShieldIcon,
  Wand2Icon,
  ZapIcon,
} from "lucide-react";

const features = [
  {
    icon: BinaryIcon,
    title: "تشخیص خودکار نوع داده",
    description: "شناسایی هوشمند ستون‌های عددی، دسته‌بندی‌شده، تاریخ و متنی",
  },
  {
    icon: Wand2Icon,
    title: "انتخاب هوشمند نمودار",
    description: "انتخاب بهترین نوع نمودار بر اساس ساختار داده‌های شما",
  },
  {
    icon: LightbulbIcon,
    title: "تولید بینش",
    description: "کشف خودکار روندها، نقاط پرت و الگوهای پنهان در داده‌ها",
  },
  {
    icon: ShieldIcon,
    title: "پشتیبانی از داده‌های نامرتب",
    description: "کار با داده‌های واقعی شامل مقادیر ناقص و فرمت‌های ناسازگار",
  },
  {
    icon: ZapIcon,
    title: "سرعت فوق‌العاده",
    description: "تحلیل هزاران ردیف داده در چند میلی‌ثانیه، نه چند دقیقه",
  },
  {
    icon: Code2Icon,
    title: "بدون نیاز به کدنویسی",
    description:
      "مناسب برای همه—از توسعه‌دهندگان تا تحلیل‌گران و کاربران کسب‌وکار",
  },
];

const PowerfulFeatures = () => {
  return (
    <div className="animate-fadeIn flex flex-col items-center gap-8 [animation-range:entry] [animation-timeline:view()]">
      <h3 className="text-center text-4xl font-bold">
        قابلیت‌های قدرتمند
        <br />
        <span className="text-muted text-2xl font-normal">
          هر آنچه برای درک بهتر داده‌ها نیاز دارید، به‌صورت یکجا در اختیار شماست
        </span>
      </h3>

      <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="border">
            <div className="from-accent/10 flex size-12 items-center justify-center rounded-xl bg-linear-to-br to-blue-100">
              <feature.icon className="text-accent size-6" />
            </div>
            <h3 className="text-xl">{feature.title}</h3>
            <p className="text-muted">{feature.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PowerfulFeatures;
