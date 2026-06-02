import { NotFoundIllustrationIcon } from "@/components/icons";
import { Navigation } from "./navigation";

const NotFound = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-2xl text-center">
        <div className="animate-in fade-in zoom-in-95 mb-8 duration-700">
          <NotFoundIllustrationIcon />
        </div>

        <h1 className="animate-in fade-in slide-in-from-bottom-6 from-accent/30 via-accent/70 to-accent mb-4 bg-linear-to-b bg-clip-text text-6xl font-bold text-transparent delay-100 duration-700">
          404
        </h1>

        <h2 className="animate-in fade-in slide-in-from-bottom-6 text-foreground mb-4 text-4xl font-semibold delay-200 duration-700">
          صفحه موردنظر پیدا نشد
        </h2>

        <p className="text-muted animate-in fade-in slide-in-from-bottom-6 mx-auto mb-8 max-w-md text-xl delay-300 duration-700">
          صفحه‌ای که به دنبال آن هستید پیدا نشد یا دیگر در دسترس نیست.
        </p>

        <Navigation />
      </div>
    </div>
  );
};

export default NotFound;
