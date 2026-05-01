"use client";

import {
  Toast,
  ToastContent,
  ToastContentValue,
  ToastDescription,
  ToastIndicator,
  ToastTitle,
} from "@heroui/react";
import { FC, PropsWithChildren } from "react";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Toast.Provider placement="top start">
        {({ toast: toastItem }) => {
          const content = toastItem.content as ToastContentValue;
          return (
            <Toast
              className="w-fit rounded-xl border"
              toast={toastItem}
              variant={content.variant}
            >
              <ToastContent dir="rtl">
                <div className="flex items-center gap-2">
                  <ToastIndicator variant={content.variant} />
                  <div className="flex flex-col">
                    {content.title ? (
                      <ToastTitle className="text-base font-bold">
                        {content.title}
                      </ToastTitle>
                    ) : null}
                    {content.description ? (
                      <ToastDescription>{content.description}</ToastDescription>
                    ) : null}
                  </div>
                </div>
              </ToastContent>
              <Toast.CloseButton className="absolute top-0 left-0 -translate-1/2" />
            </Toast>
          );
        }}
      </Toast.Provider>
      {children}
    </>
  );
};

export default Provider;
