"use client";

import { cn } from "@/utils";
import { Card, toast } from "@heroui/react";
import { CheckIcon, UploadIcon } from "lucide-react";
import React, { useCallback } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

interface UploaderProps {
  className?: string;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  options?: DropzoneOptions;
}

const Uploader = (props: UploaderProps) => {
  const { file, setFile, options, className } = props;

  const onDropFiles = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
    },
    [setFile],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDropFiles,
    onDropRejected: () => toast.danger("خطا، آپلود فایل ناموفق بود."),
    accept: {
      "text/csv": [".csv"],
    },
    ...options,
  });

  return (
    <Card
      {...getRootProps()}
      variant="transparent"
      className={cn("flex cursor-pointer flex-col items-center", className)}
    >
      <div className="flex w-full flex-col items-center gap-4 rounded-xl border p-4">
        <input {...getInputProps()} />
        <Card.Header className="flex flex-col items-center gap-4">
          {!file ? (
            <>
              <div className="bg-muted/30 flex size-20 items-center justify-center rounded-2xl">
                <UploadIcon className="text-foreground size-10" />
              </div>
              <Card.Title className="text-center font-bold sm:text-2xl/8">
                فایل خود را اینجا رها کنید
                <br />
                <span className="text-muted text-lg">
                  یا برای انتخاب فایل کلیک کنید
                </span>
                <br />
                <span className="text-muted text-base">
                  پشتیبانی از فایل های CSV (تا ۵ مگابایت)
                </span>
              </Card.Title>
            </>
          ) : (
            <>
              <div className="bg-success flex size-20 items-center justify-center rounded-2xl">
                <CheckIcon className="text-background size-10" />
              </div>
              <Card.Title className="text-center font-bold sm:text-2xl/8">
                <span className="text-foreground text-2xl">آپلود تکمیل شد</span>
                <br />
                <span className="text-muted text-base">{file.name}</span>
              </Card.Title>
            </>
          )}
        </Card.Header>
      </div>
    </Card>
  );
};

export default Uploader;
