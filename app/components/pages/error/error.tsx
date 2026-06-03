"use client";

import { ErrorIllustrationIcon } from "@/components/icons";
import { Button, Card } from "@heroui/react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ErrorProps {
  error?: Error;
  resetError?: () => void;
}

const Error = ({ error, resetError }: ErrorProps) => {
  const router = useRouter();

  const [showDetails, setShowDetails] = useState(false);

  const handleRetry = () => {
    if (resetError) {
      resetError();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-2xl text-center">
        <div className="animate-in fade-in zoom-in-95 mb-8 duration-700">
          <ErrorIllustrationIcon />
        </div>

        <h1 className="animate-in fade-in slide-in-from-bottom-6 mb-4 text-4xl font-semibold delay-100 duration-700">
          مشکلی پیش آمد
        </h1>

        <p className="text-muted animate-in fade-in slide-in-from-bottom-6 mx-auto mb-8 max-w-md text-xl delay-200 duration-700">
          یک خطای غیرمنتظره رخ داده است، اما داده‌های شما کاملاً محفوظ است.
          لطفاً دوباره تلاش کنید یا به پیشخوان بازگردید.
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-6 mb-8 flex flex-wrap justify-center gap-4 delay-300 duration-700">
          <Button size="lg" variant="danger-soft" onClick={handleRetry}>
            تلاش مجدد
          </Button>

          <Button
            size="lg"
            variant="tertiary"
            onClick={() => router.replace("/")}
          >
            بازگشت به پیشخوان
          </Button>
        </div>

        {error && (
          <div className="animate-in fade-in slide-in-from-bottom-6 delay-400 duration-700">
            <Button
              variant="ghost"
              onClick={() => setShowDetails(!showDetails)}
            >
              اطلاعات فنی
              {showDetails ? (
                <ChevronUpIcon className="size-4" />
              ) : (
                <ChevronDownIcon className="size-4" />
              )}
            </Button>

            {showDetails && (
              <Card variant="secondary" className="mt-2 border">
                <Card.Header className="space-y-2">
                  <p className="text-destructive text-right text-sm font-medium">
                    متن خطا:
                  </p>
                  <p className="text-muted text-left break-all">
                    {error.message}
                  </p>
                </Card.Header>
                <Card.Content>
                  {error.stack && (
                    <>
                      <p className="text-destructive mb-2 text-right text-sm font-medium">
                        جزئیات اجرای خطا:
                      </p>
                      <Card className="bg-foreground text-danger h-50 overflow-auto border p-2 text-left">
                        {error.stack}
                      </Card>
                    </>
                  )}
                </Card.Content>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Error;
