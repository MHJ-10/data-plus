import { Card } from "@heroui/react";
import { BarChart3Icon, SparklesIcon, UploadIcon } from "lucide-react";

const steps = [
  {
    title: "آپلود داده‌ها",
    description:
      "فایل‌های CSV را بکشید و رها کنید. نیازی به فرمت‌بندی نیست—داده‌های نامرتب را هم پردازش می‌کنیم.",
    icon: <UploadIcon />,
    color: "from-warning/60 to-warning/80",
  },
  {
    title: "تحلیل خودکار",
    description:
      "شناسایی هوشمند نوع ستون‌ها، ارتباطات و الگوهای موجود در داده‌ها",
    icon: <SparklesIcon />,
    color: "from-danger/60 to-danger/80",
  },
  {
    title: "دریافت نمودار و بینش",
    description: "در لحظه، نمودارهای زیبا و بینش‌های قابل‌استفاده دریافت کنید",
    icon: <BarChart3Icon />,
    color: "from-success/60 to-success/80",
  },
];

const HowItWorks = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <h3 className="text-center text-4xl font-bold">
        نحوه کار
        <br />
        <span className="text-muted text-2xl font-normal">
          سه قدم ساده برای تبدیل داده‌ها به بینش‌های کاربردی
        </span>
      </h3>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <Card key={step.title} className="overflow-visible border">
            <div
              className={`${step.color} absolute -top-4 -left-4 flex size-10 items-center justify-center rounded-full bg-linear-to-br text-2xl font-bold shadow-lg`}
            >
              {index + 1}
            </div>
            <Card.Title className="flex flex-col gap-4">
              <div
                className={`size-14 bg-linear-to-br ${step.color} text-background flex items-center justify-center rounded-2xl`}
              >
                {step.icon}
              </div>
              <p className="text-2xl font-bold">{step.title}</p>
            </Card.Title>
            <Card.Content>
              <p className="text-muted text-lg">{step.description}</p>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
