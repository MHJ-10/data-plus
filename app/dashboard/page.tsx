import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  TreemapChart,
} from "@/components";
import { Card } from "@heroui/react";

const data = [
  {
    name: "Page A",
    uv: 4000,
  },
  {
    name: "Page B",
    uv: 3000,
  },
  {
    name: "Page C",
    uv: 2000,
  },
  {
    name: "Page D",
    uv: 2780,
  },
  {
    name: "Page E",
    uv: 1890,
  },
  {
    name: "Page F",
    uv: 2390,
  },
  {
    name: "Page G",
    uv: 3490,
  },
];

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-1 lg:grid-cols-3">
      <Card className="h-96" variant="secondary">
        <BarChart data={data} dataKey="uv" />
      </Card>
      <Card className="h-96" variant="secondary">
        <PieChart data={data} dataKey="uv" />
      </Card>
      <Card className="h-96" variant="secondary">
        <LineChart data={data} dataKey="uv" />
      </Card>
      <Card className="h-96" variant="secondary">
        <AreaChart data={data} dataKey="uv" />
      </Card>
      <Card className="h-96 lg:col-span-2" variant="secondary">
        <TreemapChart data={data} dataKey="uv" />
      </Card>
      <Card className="h-96" variant="secondary">
        <ScatterChart
          data={[
            { x: 100, y: 200, z: 200 },
            { x: 120, y: 100, z: 260 },
            { x: 170, y: 300, z: 400 },
            { x: 140, y: 250, z: 280 },
            { x: 150, y: 400, z: 500 },
            { x: 110, y: 280, z: 200 },
          ]}
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
