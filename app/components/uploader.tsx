"use client";

import { cn } from "@/utils";
import { Card } from "@heroui/react";
import { CheckIcon, UploadIcon } from "lucide-react";
import { useCallback } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

interface UploaderProps {
  className?: string;
  onDrop: (files: File[]) => void;
  options?: DropzoneOptions;
}

const Uploader = ({ onDrop, options, className }: UploaderProps) => {
  const onDropFiles = useCallback(
    (acceptedFiles: File[]) => {
      onDrop(acceptedFiles);
    },
    [onDrop],
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: onDropFiles,
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
          {!acceptedFiles.length ? (
            <>
              <div className="bg-muted/30 flex size-20 items-center justify-center rounded-2xl">
                <UploadIcon className="size-10" />
              </div>
              <Card.Title className="text-center font-bold sm:text-2xl/8">
                فایل خود را اینجا رها کنید
                <br />
                <span className="text-muted text-lg">
                  یا برای انتخاب فایل کلیک کنید
                </span>
                <br />
                <span className="text-muted text-base">
                  پشتیبانی از فایل های CSV (تا ۱۰ مگابایت)
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
                <span className="text-muted text-base">
                  {acceptedFiles[0].name}
                </span>
              </Card.Title>
            </>
          )}
        </Card.Header>
      </div>
    </Card>
  );
};

export default Uploader;
