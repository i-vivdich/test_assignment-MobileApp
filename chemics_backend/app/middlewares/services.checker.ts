import db from '../models';

const Dry = db.dry;
const Service = db.service;

// Probably use w/ services patch endpoint
export const checkServicesExistence = (req: any, res: any, next: any) => {
    Dry.findOne({
        owner: req.params.id,
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
