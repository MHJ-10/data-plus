import { Sidebar } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid h-screen grid-cols-8">
      <Sidebar className="col-span-1" />
      {children}
    </section>
  );
}
