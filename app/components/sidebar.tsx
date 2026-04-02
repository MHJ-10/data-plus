"use client";

import { cn, SidebarPath } from "@/utils";
import { Button } from "@heroui/react";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
  paths: SidebarPath[];
}

const Sidebar = ({ className, paths }: SidebarProps) => {
  const activePath = usePathname().split("/dashboard/")[1] || "";

  return (
    <aside
      className={cn(
        "bg-background flex h-full flex-col gap-10 overflow-auto p-5 shadow-sm shadow-black/50",
        className,
      )}
    >
      <div className="flex items-center justify-center gap-2">
        <Image src="/logo.png" alt="Data Plus Logo" width={40} height={40} />
        <p className="text-center text-3xl font-bold">دیتاپلاس</p>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        {paths.map((path) => (
          <Button
            className="w-full"
            size="lg"
            variant={activePath === path.href ? "tertiary" : "ghost"}
            key={path.href}
          >
            <Link
              className="flex w-full items-center justify-center gap-4 text-xl"
              href={`/dashboard/${path.href}`}
            >
              {path.icon}
              {path.label}
            </Link>
          </Button>
        ))}
      </div>
      <Button className="w-full" variant="primary">
        <LogOut />
        خروج از حساب کاربری
      </Button>
    </aside>
  );
};

export default Sidebar;
