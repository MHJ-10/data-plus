"use client";

import { Button, Card } from "@heroui/react";
import { clsx } from "clsx";
import { MonitorCogIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const items = [
  { label: "روشن", value: "light", icon: SunIcon },
  { label: "تیره", value: "dark", icon: MoonIcon },
  { label: "سیستم", value: "system", icon: MonitorCogIcon },
];

export const Appearance = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mount = () => {
      setMounted(true);
    };
    mount();
  }, []);

  if (!mounted) return null;

  return (
    <Card className="border">
      <Card.Header className="text-2xl">تنظیمات ظاهری</Card.Header>

      <Card.Content>
        <Card variant="secondary">
          <Card.Header className="flex flex-row items-center gap-2">
            <Card className="size-fit p-2">
              <MonitorIcon />
            </Card>

            <div>
              <p className="text-xl/6 font-semibold">تنظیمات تم</p>

              <p className="text-muted text-lg/6">
                طرح رنگ دلخواه خود را انتخاب کنید
              </p>
            </div>
          </Card.Header>

          <Card.Content>
            <div className="flex gap-4">
              {items.map(({ label, value, icon: Icon }) => (
                <Button
                  key={value}
                  fullWidth
                  size="lg"
                  variant="secondary"
                  className={clsx(
                    "bg-background text-foreground hover:border-foreground border transition-all",
                    {
                      "border-foreground": theme === value,
                    },
                  )}
                  onClick={() => setTheme(value)}
                >
                  <Icon />
                  {label}
                </Button>
              ))}
            </div>
          </Card.Content>
        </Card>
      </Card.Content>
    </Card>
  );
};
