import { listOrdersForUser, getOrderById } from "#models/order.js";

export async function getOrders(req, res, next) {
  try {
    const orders = await listOrdersForUser(req.user.id);
    res.json({ data: orders });
  } catch (error) {
    next(error);
  }
}

export async function getOrder(req, res, next) {
  try {
    const { orderId } = req.params;

    const result = await getOrderById(orderId);

    if (!result) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ data: result });
  } catch (error) {
    next(error);
  }
}
