import mongoose from "mongoose";

export const Order = mongoose.model(
    "Order",
    new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        message: {
            type: String
        },
        newName: {
            type: String,
        },
        newCost: {
            type: Number
        },
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service"
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        state: {
            type: String,
            enum: ['processing', 'ready', 'refund'],
            default: 'processing'
        }
    },
    {
        autoCreate: true
    })
);
