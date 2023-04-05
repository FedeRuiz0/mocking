import cartsDao from "../dao/carts.dao.js";

class CartValidator{
    async createCart(){
        const cart = await cartsDao.createCart();
        console.log(cart)
        return cart;
    }

    async getCartByID(id){
        if(!id) throw new Error('Product ID is required.');

        const cart = await cartsDao.getByID(id);
        return cart;
    }

    async addProductToCart(id, list){
        if(!id) throw new Error('Cart ID is required.');

        list.forEach( async (data) => {
            let {product, quantity} = data;

            if(!product) throw new Error('Product ID is required.');
            if(quantity && isNaN(quantity)) throw new Error('Quantity must be a number.')

            // -- checks if the product is already in the cart, to not accidentally add twice.
            const productInCart = await cartsDao.findProduct(id, product);
            if(productInCart){
                await cartsDao.addQuantity(id, product, quantity || 1);
            }else{
                await cartsDao.addProduct(id, product, quantity || 1);
            }
        })
            
        return await cartsDao.getByID(id);
    }

    async addQuantity(id, product, quantity){
        if(!id) throw new Error('Cart ID is required.');
        if(!product) throw new Error('Product ID is required.');
        if(!quantity) throw new Error('Quantity is required.');

        if(isNaN(quantity)){
            throw new Error('Quantity must be a number.')
        }

        const productInCart = await cartsDao.findProduct(id, product);
        console.log(productInCart)
        if(!productInCart) {
            throw new Error('Product not in cart.')
        }else{
            const cart = await cartsDao.addQuantity(id, product, quantity);
            return cart;
        }
    }

    async deleteProductFromCart(id, pid){
        if(!id) throw new Error('Cart ID is required.');
        if(!pid) throw new Error('Product ID is required.');

        const cart = await cartsDao.deleteProduct(id, pid);
        return cart;
    }

    async deleteAllProductsFromCart(id){
        if(!id) throw new Error('Cart ID is required.');

        const cart = await cartsDao.deleteAllProducts(id);
        return cart;
    }
}

export default new CartValidator();