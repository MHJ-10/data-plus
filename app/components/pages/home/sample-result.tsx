import { Card } from "@heroui/react";

const SampleResult = () => {
  return (
    <Card className="animate-fadeIn border [animation-range:entry] [animation-timeline:view()] lg:animate-none">
      <div className="border-border from-accent/5 to-accent/10 flex items-center gap-2 rounded-sm border-b bg-linear-to-r p-3">
        <div className="flex gap-2">
          <div className="bg-danger size-3 rounded-full" />
          <div className="bg-warning size-3 rounded-full" />
          <div className="bg-success size-3 rounded-full" />
        </div>
        <p className="flex-1 text-center">
          dashboard.csv — تحلیل خودکار در ۰.۳ ثانیه
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 p-8 sm:grid-cols-3">
        <div className="col-span-2 space-y-4">
          <div className="from-success/10 to-success/30 flex h-48 items-center justify-center rounded-xl bg-linear-to-br">
            <p>پیش‌نمایش نمودار</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="from-danger/10 to-danger/30 h-32 rounded-xl bg-linear-to-br" />
            <div className="from-warning/10 to-warning/30 h-32 rounded-xl bg-linear-to-br" />
          </div>
        </div>
        <div className="my-auto space-y-3">
          <div className="bg-accent/10 rounded-xl p-4">
            <p className="mb-2 text-xs">💡 یک نگاه سریع</p>
            <p className="text-sm">درآمد در سه‌ماهه دوم ۳۴٪ رشد داشته است</p>
          </div>
          <div className="bg-accent-soft rounded-xl p-4">
            <p className="text-muted-foreground mb-2 text-xs">
              💡 یک نگاه سریع
            </p>
            <p className="text-sm">
              ترافیک موبایل با افزایش ۲.۱ برابری افزایش یافته است
            </p>
          </div>
          <div className="bg-accent-soft-hover rounded-xl p-4">
            <p className="text-muted-foreground mb-2 text-xs">
              💡 یک نگاه سریع
            </p>
            <p className="text-sm">دسته‌بندی برتر: الکترونیک</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SampleResult;
