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
      {/* <body className="bg-background flex min-h-full flex-col">
        <Provider>{children}</Provider>
      </body> */}

      <body className="bg-background relative flex min-h-full flex-col">
        <div className="pointer-events-none fixed inset-0 z-5">
          <div className="from-accent/10 via-background to-accent/10 absolute inset-0 bg-linear-to-r" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,#64748b0d_1px,transparent_1px),linear-gradient(to_bottom,#64748b0d_1px,transparent_1px)] bg-size-[48px_48px]" />

          <div className="bg-warning/5 absolute top-0 left-1/4 size-150 rounded-full blur-3xl" />
          <div className="bg-accent/10 absolute top-1/4 right-1/4 size-175 rounded-full blur-3xl" />
          <div className="bg-success/5 absolute bottom-1/4 left-1/3 size-125 rounded-full blur-3xl" />
        </div>

        <Provider>
          <div className="relative z-10">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
