import mongoose from "mongoose";

export const Service = mongoose.model(
    "Service",
    new mongoose.Schema({
        name: {
            type: String
        },
        cost: {
            type: Number,
            min: [0, "Can't be negative!"],
            max: 1000
        }
    },
    {
        autoCreate: true
    })
);
