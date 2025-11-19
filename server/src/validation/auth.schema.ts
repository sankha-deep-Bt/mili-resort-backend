import { z } from "zod";

/* ---------- Register Validator ---------- */
export const registerSchema = z
  .object({
    body: z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.email("Invalid email"),
      phoneNumber: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .optional(),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(6),
    }),
  })
  .refine((data) => data.body.password === data.body.confirmPassword, {
    message: "Passwords do not match",
    path: ["body", "confirmPassword"],
  });

/* ---------- Login Validator ---------- */
export const loginSchema = z.object({
  body: z.object({
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
