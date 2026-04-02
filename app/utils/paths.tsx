import {
  ChartNoAxesCombined,
  LayoutDashboard,
  Settings,
  Upload,
} from "lucide-react";

export interface SidebarPath {
  label: string;
  icon: React.ReactNode;
  href: string;
}

export const sidebarPaths: SidebarPath[] = [
  {
    label: "داشبورد",
    href: "",
    icon: <LayoutDashboard />,
  },
  {
    label: "آپلود داده",
    href: "upload",
    icon: <Upload />,
  },
  {
    label: "تحلیل‌ها",
    href: "analysis",
    icon: <ChartNoAxesCombined />,
  },
  {
    label: "تنظیمات",
    href: "settings",
    icon: <Settings />,
  },
];
