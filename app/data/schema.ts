import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string(),
  password: z.string(),
  nickname: z.string(),
});
