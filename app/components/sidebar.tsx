import { twMerge } from "tailwind-merge";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside className={twMerge("h-full overflow-auto", className)}>
      Sidebar
    </aside>
  );
};

export default Sidebar;
