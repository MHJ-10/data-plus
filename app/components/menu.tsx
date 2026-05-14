"use client";

import { useActivePath } from "@/hooks";
import { cn, SidebarPath } from "@/utils";
import { Button, Drawer } from "@heroui/react";
import clsx from "clsx";
import { LogOut, MenuIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface MenuProps {
  className?: string;
  paths: SidebarPath[];
}

interface LogoHeaderProps {
  isSmall?: boolean;
}

const LogoHeader = ({ isSmall = false }: LogoHeaderProps) => (
  <div className="flex items-center justify-center gap-2">
    <Image
      src="/logo.png"
      alt="Data Plus Logo"
      width={isSmall ? 28 : 40}
      height={isSmall ? 28 : 40}
    />
    <p
      className={clsx("text-foreground text-center text-3xl font-bold", {
        "text-xl": isSmall,
      })}
    >
      دیتاپلاس
    </p>
  </div>
);

const LogoutButton = () => (
  <Button
    className="w-full"
    variant="primary"
    onClick={() => {
      signOut({ redirectTo: "/login" });
    }}
  >
    <LogOut />
    خروج از حساب کاربری
  </Button>
);

const Menu = ({ className, paths }: MenuProps) => {
  const activePath = useActivePath();

  return (
    <>
      <aside
        className={cn(
          "bg-background hidden h-full flex-col gap-10 overflow-auto p-5 shadow-sm shadow-black/50 lg:flex",
          className,
        )}
      >
        <LogoHeader />
        <div className="flex flex-1 flex-col gap-2">
          {paths.map((path) => (
            <Button
              className="w-full"
              size="lg"
              variant={path.href === activePath?.href ? "secondary" : "ghost"}
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
        <LogoutButton />
      </aside>

      <div className="flex h-15 items-center justify-between px-2 lg:hidden">
        <Drawer>
          <Button variant="ghost" size="sm">
            <MenuIcon className="size-5" />
          </Button>
          <Drawer.Backdrop>
            <Drawer.Content placement="top">
              <Drawer.Dialog>
                <Drawer.Body className="mx-auto flex w-full max-w-150 flex-col gap-4">
                  <div className="flex items-center justify-center gap-2">
                    <Image
                      src="/logo.png"
                      alt="Data Plus Logo"
                      width={40}
                      height={40}
                    />
                    <p className="text-foreground text-center text-3xl font-bold">
                      دیتاپلاس
                    </p>
                  </div>
                  <nav className="flex flex-1 flex-col gap-2">
                    {paths.map((path) => (
                      <Button
                        className="w-full"
                        size="lg"
                        variant={
                          path.href === activePath?.href ? "secondary" : "ghost"
                        }
                        key={path.href}
                        slot="close"
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
                  </nav>
                  <LogoutButton />
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
        <LogoHeader isSmall />
      </div>
    </>
  );
};

export default Menu;
