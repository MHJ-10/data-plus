"use client";

import { Button, Card } from "@heroui/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

const Header = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex w-full items-center justify-between py-4">
      <Card className="flex flex-row items-center gap-2 border p-2">
        <Image src="/logo.png" alt="data plus logo" width={24} height={24} />
        <span className="text-xl font-bold">دیتاپلاس</span>
      </Card>
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
    </div>
  );
};

export default Header;
