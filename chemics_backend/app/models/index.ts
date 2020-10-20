import mongoose from "mongoose";

import { User } from './user.model';
import { Role } from './role.model';
import { Service } from './service.model';
import { Dry } from './dry.model';
import { Order } from './order.model';

mongoose.Promise = global.Promise;

// generic database container
const db: { [key: string]: any } = {};

db.mongoose = mongoose;

db.user = User;
db.role = Role;
db.service = Service;
db.dry = Dry;
db.order = Order;

db.roles = ['user', 'admin'];

export default db;
