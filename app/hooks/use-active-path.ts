import { SidebarPath, sidebarPaths } from "@/utils";
import { usePathname } from "next/navigation";

export const useActivePath = (): SidebarPath | undefined => {
  const pathname = usePathname().split("/dashboard/")[1] || "";

  return sidebarPaths.find((path) => path.href === pathname);
};
