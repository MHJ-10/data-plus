"use client";

import { GithubIcon } from "@/components/icons";
import { CodeSquareIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const links = [
  {
    text: "ایمیل",
    icon: MailIcon,
    href: "mailto:mhjafari.dev@gmail.com",
  },
  {
    text: "سورس کد",
    icon: CodeSquareIcon,
    href: "https://github.com/MHJ-10/data-plus",
  },
  {
    text: "گیت‌هاب",
    icon: GithubIcon,
    href: "https://github.com/MHJ-10",
  },
];

const Footer = () => {
  return (
    <footer className="py-6">
      <div className="container mx-auto grid grid-cols-1 items-center gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <Image src="/logo.png" alt="data plus logo" width={40} height={40} />
          <span className="text-3xl font-bold">دیتاپلاس</span>
        </div>

        <div className="text-muted flex items-center justify-center gap-6 text-xl md:justify-end">
          {links.map(({ text, icon: Icon, href }) => (
            <Link key={text} className="flex items-center gap-2" href={href}>
              <Icon />
              {text}
            </Link>
          ))}
        </div>

        <span className="text-muted text-center md:col-span-full lg:col-span-1 lg:justify-self-end">
          © توسعه یافته در سال ۱۴۰۵ برای پروژه دانشگاه
        </span>
      </div>
    </footer>
  );
};

export default Footer;
