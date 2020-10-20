import db from '../models';

const Dry = db.dry;

export const checkDryExistence = (req: any, res: any, next: any) => {
    Dry.findOne({
        title: req.body.title,
    }).exec((err: any, dry: any) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (dry) {
            res.status(400).send({ message: 'Failed! Dry is already in place.' });
            return;
        }

        next();
    });
};
