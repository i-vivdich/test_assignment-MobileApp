import express from 'express';

import { checkMoneyEnough } from '../middlewares/efficientMoneyChecker';
import { verifyToken } from '../middlewares/authJwt';
import { createOrder, getOrders } from '../controllers/order.controller';


const router = express.Router();

router.use(verifyToken);

router.get('/:id',
    getOrders
)

// :id
router.post('/',
    [checkMoneyEnough],
    createOrder
);

export default router;
