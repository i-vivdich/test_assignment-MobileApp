import express from 'express';

import { verifyToken } from '../middlewares/authJwt';
import { Dry } from '../models/dry.model';

import { createDry, updateDryServices, getDryServices} from '../controllers/dry.controller';
import { checkDryExistence } from '../middlewares/dries.checker';

const router = express.Router();

router.use(verifyToken);

// add/update either single or multiple services for particular dry entity
router.patch('/:id',
    updateDryServices
)

router.get('/', async (req: any, res: any) => {
    const driesList = await Dry.find().select('-__v'); // <- exclude 'version' field from document output
    if (Object.keys(driesList).length) {
        res.send(driesList);
    } else {
        res.status(403).send({ message: "There are no active dries at the moment." });
        return;
    }
});

router.post('/', 
    [checkDryExistence],
    createDry
);

router.post('/services', 
    getDryServices
)

export default router;
