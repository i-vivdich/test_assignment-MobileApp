import { checkDuplicateUsernameOrEmail, checkRoleExisted } from '../middlewares/verifySignUp';
import { signin, signup } from '../controllers/auth.controller';

module.exports = function(app: any) {
    app.use((req: any, res: any, next: any) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        );
        next();
    });

    app.post(
        '/api/auth/signup',
        [
            checkDuplicateUsernameOrEmail,
            checkRoleExisted
        ],
        signup
    );

    app.post('/api/auth/signin', signin);
};
