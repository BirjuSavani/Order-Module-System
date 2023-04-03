import { Router } from 'express';
import { ProductModel } from '../model/index.js';
import ProductController from './ProductController.js';
import validations from './ProductValidation.js';


const router = Router();

router.get('/', (req, res) => [
    res.status(200).send("ok it's working Prouct API")
]);

router.get('/ProductList', ProductController.get);

router.get('/:id', ProductController.getOneProduct);

router.post('/add_Products', [validations.add], ProductController.add);

router.put('/update/:id', [validations.update], ProductController.updateOneProduct);

router.delete('/detele/:id', ProductController.deleteProduct)

export default router;