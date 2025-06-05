import { z } from "zod";

export const categorySchema = z.object({
  image: z.any().optional(),
  arName: z.string().min(3, "الاسم قصير جداً"),
  enName: z.string().min(3, "الاسم قصير جداً"),
  frName: z.string().min(3, "الاسم قصير جداً"),
  arDescription: z.string().min(3, "الوصف قصير جداً"),
  enDescription: z.string().min(3, "الوصف قصير جداً"),
  frDescription: z.string().min(3, "الوصف قصير جداً"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
