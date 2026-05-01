import { toPng } from "html-to-image";
import { RefObject, useCallback } from "react";

export const useDownloadPNG = (ref: RefObject<HTMLDivElement | null>) => {
  return useCallback(
    (name?: string) => {
      if (ref.current === null) {
        return;
      }

      toPng(ref.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = name || "image.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [ref],
  );
};
