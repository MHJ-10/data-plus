"use client";

import { Button, Card } from "@heroui/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mount = () => {
      setMounted(true);
    };

    mount();
  }, []);

  return (
    <div className="flex w-full items-center justify-between py-4">
      <Card className="flex flex-row items-center gap-2 border p-2">
        <Image src="/logo.png" alt="data plus logo" width={30} height={30} />
        <span className="text-xl font-bold">دیتا پلاس</span>
      </Card>
      {mounted ? (
        <Button
          isIconOnly
          size="lg"
          className="bg-background [&>svg]:text-muted border [&>svg]:size-6 [&>svg]:animate-pulse"
          onClick={() => {
            setTheme((prev) => (prev == "light" ? "dark" : "light"));
          }}
        >
          {theme === "light" ? <SunIcon /> : <MoonIcon />}
        </Button>
      ) : null}
    </div>
  );
};

export default Header;
