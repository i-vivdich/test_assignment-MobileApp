import jwt from 'jsonwebtoken';
import { secretKey } from '../config/auth.config.js';

import db from '../models';

const User = db.user;
const Role = db.role;

export const verifyToken = (req: any, res: any, next: any) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }

    req.userId = decoded.id;
    next();
  });
};

export const isAdmin = (req: any, res: any, next: any) => {
  User.findById(req.userId).exec((err: any, user: any) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err: any, roles: any) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Requires Admin Role!" });
        return;
      }
    );
  });
};
