import mongoose from "mongoose";

export const Dry = mongoose.model(
    "Dry",
    new mongoose.Schema({
        title: String,
        description: String,
        imgs: [String],
        services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Service"
            }
        ]
    })
);
