import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema({

    name: {

        type: String,
        required: true
    },
    price: {

        type: Number,
        required: true
    },
    rating: {

        type: Number,
        required: true
    },
    category: {

        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ]

}, { timestamps: true })

export const Item = mongoose.model("Item", itemSchema)