import { Router } from 'express';
import ProductController from '../controllers/products.controller.js';

const router = Router();

// -- get all products
router.get('/', ProductController.getAllProducts); 

// -- get a product by ID
router.get('/:id', ProductController.getProductByID);

// -- add a new product
router.post('/', ProductController.addProduct);

// -- edit a product information
router.put('/:id', ProductController.editProduct);

// -- delete a product from the list
router.delete('/:id', ProductController.deleteProduct);

export default router;