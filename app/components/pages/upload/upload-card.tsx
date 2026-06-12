"use client";

import { Uploader } from "@/components";
import { Button, Card, Chip, Table, toast } from "@heroui/react";
import Papa from "papaparse";
import { useState, useTransition } from "react";
import { createAnalysis } from "@/data";
import { useRouter } from "next/navigation";

interface DatasetPreviewTable {
  size: number;
  columns: any[];
  rows: {
    length: number;
    sample: any[];
  };
}

export const UploadCard = () => {
  const [preview, setPreview] = useState<DatasetPreviewTable | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const router = useRouter();

  const [pending, startTransition] = useTransition();

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

  const onStartAnalyze = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      startTransition(async () => {
        await createAnalysis(formData)
          .then((res) => {
            toast.info(res.message);
            router.push(`/dashboard/analyses/${res.id}`);
          })
          .catch((err) => toast.danger(err.message));
      });
    }
  };

  return (
    <>
      <Uploader
        file={file}
        setFile={setFile}
        options={{
          onDrop: onDropFiles,
          maxSize: 5 * 1_000_000, // 5MB
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
            <Table variant="secondary">
              <Table.ScrollContainer>
                <Table.Content aria-label="dataset-table">
                  <Table.Header>
                    {preview.columns.map((header, i) => (
                      <Table.Column
                        key={header}
                        isRowHeader={i === 0}
                        className="text-center text-lg font-bold first:rounded-l-none first:rounded-r-2xl first:after:w-0 last:rounded-l-2xl last:rounded-r-none last:after:w-px"
                      >
                        {header}
                      </Table.Column>
                    ))}
                  </Table.Header>
                  <Table.Body>
                    {preview.rows.sample.map((row, i) => (
                      <Table.Row key={i}>
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
              isPending={pending}
              onClick={onStartAnalyze}
              aria-label="start-analyze"
            >
              شروع تحلیل
            </Button>
            <Button
              size="lg"
              variant="tertiary"
              className="text-foreground"
              isPending={pending}
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
    </>
  );
};
