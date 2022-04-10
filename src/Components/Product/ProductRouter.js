import { Router } from 'express';
import ProductAPI from './ProductAPI';

const ProductRouter = Router();

ProductRouter.get('/all_products', ProductAPI.getAllProducts);
ProductRouter.post('/create', ProductAPI.createProduct);
ProductRouter.get('/:prod_id', ProductAPI.getProduct);
ProductRouter.post('/update/:prod_id', ProductAPI.updateProduct);
ProductRouter.delete('/:prod_id', ProductAPI.deleteProduct);

export default ProductRouter;
