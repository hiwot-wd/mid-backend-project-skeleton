import {
  getOrCreateCartForUser,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  listCartItems,
  checkoutCart,
} from "#models/cart.js";

import { CartAddItemInput, CartUpdateItemInput } from "#schemas/cart.js";

export async function getCart(req, res, next) {
  try {
    const cart = await getOrCreateCartForUser({
      userId: req.user?.id,
      cartToken: req.cookies?.cart_token,
    });

    const items = await listCartItems(cart.id);

    res.json({
      data: {
        cart,
        items,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function addItem(req, res, next) {
  try {
    const input = CartAddItemInput.parse(req.body);

    const cart = await getOrCreateCartForUser({
      userId: req.user?.id,
      cartToken: req.cookies?.cart_token,
    });

    const item = await addItemToCart(cart.id, input);

    res.status(201).json({ data: item });
  } catch (error) {
    next(error);
  }
}

export async function updateItem(req, res, next) {
  try {
    const input = CartUpdateItemInput.parse(req.body);
    const { itemId } = req.params;

    const updated = await updateCartItem(itemId, input);

    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
}

export async function removeItem(req, res, next) {
  try {
    const { itemId } = req.params;

    await removeCartItem(itemId);

    res.json({ data: { message: "Item removed" } });
  } catch (error) {
    next(error);
  }
}
//Transactional checkout
export async function checkout(req, res, next) {
  try {
    const cart = await getOrCreateCartForUser({
      userId: req.user?.id,
      cartToken: req.cookies?.cart_token,
    });

    const result = await checkoutCart(cart.id);

    res.json({ data: result });
  } catch (error) {
    next(error);
  }
}
