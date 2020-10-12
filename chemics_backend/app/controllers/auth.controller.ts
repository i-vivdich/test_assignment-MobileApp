import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { secretKey } from '../config/auth.config';
import db from '../models';

const User = db.user;
const Role = db.role;

export const signup = (req: any, res: any) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err: any, user: any) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (req.body.roles) {
            Role.find(
                {
                    name: { $in: req.body.roles }
                },
                (err: any, roles: any) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    user.roles = roles.map((role: any) => role._id);
                    user.save((err: any) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }

                        res.send({ message: "User was registered successfully!"});
                    });
                }
            );
        } else {
            Role.findOne({ name: "user" }, (err: any, role: any) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                user.roles = [role._id];
                user.save((err: any) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({
                        message: "User was registered successfully!"
                    });
                });
            });
        }
    });
};

export const signin = (req: any, res: any) => {
    console.log('REQUEST ON SIGNIN:');
    console.log(req.body)
    User.findOne({
        email: req.body.user.email
    })
        .populate("roles", "-__v")
        .exec((err: any, user: any) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                res.status(404).send("User has not been found!");
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.user.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign( { id: user.id }, secretKey, {
                expiresIn: 86400
            });

            const authorities: any = [];

            user.roles.forEach((x: any) => authorities.push(x.name.toUpperCase()));

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            });
        });
};
