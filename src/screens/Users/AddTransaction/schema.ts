import { z } from "zod";

export const transactionSchema = z.object({
  amount: z.string().optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
