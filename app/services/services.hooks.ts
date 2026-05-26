import { apiClient } from "@/lib/apiClient";
import { useMutation } from "@tanstack/react-query";
import {
  CheckPasswordRequest,
  DeleteAccountRequest,
  ResendOTPRequest,
  SignupRequest,
  UpdateUserRequest,
  VerifyEmailRequest,
} from "./interface";

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

export const useResendOTP = () =>
  useMutation({
    mutationKey: ["resendOTP"],
    mutationFn: (body: ResendOTPRequest) =>
      apiClient.post("/auth/resend-otp", { body }),
  });

export const useCheckPassword = () =>
  useMutation({
    mutationKey: ["checkPassword"],
    mutationFn: (body: CheckPasswordRequest) =>
      apiClient.post("/auth/check-password", { body }),
  });

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
