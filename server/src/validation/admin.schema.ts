import { z } from "zod";

export const adminLoginSchema = z.object({
  body: z.object({
    email: z.email("Wrong email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>["body"];
