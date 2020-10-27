import db from '../models/index';

const Order = db.order;
const Service = db.service;

// TYPES! on request object
export const createOrder = (req: any, res: any) => {
    const order = new Order({
        user: req.body.user.id,
        service: req.body.service.id
    });

    order.save((err: any, order: any) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        
        res.send({ message: "Order has been successfully registered!", newBalance: res.locals.newBalance, order: order});
    });

}

export const getOrders = (req: any, res: any) => {
    Order.find({
        user: req.params.id
    }).exec((err: any, orders: any) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send(orders);
    });
}

export const getAllOrders = (req: any, res: any) => {
    Order.find({}).select('-__v').exec((err: any, orders: any) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.send(orders);
    })
}

export const getOrder = (req: any, res: any) => {
    Order.findById(req.body.id).populate('user').populate('service').select('-__v').exec((err: any, order: any) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        
        res.send(order);
    })
}

export const updateOrder = (req: any, res: any) => {
    Order.findById(req.body.id).exec((err: any, order: any) => {
        if (err) {
            res.status(500).send({ message: err });
            console.log('ERROR', err);

            return;
        }

        order.state = req.body.order.state;
        order.user = req.body.order.user;
        order.newName = req.body.order.newName;
        order.newCost = req.body.order.newCost;
        order.service = req.body.order.service;
        order.createdAt = req.body.order.createdAt;
        order.message = req.body.order.message;

        order.save((err: any, resOrder: any) => {
            if (err) {
                console.log('ERROR', err);
                
                res.status(500).send({ message: err });
                return;
            }
            
            res.send(resOrder);
        });
    })
}
