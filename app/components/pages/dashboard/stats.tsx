import { Card } from "@heroui/react";
import {
  BarChart3Icon,
  Columns3Icon,
  LightbulbIcon,
  TrendingUpIcon,
} from "lucide-react";

interface Stats {
  analyses: number;
  insights: number;
  charts: number;
  columneMetadata: number;
}

interface StatsProps {
  stats: Stats;
}

export const Stats = ({ stats }: StatsProps) => {
  const statsData = [
    {
      title: "کل تحلیل‌ها",
      value: stats.analyses,
      icon: BarChart3Icon,
      color: "from-blue-500 to-blue-600",
    },

    {
      title: "نمودارهای تولیدشده",
      value: stats.charts,
      icon: TrendingUpIcon,
      color: "from-green-500 to-green-600",
    },
    {
      title: "بینش‌های هوش مصنوعی",
      value: stats.insights,
      icon: LightbulbIcon,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "متادیتای ستون‌ها",
      value: stats.columneMetadata,
      icon: Columns3Icon,
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map(({ icon: Icon, title, value, color }) => (
        <Card key={title} className="border p-6">
          <Card.Header
            className={`flex size-12 items-center justify-center rounded-3xl bg-linear-to-r ${color}`}
          >
            <Icon className="text-background size-6" />
          </Card.Header>
          <Card.Content>
            <p className="text-foreground text-4xl font-bold">{value}</p>
            <p className="text-muted text-xl font-semibold">{title}</p>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
};
