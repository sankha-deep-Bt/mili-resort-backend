import { z } from "zod";

export const adminLoginSchema = z.object({
  body: z.object({
    username: z.string("Wrong username"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>["body"];
