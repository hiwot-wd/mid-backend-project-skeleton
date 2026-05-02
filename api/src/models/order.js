import db from "#configs/database.js";

export async function createOrder(userId, trx = db) {
  const [order] = await trx("customer_order")
    .insert({
      user_id: userId,
      status: "pending",
      total_amount: 0,
    })
    .returning("*");

  return order;
}

export async function snapshotOrderItems(orderId, cartId, trx = db) {
  await trx("order_item").insert(function () {
    this.select([
      trx.raw("?", [orderId]),
      "ci.event_item_id",
      "ci.quantity",
      "ei.price",
    ])
      .from("cart_item as ci")
      .join("event_item as ei", "ci.event_item_id", "ei.id")
      .where("ci.cart_id", cartId);
  });
}

export async function updateOrderTotal(orderId, trx = db) {
  const row = await trx("order_item")
    .where({ order_id: orderId })
    .sum({ total: db.raw("quantity * price_each") })
    .first();

  const total = Number(row?.total ?? 0);

  await trx("customer_order")
    .where({ id: orderId })
    .update({ total_amount: total });

  return total;
}
