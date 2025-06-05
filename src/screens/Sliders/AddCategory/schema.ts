import { z } from "zod";

export const categorySchema = z.object({
  image: z.any(),
  order: z.string(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
