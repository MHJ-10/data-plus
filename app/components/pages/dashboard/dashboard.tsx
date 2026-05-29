"use client";

import { Chart, Insight } from "@/generated/prisma/client";
import { useSession } from "next-auth/react";
import { NewAnalysis } from "./new-analysis";
import { AnalysisWithRelations, RecentAnalyses } from "./recent-analyses";
import { RecentCharts } from "./recent-charts";
import { RecentInsights } from "./recent-insights";
import { Stats } from "./stats";

interface DashboardProps {
  stats: {
    analyses: number;
    insights: number;
    charts: number;
    columneMetadata: number;
  };
  recentData: {
    analyses: AnalysisWithRelations[];
    insights: Insight[];
    charts: Chart[];
  };
}

const Dashboard = ({ stats, recentData }: DashboardProps) => {
  const { data } = useSession();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-foreground text-3xl font-bold">
          خوش اومدی، {data?.user?.name}
        </p>
        <p className="text-muted text-xl font-semibold">
          تحلیل داده‌ها و insightهای خودت رو ادامه بده
        </p>
      </div>

      <Stats stats={stats} />

      <NewAnalysis />

      <RecentCharts charts={recentData.charts} />

      <RecentAnalyses analyses={recentData.analyses} />

      <RecentInsights />
    </div>
  );
};

export default Dashboard;
