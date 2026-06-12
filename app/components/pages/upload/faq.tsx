"use client";

import { Accordion, Card } from "@heroui/react";
import { ChevronDownIcon } from "lucide-react";

const questions = [
  {
    title: "چه فرمت‌هایی پشتیبانی می‌شوند؟",
    content:
      "در حال حاضر می‌توانید فایل‌های CSV  را آپلود کنید. پشتیبانی از فرمت‌های بیشتر مانند Excel در آینده اضافه خواهد شد.",
  },
  {
    title: "آیا نمودارها به‌صورت خودکار ساخته می‌شوند؟",
    content:
      "بله. سیستم به‌صورت خودکار ساختار دیتاست را تحلیل کرده و مناسب‌ترین نمودارها و visualizationها را تولید می‌کند.",
  },
  {
    title: "تحلیل هوشمند داده‌ها چگونه انجام می‌شود؟",
    content:
      "پلتفرم نوع ستون‌ها، ارتباط بین داده‌ها، الگوها و روندها را تشخیص داده و به‌صورت خودکار insight و نمودار مناسب پیشنهاد می‌دهد.",
  },
  {
    title: "آیا اطلاعات و فایل‌های من امن هستند؟",
    content:
      "بله. فایل‌های آپلودشده به‌صورت امن پردازش می‌شوند و فقط از طریق حساب کاربری شما قابل دسترسی خواهند بود.",
  },
  {
    title: "حداکثر حجم فایل قابل آپلود چقدر است؟",
    content: "می‌توانید فایل‌هایی تا حجم ۵ مگابایت آپلود کنید",
  },
  {
    title: "آیا می‌توان نوع نمودارها را تغییر داد؟",
    content:
      "بله. می‌توانید بین انواع مختلف نمودار مانند Bar، Line، Area، Pie، Scatter و Treemap جابه‌جا شوید.",
  },
  {
    title: "آیا برای استفاده از این پلتفرم باید تحلیل داده بلد باشم؟",
    content:
      "خیر. این پلتفرم برای کاربران فنی و غیر فنی طراحی شده و به‌صورت خودکار نمودارها و تحلیل‌های مناسب را پیشنهاد می‌دهد.",
  },
  {
    title: "آیا امکان خروجی گرفتن از نمودارها و تحلیل‌ها وجود دارد؟",
    content:
      "بله. می‌توانید نمودارها و نتایج تحلیل را برای گزارش‌گیری یا ارائه خروجی بگیرید.",
  },
];

export const Faq = () => {
  return (
    <Card className="border">
      <Card.Header>
        <p className="text-foreground text-xl font-bold">سوالات متداول</p>
      </Card.Header>
      <Card.Content>
        <Accordion className="w-full" variant="surface">
          {questions.map((question, index) => (
            <Accordion.Item key={index}>
              <Accordion.Heading>
                <Accordion.Trigger>
                  <p className="text-foreground flex-1 text-right text-lg font-bold">
                    {question.title}
                  </p>
                  <Accordion.Indicator>
                    <ChevronDownIcon />
                  </Accordion.Indicator>
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body className="text-muted text-base font-semibold">
                  {question.content}
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card.Content>
    </Card>
  );
};
