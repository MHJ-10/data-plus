"use client";

import ChartCard from "@/components/chart-card";
import { ChartType } from "@/utils/chart-candidate";
import { Button, Card, Chip } from "@heroui/react";
import {
  ArrowLeftIcon,
  BarChart3Icon,
  DatabaseIcon,
  LightbulbIcon,
  PlusIcon,
  TrendingUpIcon,
  UploadIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const stats = [
  {
    title: "کل تحلیل‌ها",
    value: 24,
    icon: BarChart3Icon,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "دیتاست‌های آپلودشده",
    value: 18,
    icon: DatabaseIcon,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "نمودارهای تولیدشده",
    value: 156,
    icon: TrendingUpIcon,
    color: "from-green-500 to-green-600",
  },
  {
    title: "بینش‌های هوش مصنوعی",
    value: 89,
    icon: LightbulbIcon,
    color: "from-orange-500 to-orange-600",
  },
];

const recentAnalyses = [
  {
    name: "فروش سه‌ماهه اول ۲۰۲۶",
    date: "2026-05-12",
    status: "تکمیل‌شده",
    charts: 12,
  },
  {
    name: "بخش‌بندی مشتریان",
    date: "2026-04-16",
    status: "تکمیل‌شده",
    charts: 8,
  },
  {
    name: "عملکرد محصولات",
    date: "2026-04-10",
    status: "تکمیل‌شده",
    charts: 15,
  },
  {
    name: "تحلیل بازگشت سرمایه بازاریابی",
    date: "2026-03-29",
    status: "تکمیل‌شده",
    charts: 10,
  },
];

const chartData = [
  { name: "January", value: 1800 },
  { name: "February", value: 2000 },
  { name: "March", value: 2200 },
  { name: "April", value: 6200 },
  { name: "May", value: 5800 },
  { name: "June", value: 5400 },
];

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

const Dashboard = () => {
  const { data } = useSession();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-3xl font-bold">خوش اومدی، {data?.user?.name}</p>
        <p className="text-muted text-xl font-semibold">
          تحلیل داده‌ها و insightهای خودت رو ادامه بده
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ icon: Icon, title, value, color }) => (
          <Card key={title} className="border p-6">
            <Card.Header
              className={`flex size-12 items-center justify-center rounded-3xl bg-linear-to-r ${color}`}
            >
              <Icon className="text-background size-6" />
            </Card.Header>
            <Card.Content>
              <p className="text-4xl font-bold">{value}</p>
              <p className="text-muted text-xl font-semibold">{title}</p>
            </Card.Content>
          </Card>
        ))}
      </div>

      <div className="space-x-4">
        <Button
          size="lg"
          variant="tertiary"
          className="bg-foreground text-background hover:bg-foreground/90 text-xl transition-colors"
        >
          <Link
            href="/dashboard/upload"
            className="flex flex-row items-center gap-2"
          >
            بارگذاری دیتاست <UploadIcon />
          </Link>
        </Button>
        <Button size="lg" variant="tertiary" className="text-xl">
          <Link
            href="dashboard/analysis"
            className="flex flex-row items-center gap-2"
          >
            شروع تحلیل جدید <PlusIcon />
          </Link>
        </Button>
      </div>

      <Card className="border p-6">
        <Card.Header className="flex flex-row items-center justify-between">
          <p className="text-2xl font-semibold">تحلیل های‌اخیر</p>
          <Link href="/dashboard/analysis" className="text-lg hover:underline">
            مشاهده همه
          </Link>
        </Card.Header>
        <Card.Content>
          {recentAnalyses.map((analysis) => (
            <div
              key={analysis.name}
              className="hover:bg-background/70 group flex items-center justify-between rounded-2xl p-4 transition-colors"
            >
              <div className="flex-1">
                <p className="text-lg font-medium">{analysis.name}</p>
                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                  <span className="text-muted">
                    {new Date(analysis.date).toLocaleString("fa-IR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <span className="text-muted flex items-center gap-1">
                    <BarChart3Icon className="h-4 w-4" />
                    {analysis.charts} چارت
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Chip color="success" size="lg" variant="soft">
                  {analysis.status}
                </Chip>

                <Link
                  href={`dashboard/analysis/${analysis.name}`}
                  className="opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <ArrowLeftIcon className="size-5" />
                </Link>
              </div>
            </div>
          ))}
        </Card.Content>
      </Card>

      <Card className="space-y-2 border">
        <p className="text-2xl font-semibold">چارت‌های اخیر</p>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {["line", "bar", "pie"].map((type) => (
            <ChartCard
              className="h-70"
              key={type}
              data={chartData}
              hideActions
              types={[type as ChartType]}
            />
          ))}
        </div>
      </Card>

      <Card className="border">
        <Card.Header>
          <p className="text-2xl font-semibold">تحلیل‌های هوشمند</p>
        </Card.Header>
        <Card.Content className="grid gap-8 md:grid-cols-3">
          {aiInsights.map((insight) => (
            <Card key={insight.title} variant="tertiary" className="p-5">
              <div className="flex items-start gap-3">
                <div className="bg-foreground/10 rounded-xl p-2">
                  <LightbulbIcon className="text-foreground size-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{insight.title}</h3>
                  <p className="text-lg">{insight.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </Card.Content>
      </Card>
    </div>
  );
};

export default Dashboard;
