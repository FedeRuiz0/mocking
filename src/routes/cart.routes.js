import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';

const router = Router();

// -- create a cart
router.post('/', CartController.createCart);

// -- get cart by ID
router.get('/:id', CartController.getCartById);

// -- add a product to cart
router.put('/:id', CartController.addProductToCart);

// -- add a quantity of a product to a cart
router.put('/:id/product/:pid', CartController.addProductQuantityToCart);

// -- delete a product from cart
router.delete('/:id/product/:pid', CartController.deleteProductFromCart);

// -- delete ALL products from cart
router.delete('/:id', CartController.deleteAllProductsFromCart);

export default router;