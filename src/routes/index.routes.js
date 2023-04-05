import { Router } from 'express';
import cartsRoutes from './cart.routes.js';
import productsRoutes from './product.routes.js';
import sessionRoutes from './session.routes.js';
import viewsRouter from './views.routes.js';

const router = Router();

router.use('/api/products', productsRoutes);
router.use('/api/cart', cartsRoutes);
router.use('/session', sessionRoutes);
router.use('/', viewsRouter);
router.get('*', (req, res) => { res.status(404).send('404 not found')});


  

export default router;