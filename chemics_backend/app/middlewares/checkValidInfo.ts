import db from '../models';

const User = db.user;

export const checkValidInfo = (req: any, res: any, next: any) => {
    User.findOne({
        email: req.body.email,
        username: req.body.username
    }).exec((err: any, info: any) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (info) {
            res.locals.info = info;
            next();
        } else {
            res.status(404).send({ message: 'User has not been found!' });
        }
    });
};
