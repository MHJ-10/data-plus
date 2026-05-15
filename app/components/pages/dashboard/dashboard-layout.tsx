"use client";

import { Button, Chip } from "@heroui/react";
import { clsx } from "clsx";
import {
  CalendarIcon,
  ChevronRight,
  FolderOpen,
  LayoutDashboard,
  LogOutIcon,
  Settings,
  Upload,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

const menuItems = [
  { href: "", label: "پیشخوان", icon: LayoutDashboard },
  { href: "upload", label: "آپلود دیتاست", icon: Upload },
  { href: "analysis", label: "آنالیز ها", icon: FolderOpen },
  { href: "settings", label: "تنظیمات", icon: Settings },
];

const DashboardLayout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const { data } = useSession();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const isActive = (path: string) => {
    const currentPathname = pathname.split("/dashboard/")[1] || "";

    return currentPathname === path;
  };

  return (
    <div className="bg-background flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`bg-foreground/5 border-border hidden flex-col border-l transition-all duration-[300] md:flex ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex w-full items-center justify-between p-6">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Data Plus Logo"
                width={20}
                height={20}
              />
              <h1 className="text-foreground text-xl font-semibold">
                دیتاپلاس
              </h1>
            </div>
          )}
          <Button
            isIconOnly
            variant="ghost"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <ChevronRight
              className={clsx("size-5 transition-transform", {
                "rotate-180": sidebarCollapsed,
              })}
            />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Button
                key={item.href}
                variant="ghost"
                size="lg"
                fullWidth
                className={clsx("", {
                  "bg-foreground text-background": active,
                })}
              >
                <Link
                  href={`/dashboard/${item.href}`}
                  className={clsx(
                    "flex w-full items-center justify-start gap-5 text-lg font-semibold",
                    {
                      "justify-center!": sidebarCollapsed,
                    },
                  )}
                >
                  <Icon className="size-5" />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="border-border flex flex-col gap-2 border-t p-4">
          <div className={sidebarCollapsed ? "hidden" : "block"}>
            <p className="text-foreground text-xl font-bold">
              {data?.user?.name}
            </p>
            <p className="text-muted font-semibold">{data?.user?.email}</p>
          </div>
          <Button
            variant="ghost"
            size="lg"
            isIconOnly={sidebarCollapsed}
            fullWidth
            className={sidebarCollapsed ? "justify-center" : "justify-start"}
            onClick={() => {
              signOut({ redirectTo: "/" });
            }}
          >
            <LogOutIcon />
            <span className={sidebarCollapsed ? "hidden" : "inline"}>خروج</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-background border-border flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-2 md:hidden">
            <Image
              src="/logo.png"
              alt="Data Plus Logo"
              width={20}
              height={20}
            />
            <h1 className="text-foreground text-xl font-semibold">دیتاپلاس</h1>
          </div>

          <div className="hidden md:block" />
          <div className="flex items-center gap-3">
            <Chip size="lg">
              <CalendarIcon className="size-4" />
              <Chip.Label>
                {new Date().toLocaleString("fa-IR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Chip.Label>
            </Chip>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-4 pt-4 pb-20 md:pb-0">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="bg-background border-border fixed right-0 bottom-0 left-0 z-30 rounded-t-3xl border-t md:hidden">
          <div className="flex items-center justify-around p-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  className={clsx("text-muted w-fit", {
                    "text-foreground! font-bold": active,
                  })}
                >
                  <Link
                    href={`/dashboard/${item.href}`}
                    className="flex flex-col items-center gap-1"
                  >
                    <Icon className="size-5" />
                    <span className="text-xs">{item.label.split(" ")[0]}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DashboardLayout;
