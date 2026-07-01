import { z } from "zod";
import { createUserSchema } from "./schema";
import { Insight } from "@/generated/prisma/client";

interface ActionResponse {
  error?: string | null;
  message?: string | null;
}

export type PromsieActionResponse = Promise<ActionResponse>;

export type SignupPayload = z.infer<typeof createUserSchema>;

export interface ResendOTPPayload {
  email: string;
  nickname: string;
}

export interface VerifyEmailPayload {
  email: string;
  password: string;
  otp: string;
}

export interface CheckPasswordPayload {
  id: string;
  password: string;
}

export interface UpdateUserPayload {
  id: string;
  nickName: string;
  newPassword?: string;
}

export interface RunAnalysisParams {
  analysisId: string;
  data: unknown[];
}

export interface AddInsightsPayload {
  id: string;
  insights: Pick<Insight, "title" | "type" | "score" | "description">[];
}
