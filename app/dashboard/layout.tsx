"use client";

import { Sidebar } from "@/components";
import { sidebarPaths } from "@/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen grid-cols-6">
      <Sidebar className="col-span-1" paths={sidebarPaths} />
      <div className="col-span-5 flex flex-col">
        <header className="bg-accent h-15">Header</header>
        <main className="p-2 sm:p-5">{children}</main>
      </div>
    </div>
  );
}
