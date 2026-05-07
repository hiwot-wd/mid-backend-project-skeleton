import db from "#configs/database.js";

export async function calculateCartSubtotal(cartId, trx = db) {
  const row = await trx("cart_item as ci")
    .join("event_item as ei", "ci.event_item_id", "ei.id")
    .where("ci.cart_id", cartId)
    .sum({ subtotal: db.raw("ci.quantity * ei.price") })
    .first();

  return Number(row?.subtotal ?? 0);
}
export async function getOrCreateCartForUser({ userId, cartToken }) {
  // Authenticated user cart
  if (userId) {
    let cart = await db("cart").where({ user_id: userId }).first();

    if (!cart) {
      cart = await db("cart")
        .insert({ user_id: userId })
        .returning("*")
        .then((rows) => rows[0]);
    }

    return cart;
  }

  // Guest cart
  let cart = await db("cart").where({ cart_token: cartToken }).first();

  if (!cart) {
    cart = await db("cart")
      .insert({ cart_token: cartToken })
      .returning("*")
      .then((rows) => rows[0]);
  }

  return cart;
}
