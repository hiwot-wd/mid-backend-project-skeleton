import db from "#configs/database.js";

export async function calculateCartSubtotal(cartId, trx = db) {
  const row = await trx("cart_item as ci")
    .join("event_item as ei", "ci.event_item_id", "ei.id")
    .where("ci.cart_id", cartId)
    .sum({ subtotal: db.raw("ci.quantity * ei.price") })
    .first();

  return Number(row?.subtotal ?? 0);
}
