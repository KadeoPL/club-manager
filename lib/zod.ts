import { z } from "zod";

export const signInSchema = z.object({
  name: z
    .string({ required_error: "Login jest wymagany" })
    .min(1, { message: "Login jest wymagany" }),
  password: z
    .string({ required_error: "Hasło jest wymagane" })
    .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
});
