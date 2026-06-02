import { apiClient } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";

export const usePostAnalyze = () =>
  useMutation({
    mutationKey: ["postAnalyze"],
    mutationFn: (body: FormData) =>
      apiClient.post("/analyze", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
  });
