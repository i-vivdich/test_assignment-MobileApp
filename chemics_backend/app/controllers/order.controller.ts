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
