import z from "zod";

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Please provide username!",
    })
    .nonempty("Please provide username!"),
  password: z
    .string({
      required_error: "Please provide password!",
    })
    .nonempty("Please provide password!"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
