import express from 'express';

import { checkDuplicateUsernameOrEmail, checkRoleExisted } from '../middlewares/verifySignUp';
import { signin, signup } from '../controllers/auth.controller';

const route = express.Router();

route.use((req: any, res: any, next: any) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    );
    
    next();
});

route.post(
    '/signup',
    [
        checkDuplicateUsernameOrEmail,
        checkRoleExisted
    ],
    signup
);

route.post('/signin', signin);

export default route;
