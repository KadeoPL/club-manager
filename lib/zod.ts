import { z } from "zod";

export const signInSchema = z.object({
  name: z
    .string({ error: "Login jest wymagany" })
    .min(1, { message: "Login jest wymagany" }),
  password: z
    .string({ error: "Hasło jest wymagane" })
    .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
});

export const addSponsorSchema = z.object({
  name: z
    .string({ error: "Nazwa sponsora jest wymagana" })
    .min(1, { message: "Nazwa sponsora jest wymagana" }),
  logo: z
    .instanceof(File)
    .refine((file) => file.size <= 5_000_000, {
      message: "Maksymalny rozmiar pliku to 1MB",
    })
    .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
      message: "Dozwolone formaty to .png i .jpeg",
    })
    .optional(),
  isPartnership: z.boolean({
    error: "To pole jest wymagane",
  }),
});

export const addTeamSchema = z.object({
  name: z
    .string({ error: "Nazwa drużyny jest wymagana" })
    .min(1, { message: "Nazwa drużyny jest wymagana" }),
});
