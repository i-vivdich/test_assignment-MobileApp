import db from '../models';

const User = db.user;
const Service = db.service;

export const checkMoneyEnough = (req: any, res: any, next: any) => {
    User.findOne({
        _id : req.body.user.id,
    }).exec((err: any, user: any) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        Service.findOne({
            _id: req.body.service.id
        }).exec((err: any, service: any) => {
            if (user.balance < service.cost) {
                res.status(403).send({ message: "You don't have enough money!" });
                return;
            } else {
                // subtract money from the user's account
                user.balance -= service.cost;
                user.save((err: any, user: any) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    
                    res.locals.newBalance = user.balance;

                    next();
                });
            }
        })
    });
};
