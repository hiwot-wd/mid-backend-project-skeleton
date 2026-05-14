import express from "express";
import { auth } from "#middlewares/auth.js";
import { getOrders, getOrder } from "#controllers/order.js";

const router = express.Router();
//Protect all order routes
router.use(auth);
//GET /api/orders
router.get("/", getOrders);
//GET /api/orders/:orderId
router.get("/:orderId", getOrder);

export default router;
