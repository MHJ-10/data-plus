"use client";

import Uploader from "@/components/uploader";
import { usePostAnalyze } from "@/services";
import { Button, Card, Chip, Table } from "@heroui/react";
import Papa from "papaparse";
import { useState } from "react";

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

  const { mutate: analyze, isPending } = usePostAnalyze();

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

  const onStartAnalyze = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      analyze(formData);
    }
  };

  return (
    <>
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
              isPending={isPending}
              onClick={onStartAnalyze}
              aria-label="start-analyze"
            >
              شروع تحلیل
            </Button>
            <Button
              size="lg"
              variant="tertiary"
              className="text-foreground"
              isPending={isPending}
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
