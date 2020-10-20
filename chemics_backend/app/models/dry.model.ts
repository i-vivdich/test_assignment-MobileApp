import mongoose from "mongoose";

export const Dry = mongoose.model(
    "Dry",
    new mongoose.Schema({
        title: {
            type: String,
            unique: true
        },
        description: String,
        imgs: [ String ],
        service_description: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        services: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Service"
            }
        ]
    },
    {
        autoCreate: true
    })
);
