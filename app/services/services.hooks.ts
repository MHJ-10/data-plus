import { apiClient } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";
import { SignupRequest, VerifyEmailRequest } from "./interface";

export const useSignup = () =>
  useMutation({
    mutationKey: ["signup"],
    mutationFn: (body: SignupRequest) =>
      apiClient.post("/auth/signup", {
        body,
      }),
  });

export const useVerifyEmail = () =>
  useMutation({
    mutationKey: ["verify-email"],
    mutationFn: (body: VerifyEmailRequest) =>
      apiClient.post("/auth/verify-email", {
        body,
      }),
  });
