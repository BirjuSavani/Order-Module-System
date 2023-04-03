import { Router } from 'express';
import CustomerController from './CustomerController.js';
import validations from './CustomerValidation.js';

const router = Router();

router.get('/', (req, res) => [
    res.status(200).send("ok it's working api customer")
]);

router.get('/customerList', CustomerController.get);

router.get('/:id', CustomerController.getOneCustomer);

router.post('/add_Customers', [validations.add], CustomerController.add);

router.put('/update/:id', [validations.update], CustomerController.updateOneCustomer);

router.delete('/detele/:id', CustomerController.deleteCustomer)

export default router;