import express from 'express';

import { checkMoneyEnough } from '../middlewares/efficientMoneyChecker';
import { verifyToken, isAdmin } from '../middlewares/authJwt';
import { createOrder, getOrders, getAllOrders, getOrder, updateOrder} from '../controllers/order.controller';


const router = express.Router();

router.use(verifyToken);

router.post('/all',
    // [isAdmin],
    getAllOrders
)

router.post('/current',
    getOrder
)

router.get('/:id',
    getOrders
)

router.patch('/:id', 
    updateOrder
)

// :id
router.post('/',
    [checkMoneyEnough],
    createOrder
);

export default router;
