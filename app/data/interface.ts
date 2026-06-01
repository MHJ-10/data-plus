import { z } from "zod";
import { createUserSchema } from "./schema";

export type CreateUser = z.infer<typeof createUserSchema>;

interface ActionResponse {
  error: string | null;
  message: string | null;
}

export type PromsieActionResponse = Promise<ActionResponse>;
