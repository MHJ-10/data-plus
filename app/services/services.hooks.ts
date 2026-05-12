import { useMutation } from "@tanstack/react-query";
import { SignupRequest } from "./interface";
import { apiClient } from "@/lib/apiClient";

export const useSignup = () =>
  useMutation({
    mutationKey: ["signup"],
    mutationFn: (body: SignupRequest) =>
      apiClient.post("/auth/signup", {
        body,
      }),
  });
