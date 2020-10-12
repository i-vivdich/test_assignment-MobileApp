import db from '../models';

const roles = db.roles;
const User = db.user;

export const checkDuplicateUsernameOrEmail = (req: any, res: any, next: any) => {
    User.findOne({
        username: req.body.username
    }).exec((err: any, user: any) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: 'Failed! Username is already in use.' });
            return;
        }
        // CHECK LATER WHY THIS IS NESTED
        User.findOne({
            email: req.body.email
        }).exec((err: any, email: any) => {
            if (err) {
                res.status(500).send({ message: err });
            }

            if (email) {
                res.status(400).send({ message: 'Failed! Email is already in use.' });
                return;
            }

            next();
        });
    });
};

export const checkRoleExisted = (req: any, res: any, next: any) => {
    // check here what if roles dont exist
    if (req.body.roles) {
        for (const role of req.body.roles) {
            if (!roles.includes(role)) {
                res.status(400).send({
                    message: `Failed! Role ${role} does not exist`
                });
                return;
            }
        }
    }

    next();
};
