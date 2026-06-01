import { z } from "zod";
import { createUserSchema } from "./schema";

export type CreateUser = z.infer<typeof createUserSchema>