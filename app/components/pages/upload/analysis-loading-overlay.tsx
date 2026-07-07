"use client";

import { SparklesIcon } from "lucide-react";
import { useEffect, useState } from "react";

const PHRASES = [
  "بهترین تصمیم‌ها بر پایه داده‌ها گرفته می‌شوند.",
  "هوش مصنوعی زمانی مفید است که داده‌های باکیفیت داشته باشد.",
  "الگوهای پنهان معمولاً در نگاه اول دیده نمی‌شوند.",
  "حتی یک نمودار مناسب می‌تواند بینشی بزرگ ایجاد کند.",
  "تحلیل داده یعنی تبدیل اعداد به تصمیم.",
  "هر مجموعه‌داده داستان منحصربه‌فرد خود را دارد.",
  "بینش‌های ارزشمند معمولاً از مقایسه داده‌ها به دست می‌آیند.",
  "داده‌ها زمانی ارزشمند هستند که قابل تفسیر باشند.",
  "تحلیل دقیق، اولین گام برای تصمیم‌گیری بهتر است.",
  "هوش مصنوعی در کنار آمار، تصویر کامل‌تری از داده‌ها ارائه می‌دهد.",
];

export const AnalysisLoadingOverlay = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setPhraseIndex((p) => (p + 1) % PHRASES.length),
      5000,
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex h-screen items-center justify-center opacity-100 backdrop-blur-md transition-opacity duration-400"
      style={{ backgroundColor: "hsl(var(--background) / 0.88)" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 size-120 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[130px]" />
      </div>

      <div className="relative flex flex-col items-center gap-5">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="border-border absolute inset-0 rounded-full border-2" />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-400/70"
            style={{ animation: "spin 2.6s linear infinite" }}
          />
          <div
            className="absolute inset-1.5 rounded-full border-2 border-transparent border-t-blue-400 border-r-blue-300/40"
            style={{
              animation: "spin 1.1s linear infinite reverse",
            }}
          />
          {/* Core */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-blue-600 shadow-lg shadow-violet-500/25">
            <SparklesIcon className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Label */}
        <div className="flex flex-col items-center gap-2">
          <p
            key={phraseIndex}
            className="text-center text-xl font-medium tracking-tight"
            style={{ animation: "fadeUp 350ms ease both" }}
          >
            {PHRASES[phraseIndex]}
          </p>
          <p className="text-muted text-base">در حال پردازش داده‌ها ...</p>
          <p className="text-muted text-base">
            این فرایند معمولاً فقط چند ثانیه طول می‌کشد.
          </p>
        </div>
      </div>
    </div>
  );
};
