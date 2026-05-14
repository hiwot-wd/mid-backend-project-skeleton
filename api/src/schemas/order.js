import { z } from "zod";

export const OrderIdParam = z.object({
  orderId: z
    .string()
    .regex(/^\d+$/, "orderId must be a number")
    .transform(Number),
});
