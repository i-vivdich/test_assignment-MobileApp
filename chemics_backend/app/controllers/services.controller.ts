import db from '../models/index';

const Service = db.service;

// types..
export const getServicesInfo = async (req: any, res: any) => {
    const services = await Service.find().select('-__v');
    
    if (Object.keys(services).length) {
        const filteredServices = services.reduce((acc: any[], item: any) => {
            if (req.body.services.includes(item._id.toString())) {                
                acc.push(item);
            }
            return acc;
        }, []);
        
        res.send(filteredServices);
    } else {
        res.status(403).send({ message: "There are no available services at the moment." });
        return;
    }
}

export const getAllServices = async (req: any, res: any) => {
    try {
        const services = await Service.find().select('-__v');
        if (Object.keys(services).length) {
            res.send(services);
        } else {
            res.status(403).send({ message: "There are no available services at the moment." });
            return;
        }
    } catch (err) {
        res.status(500).send({ message: err });
        return;
    }
}
