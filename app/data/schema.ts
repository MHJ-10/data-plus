import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string(),
  password: z.string(),
  nickname: z.string(),
});

export const insightSchema = z.object({
  insights: z
    .array(
      z.object({
        type: z.enum(["TREND", "INSIGHT", "WARNING", "CORRELATION"]),
        title: z.string().max(80),
        description: z.string().max(280),
        score: z.number().min(0.65).max(0.95),
      }),
    )
    .min(3)
    .max(6),
});
