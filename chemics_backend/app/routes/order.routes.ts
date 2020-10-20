import express from 'express';

import { checkMoneyEnough } from '../middlewares/efficientMoneyChecker';
import { verifyToken } from '../middlewares/authJwt';
import { createOrder } from '../controllers/order.controller';


const router = express.Router();

router.use(verifyToken);

// :id
router.post('/',
    [checkMoneyEnough],
    createOrder
);

export default router;
