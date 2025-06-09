import { z } from "zod";

export const vendorSchema = z.object({
  arName: z.string().min(3, "الاسم قصير جداً"),
  enName: z.string().min(3, "الاسم قصير جداً"),
  frName: z.string().min(3, "الاسم قصير جداً"),
  phone: z.string().min(5, { message: "يجب ان يكون الهاتف اكثر من 5 حروف" }),
  orderTime: z.string(),
  mainCategory: z.string(),
  subCategory: z.string(),
  homeCategory: z.string(),
  deliveryCost: z.string(),
  password: z.string().optional(),
  avatar: z.any().optional(),
  cover: z.any().optional(),
});

export type VendorFormData = z.infer<typeof vendorSchema>;
