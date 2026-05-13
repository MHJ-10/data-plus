import { toast } from "@heroui/react";
import { MutationCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type CustomError = AxiosError<{
  error?: string;
}>;

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: CustomError;
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
  mutationCache: new MutationCache({
    onError: (error) => {
      const errorMessage = error.response?.data.error || "خطا در انجام عملیات";
      toast.danger(errorMessage);
    },
  }),
});
