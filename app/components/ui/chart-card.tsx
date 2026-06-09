"use client";

import {
  Button,
  Card,
  Dropdown,
  Label,
  Skeleton,
  Tabs,
  toast,
} from "@heroui/react";
import {
  AreaChartIcon,
  BarChart2Icon,
  EllipsisIcon,
  Grid3x3Icon,
  ImageIcon,
  LineChartIcon,
  PieChartIcon,
  ScatterChartIcon,
  SheetIcon,
} from "lucide-react";
import BarChart from "../chart/bar-chart";
import { ChartType } from "@/utils/chart-candidate";
import { ReactNode, Ref, useEffect, useRef, useState } from "react";
import AreaChart from "../chart/area-chart";
import PieChart from "../chart/pie-chart";
import TreemapChart from "../chart/treemap-chart";
import LineChart from "../chart/line-chart";
import ScatterChart from "../chart/scatter-chart";
import { useDownloadPNG } from "@/hooks";
import { cn, downloadCSVFile } from "@/utils";

interface ChartCardProps<T = { [key: string]: string | number }> {
  data: T[];
  types: ChartType[];
  title?: string;
  className?: string;
  hideActions?: boolean;
  nameKey?: string;
  dataKey?: string;
  ref?: Ref<HTMLDivElement>;
}

const ChartCard = (props: ChartCardProps) => {
  const {
    data,
    title,
    types,
    className,
    hideActions = false,
    nameKey,
    dataKey,
    ref,
  } = props;

  const [selectedType, setSelectedType] = useState<ChartType>(types[0]);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef<HTMLDivElement>(null);
  const downloadPng = useDownloadPNG(chartRef);

  useEffect(() => {
    const showLoading = () => {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    };

    showLoading();
  }, [selectedType]);

  const chartTypeMap: Record<ChartType, { label: string; icon: ReactNode }> = {
    area: { label: "مساحتی", icon: <AreaChartIcon /> },
    bar: { label: "ستونی", icon: <BarChart2Icon /> },
    line: { label: "خطی", icon: <LineChartIcon /> },
    pie: { label: "دایره ای", icon: <PieChartIcon /> },
    treemap: { label: "درختی", icon: <Grid3x3Icon /> },
    scatter: { label: "پراگندگی", icon: <ScatterChartIcon /> },
  };

  const renderChart = (type: ChartType) => {
    switch (type) {
      case "area":
        return <AreaChart nameKey={nameKey} dataKey={dataKey} data={data} />;
      case "bar":
        return <BarChart nameKey={nameKey} dataKey={dataKey} data={data} />;
      case "line":
        return <LineChart nameKey={nameKey} dataKey={dataKey} data={data} />;
      case "pie":
        return <PieChart nameKey={nameKey} dataKey={dataKey} data={data} />;
      case "treemap":
        return <TreemapChart nameKey={nameKey} dataKey={dataKey} data={data} />;
      case "scatter":
        return <ScatterChart nameKey={nameKey} dataKey={dataKey} data={data} />;
      default:
        return <></>;
    }
  };

  const handleDropdownClick = (mode: "pdf" | "csv") => {
    if (!data) return;

    if (mode === "pdf") {
      downloadPng(title);
    } else {
      let content = "";

      content += `${Object.keys(data[0]).join(",")}\n`;
      data.forEach((d) => {
        content += `${Object.values(d)
          .map((d) => (typeof d === "string" ? d.replaceAll(",", "-") : d))
          .join(",")}\n`;
      });

      downloadCSVFile(content, title);
    }

    toast.success("فایل با موفقیت دانلود شد.");
  };

  return (
    <Card variant="secondary" ref={ref} className={cn("border", className)}>
      <Card.Header className="flex flex-row items-center justify-between">
        {title ? (
          <Card.Title className="flex-1 truncate text-xl">{title}</Card.Title>
        ) : null}
        <div className="flex items-center gap-4">
          {types.length > 1 ? (
            <Tabs
              className="w-fit"
              variant="primary"
              selectedKey={selectedType}
              onSelectionChange={(value) => {
                const type = value as ChartType;
                setSelectedType(type);
              }}
            >
              <Tabs.ListContainer>
                <Tabs.List aria-label="Options">
                  {types.map((type) => (
                    <Tabs.Tab key={type} id={type}>
                      {chartTypeMap[type].label}
                      <span className="ms-2">{chartTypeMap[type].icon}</span>
                      <Tabs.Indicator />
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs.ListContainer>
            </Tabs>
          ) : null}

          {!hideActions ? (
            <Dropdown>
              <Button isIconOnly className="rounded-full" variant="ghost">
                <EllipsisIcon />
              </Button>
              <Dropdown.Popover className="w-fit min-w-0">
                <Dropdown.Menu
                  dir="rtl"
                  onSelectionChange={(key) => {
                    handleDropdownClick(Object.values(key)[0] as "pdf" | "csv");
                  }}
                  selectionMode="single"
                >
                  <Dropdown.Item textValue="csv" id="csv">
                    <SheetIcon className="size-4" />
                    <Label>دانلود فایل csv</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="pdf" textValue="pdf">
                    <ImageIcon className="size-4" />
                    <Label>دانلود فایل png</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : null}
        </div>
      </Card.Header>
      <Card.Content ref={chartRef}>
        {isLoading ? (
          <div className="grid h-75 w-full grid-cols-12 items-end gap-4 p-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-full rounded"
                style={{ height: `${(i + 1) * 8}%` }}
              />
            ))}
          </div>
        ) : (
          renderChart(selectedType)
        )}
      </Card.Content>
    </Card>
  );
};

export default ChartCard;
