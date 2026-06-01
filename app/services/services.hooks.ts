import { apiClient } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";
import { DeleteAccountRequest, UpdateUserRequest } from "./interface";

export const useUpdateUser = () =>
  useMutation({
    mutationKey: ["updateUser"],
    mutationFn: (body: UpdateUserRequest) =>
      apiClient.post("/auth/update-user", { body }),
  });

export const useDeleteAccount = () =>
  useMutation({
    mutationKey: ["deleteAccount"],
    mutationFn: (body: DeleteAccountRequest) =>
      apiClient.post("/auth/delete-account", { body }),
  });

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
