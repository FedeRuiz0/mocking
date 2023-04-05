import ProductsDao from "../dao/products.dao.js";

class ProductValidator{
    async getProducts({page, limit, sort, category, status}){
        const sortValidValues = [-1, 1, '-1', '1']
        let query = {};
        
        if(category || status){
            query = {category} || {status}
        }

        if(limit) if(isNaN(limit)) throw new Error('Limit must be a number over 0');

        if(page) if(isNaN(page) || page <= 0) throw new Error('Page must be a number over 0');

        const options = {page: page || 1, limit: limit || 10}
        
        if(sortValidValues.includes(sort)){
            options.sort = { price: sort }
            return await ProductsDao.getAll( query, options )
        }else{
            if(sort) throw new Error('Sort values can only be 1 or -1')
        }
        const products = await ProductsDao.getAll( query, options );
        return products;
    }

    async getProductByID(id){
        if(!id) throw new Error('Product ID is required.');

        const product = await ProductsDao.getByID(id)
        return product;
    }

    async createProduct({title, description, code, price, stock, category, thumbnails}){
        if( !title ) throw new Error('Title is required');
        if( !description ) throw new Error('Description is required');
        if( !code ) throw new Error('Code is required');
        if( !price ) throw new Error('Price is required');
        if( !stock ) throw new Error('Stock is required');
        if( !category ) throw new Error('Category is required');

        const product = ProductsDao.create({title, description, code, price, stock, category, thumbnails});
        return product;
    }

    async updateProduct(id, {title, description, code, price, stock, category, thumbnails}){
        if(!id) throw new Error('Product ID is required.');

        const product = await ProductsDao.update(id, {title, description, code, price, stock, category, thumbnails});
        return product;
    }

    async deleteProduct(id){
        if(!id) throw new Error('Product ID is required.');

        const product = await ProductsDao.delete(id);
        return product;
    }
}

export default new ProductValidator();