import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import { checkValidInfo } from '../middlewares/checkValidInfo';
import { User } from '../models/user.model';

const router = express.Router();

router.use(checkValidInfo);

router.post('/', async (req: any, res: any) => {
    const foundUser = res.locals.info;

    const newPass = crypto.randomBytes(5).toString('hex');
    User.findOneAndUpdate(
    {
        email: foundUser.email,
        username: foundUser.username
    },
    {
        password: await bcrypt.hash(newPass, 2)
    });        
    
    res.send({ pass: newPass });
});

export default router;
