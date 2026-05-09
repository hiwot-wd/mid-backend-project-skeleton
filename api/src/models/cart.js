import db from "#configs/database.js";

// Calculate subtotal
export async function calculateCartSubtotal(cartId, trx = db) {
  const row = await trx("cart_item as ci")
    .join("event_item as ei", "ci.event_item_id", "ei.id")
    .where("ci.cart_id", cartId)
    .sum({ subtotal: db.raw("ci.quantity * ei.price") })
    .first();

  return Number(row?.subtotal ?? 0);
}

// Get or create cart
export async function getOrCreateCartForUser({ userId, cartToken }) {
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

  let cart = await db("cart").where({ cart_token: cartToken }).first();
  if (!cart) {
    cart = await db("cart")
      .insert({ cart_token: cartToken })
      .returning("*")
      .then((rows) => rows[0]);
  }
  return cart;
}

// Add item to cart
export async function addItemToCart(
  { cartId, eventItemId, quantity = 1 },
  trx = db,
) {
  const existing = await trx("cart_item")
    .where({ cart_id: cartId, event_item_id: eventItemId })
    .first();

  if (existing) {
    return trx("cart_item")
      .where({ cart_id: cartId, event_item_id: eventItemId })
      .update({ quantity: existing.quantity + quantity })
      .returning("*")
      .then((rows) => rows[0]);
  }

  return trx("cart_item")
    .insert({
      cart_id: cartId,
      event_item_id: eventItemId,
      quantity,
    })
    .returning("*")
    .then((rows) => rows[0]);
}

// Update item quantity
export async function updateCartItem(
  { cartId, eventItemId, quantity },
  trx = db,
) {
  return trx("cart_item")
    .where({ cart_id: cartId, event_item_id: eventItemId })
    .update({ quantity })
    .returning("*")
    .then((rows) => rows[0]);
}

// Remove item
export async function removeCartItem({ cartId, eventItemId }, trx = db) {
  return trx("cart_item")
    .where({ cart_id: cartId, event_item_id: eventItemId })
    .del();
}
// List all items in cart
export async function listCartItems(cartId, trx = db) {
  return trx("cart_item as ci")
    .join("event_item as ei", "ci.event_item_id", "ei.id")
    .select(
      "ci.id",
      "ci.quantity",
      "ei.id as event_item_id",
      "ei.name",
      "ei.price",
    )
    .where("ci.cart_id", cartId);
}
