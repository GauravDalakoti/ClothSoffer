import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({

    name: {

        type: String,
        required: true
    },

    image: {

        type: String,
    },

    price: {

        type: Number,
        required: true
    },

    size: {

        type: String,
        required: true
    },

    productQuantity: {

        type: Number,
        required: true
    },

    owner: {

        type: Schema.Types.ObjectId,
        ref: "User"
    },

    userDetails: {

        type: Object
    },

    confirmOrder: {

        type: Boolean,
    },

    isCanceled: {
        type: Boolean
    }

}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema)