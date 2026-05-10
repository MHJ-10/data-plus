import type { Metadata } from "next";
import { Harmattan } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const harmattan = Harmattan({
  variable: "--font-harmattan",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Data Plus",
  description: "Analyze and visualize your data with ease using Data Plus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      data-theme="light"
      className={`${harmattan.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
