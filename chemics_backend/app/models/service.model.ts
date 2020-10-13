import mongoose from "mongoose";

export const Service = mongoose.model(
    "Service",
    new mongoose.Schema({
        name: String,
        cost: Number
    })
);
