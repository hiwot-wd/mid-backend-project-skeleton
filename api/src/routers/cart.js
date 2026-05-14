import express from "express";
import { auth } from "#middlewares/auth.js";
import {
  getCart,
  addItem,
  updateItem,
  removeItem,
  checkout,
} from "#controllers/cart.js";

const router = express.Router();

// Protect all cart routes
router.use(auth);

router.get("/", getCart);
router.post("/items", addItem);
router.patch("/items/:itemId", updateItem);
router.delete("/items/:itemId", removeItem);
router.post("/checkout", checkout);
export default router;
