"use client";

import { cn } from "@/utils";
import { Card } from "@heroui/react";
import { File, Upload } from "lucide-react";
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
      className={cn("flex cursor-pointer flex-col items-center", className)}
    >
      <div className="flex w-full flex-col items-center gap-4 rounded-xl border-2 border-dashed p-2">
        <input {...getInputProps()} />
        <Upload />
        <Card.Header>
          <Card.Title className="text-center text-base sm:text-lg">
            فایل خود را بکشید و رها کنید یا برای آپلود کلیک کنید
          </Card.Title>
        </Card.Header>
      </div>

      <Card.Footer className="w-full">
        {acceptedFiles.map((file) => (
          <Card
            key={file.name}
            variant="secondary"
            className="flex w-full flex-row items-center justify-between gap-2 border p-4"
          >
            <div className="flex items-center gap-2">
              <File className="size-4" />
              <p>{file.name}</p>
            </div>
            <p>{(file.size / 1000 / 1000).toPrecision(2)} مگابایت</p>
          </Card>
        ))}
        <Card.Description></Card.Description>
      </Card.Footer>
    </Card>
  );
};

export default Uploader;
