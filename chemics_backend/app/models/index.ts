import mongoose from "mongoose";

import { User } from './user.model';
import { Role } from './role.model';

mongoose.Promise = global.Promise;

// generic database container
const db: { [key: string]: any } = {};

db.mongoose = mongoose;

db.user = User;
db.role = Role;

db.roles = ['user', 'admin'];

export default db;
