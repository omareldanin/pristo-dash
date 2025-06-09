import { z } from "zod";

export const deliverySchema = z.object({
  avatar: z.any().optional(),
  name: z.string().min(3, "الاسم قصير جداً"),
  phone: z.string().min(6),
  password: z.string().min(6),
});

export type DeliveryFormData = z.infer<typeof deliverySchema>;
