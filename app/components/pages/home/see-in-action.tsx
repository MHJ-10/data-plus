import { Card, Surface } from "@heroui/react";
import { DatabaseIcon, InfoIcon, TrendingUpIcon } from "lucide-react";

const SeeInAction = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <h3 className="text-center text-4xl font-bold">
        ببینید در عمل چگونه کار می‌کند <br />
        <span className="text-muted text-2xl font-normal">
          مشاهده کنید که داده‌های شما چگونه در لحظه به بینش‌های قابل‌استفاده
          تبدیل می‌شوند
        </span>
      </h3>

      <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Surface className="text-background from-success/80 to-success flex min-w-[320px] flex-col gap-3 rounded-3xl bg-linear-to-l p-6 text-lg font-bold">
            <div className="w-fit rounded-lg bg-success/70 p-2">
              <TrendingUpIcon />
            </div>
            <h3>رشد ۶۹٪ درآمد</h3>
            <p>
              با مقایسه سه‌ماهه اول و دوم ۲۰۲۶، روند رشد ماه‌به‌ماه به‌صورت
              پیوسته مشاهده می‌شود
            </p>
          </Surface>
          <Surface
            className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6"
            variant="secondary"
          >
            <InfoIcon />
            <h3 className="text-foreground text-base font-semibold">
              اوج در آوریل
            </h3>
            <p className="text-muted text-sm">
              بیشترین درآمد ثبت‌شده: ۶٬۲۰۰ دلار با ۳۴۰ کاربر فعال
            </p>
          </Surface>
          <Surface
            className="flex min-w-[320px] flex-col gap-3 rounded-3xl p-6"
            variant="secondary"
          >
            <DatabaseIcon />
            <h3 className="text-foreground text-base font-semibold">
              پیشتازی الکترونیک
            </h3>
            <p className="text-muted text-sm">
              دسته برتر با سهم ۳۶٪ از بازار، پس از آن پوشاک با ۲۷٪
            </p>
          </Surface>
        </div>
        <Card />
      </div>
    </div>
  );
};

export default SeeInAction;
