import mongoose from "mongoose";
import db from '../models/index';

const Dry = db.dry;
const Service = db.service;

export const createDry = (req: any, res: any) => {
    const dry = new Dry({
        title: req.body.title,
        description: req.body.description,
        service_description: req.body.service_description,
        imgs: [...req.body.imgs],
        owner: req.body.id
    });

    // (refact) add type for Dry
    dry.save((err: any, dry: any) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send({ message: "New Dry was registered successfully!" });
    });
}

export const updateDryServices = (req: any, res: any) => {
    if (!req.body.services.length) {
        res.status(404).send({ message: 'Provide at least one item' })
        return;
    }
    
    // (refact globally) add type for payload
    const servicesToAdd = req.body.services.map((element: any) => {
        return new Service({
            _id: mongoose.Types.ObjectId(),
            name: element.name,
            cost: element.cost
        })
    });

    try {
        Service.insertMany(servicesToAdd);
    } catch (err) {
        res.status(500).send({ message: err });
    }

    // unify to one representation - either callbacks or async/await
    Dry.findOne({
        _id: req.params.id
    }).exec((err: any, dry: any) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        dry.services = servicesToAdd.map((elmnt: any) => elmnt._id)
        dry.save((err: any, dry: any) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.send({ message: "Services were successfully added!" });
        });
    });
}
