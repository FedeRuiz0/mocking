import { Router } from "express";
import CartValidator from "../validators/cart.validator.js";
import ProductValidator from "../validators/product.validator.js";
import { __dirname, passportCall } from '../utils.js';

const router = Router();

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/products', passportCall('current'), async (req, res) => {
    if (!req.user) {
        return res.redirect('/login')
    }

    const {page, limit, sort, category, status} = req.query;
    const products = await ProductValidator.getProducts({page, limit, sort, category, status})
    
    res.render('products', { products, user: req.user})
})

router.get('/products/:id', async (req, res) => {
    const product = await ProductValidator.getProductByID(req.params.id)
    
    res.render('productDetails', { product })
})

router.get('/carts/:cid', async (req,res) => {
    const cart = await CartValidator.getCartByID(req.params.cid)

    console.log(cart)

    res.render('cart', { cart })
})

router.get('/login', async (req, res) => {    
    res.render('login')
})

router.get('/register', async (req, res) => {    
    res.render('register')
})

function createProduct(data) {
    const productExists = checkIfProductExists(data.name);
    if (productExists) {
      const error = new Error('Product already exists');
      error.code = 'product_already_exists';
      throw error;
    }
    // Resto de la lógica para crear el producto...
  }
  
  function addToCart(data) {
    const product = getProductById(data.productId);
    if (!product) {
      const error = new Error('Product not found');
      error.code = 'product_not_found';
      throw error;
    }
    if (data.quantity <= 0) {
      const error = new Error('Invalid cart item data');
      error.code = 'invalid_cart_item_data';
      throw error;
    }
    // Resto de la lógica para agregar el producto al carrito...
  }
  

export default router;