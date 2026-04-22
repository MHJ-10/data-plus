import SimpleBarChart from "@/components/chart/chart";
import { Card } from "@heroui/react";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-3">
      <Card className="h-[400px]">
        <SimpleBarChart />
      </Card>
      <Card className="h-[400px]">
        <SimpleBarChart />
      </Card>
      <Card className="h-[400px]">
        <SimpleBarChart />
      </Card>
      <Card className="h-[400px]">
        <SimpleBarChart />
      </Card>
    </div>
  );
};

export default DashboardPage;
