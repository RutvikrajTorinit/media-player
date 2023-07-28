import z from "zod";

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Username is required!"
    })
    .min(3, "Minimum 3 characters required!")
    .nonempty("Username is required!"),
  password: z
    .string({
      required_error: "Password is required!"
    })
    .nonempty("Password is required!")
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
