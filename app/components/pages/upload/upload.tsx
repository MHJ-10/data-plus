"use client";

import { Uploader } from "@/components";
import { Button, Card, Chip, Table, toast } from "@heroui/react";
import {
  BarChart3Icon,
  FileSpreadsheetIcon,
  LightbulbIcon,
  ShieldIcon,
} from "lucide-react";
import Papa from "papaparse";
import { useState } from "react";

const uploadFeatures = [
  {
    title: "فرمت‌های پشتیبانی‌شده",
    description:
      "آپلود فایل‌های CSV تا حجم ۱۰ مگابایت با پردازش سریع و خودکار داده‌ها",
    icon: FileSpreadsheetIcon,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "نمودارهای تولیدشده با هوش مصنوعی",
    description: "تولید خودکار نمودارها بر اساس الگوهای موجود در داده‌های شما",
    icon: BarChart3Icon,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "بینش‌های خودکار",
    description:
      "دریافت بینش‌های مبتنی بر هوش مصنوعی، روندها و شناسایی ناهنجاری‌ها",
    icon: LightbulbIcon,
    color: "from-green-500 to-green-600",
  },
  {
    title: "امن و خصوصی",
    description: "داده‌های شما رمزنگاری و با امنیت سطح سازمانی پردازش می‌شوند",
    icon: ShieldIcon,
    color: "from-orange-500 to-orange-600",
  },
];

interface DatasetPreviewTable {
  size: number;
  columns: any[];
  rows: {
    length: number;
    sample: any[];
  };
}

const Upload = () => {
  const [preview, setPreview] = useState<DatasetPreviewTable | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onDropFiles = async ([file]: File[]) => {
    setFile(file);
    const text = await file.text();

    const fileSize = file.size;

    const { data } = Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    setPreview({
      columns: data ? Object.keys(data[0] as object) : [],
      rows: {
        length: data.length,
        sample: data ? data.slice(0, 5) : [],
      },
      size: fileSize,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-foreground text-3xl font-bold">آپلود دیتاست</p>
        <p className="text-muted text-xl font-semibold">
          دیتاست خود را بارگذاری کنید و بینش‌های هوشمند را به‌صورت خودکار دریافت
          کنید
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {uploadFeatures.map(({ icon: Icon, title, description, color }) => (
          <Card key={title} className="border p-6">
            <Card.Header
              className={`flex size-12 items-center justify-center rounded-3xl bg-linear-to-r ${color}`}
            >
              <Icon className="text-background size-6" />
            </Card.Header>
            <Card.Content>
              <p className="text-2xl font-bold">{title}</p>
              <p className="text-muted text-lg font-semibold">{description}</p>
            </Card.Content>
          </Card>
        ))}
      </div>

      <Uploader
        file={file}
        setFile={setFile}
        options={{
          onDrop: onDropFiles,
          maxSize: 1_000_000, // 10MB
        }}
      />

      {preview?.rows.length ? (
        <Card className="border">
          <Card.Header className="flex gap-4">
            <p className="text-foreground text-xl font-bold">
              پیش‌نمایش دیتاست
            </p>
            <div className="space-y-4 space-x-4">
              <Chip size="lg">تعداد ردیف‌ها: {preview.rows.length}</Chip>
              <Chip size="lg">تعداد ستون‌ها: {preview.columns.length}</Chip>
              <Chip size="lg">
                سایز: {(preview.size / Math.pow(10, 3)).toFixed()} کیلوبایت
              </Chip>
            </div>
          </Card.Header>
          <Card.Content>
            <Table dir="ltr" variant="secondary">
              <Table.ScrollContainer>
                <Table.Content>
                  <Table.Header>
                    {preview.columns.map((header, i) => (
                      <Table.Column
                        key={header}
                        isRowHeader={i === 0}
                        className="text-center text-lg font-bold"
                      >
                        {header}
                      </Table.Column>
                    ))}
                  </Table.Header>
                  <Table.Body>
                    {preview.rows.sample.map((row, i) => (
                      <Table.Row
                        key={i}
                        className={`${i % 2 === 0 ? "bg-muted/30" : "bg-muted/10"}`}
                      >
                        {preview.columns.map((header) => (
                          <Table.Cell
                            key={header}
                            className="text-center font-bold"
                          >
                            {row[header]}
                          </Table.Cell>
                        ))}
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </Card.Content>
          <Card.Footer className="flex gap-4">
            <Button
              size="lg"
              variant="tertiary"
              className="bg-foreground text-background"
            >
              شروع آنالیز
            </Button>
            <Button
              size="lg"
              variant="tertiary"
              onClick={() => {
                setPreview(null);
                setFile(null);
              }}
            >
              انتخاب مجدد
            </Button>
          </Card.Footer>
        </Card>
      ) : null}
    </div>
  );
};

export default Upload;
