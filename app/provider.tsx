"use client";

import { Toast } from "@heroui/react";
import { FC, PropsWithChildren } from "react";

const Provider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Toast.Provider />
      {children}
    </>
  );
};

export default Provider;
