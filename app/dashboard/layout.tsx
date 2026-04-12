"use client";

import { Menu } from "@/components";
import { useActivePath } from "@/hooks";
import { sidebarPaths } from "@/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activePath = useActivePath();

  return (
    <div className="h-screen grid-cols-5 lg:grid">
      <Menu paths={sidebarPaths} />
      <div className="col-span-4 flex flex-col">
        <header className="bg-accent text-background flex h-15 items-center justify-center text-center text-2xl">
          {activePath?.label}
        </header>
        <main className="p-2 sm:p-5">{children}</main>
      </div>
    </div>
  );
}
