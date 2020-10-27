import express from 'express';

import { verifyToken } from '../middlewares/authJwt';
import { getServicesInfo, getAllServices } from '../controllers/services.controller';

const router = express.Router();

router.use(verifyToken);

router.get('/',
    getAllServices
);

router.post('/',
    getServicesInfo
);

export default router;
