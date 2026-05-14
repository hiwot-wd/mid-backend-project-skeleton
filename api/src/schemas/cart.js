import { z } from "zod";
export const CartAddItemInput = z.object({
  event_item_id: z.number().int().positive(),
  quantity: z.number().int().positive(),
});
export const CartUpdateItemInput = z.object({
  quantity: z.number().int().positive(),
});
