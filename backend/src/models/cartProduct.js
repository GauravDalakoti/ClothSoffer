import mongoose, { Schema } from "mongoose";

const cartProductSchema = new Schema({

    id:{

        type:String
    },
    name: {
        type: String,
        required: true
    },

    image: {

        type: String,
        required: true
    },

    price: {

        type: Number,
        required: true
    },

    productQuantity: {

        type: Number,
        required: true
    },

    size: {
        type: String,
        required: true
    },

    rating: {

        type: Number,
        required: true
    },
    owner: {

        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })

export const CartProduct = mongoose.model("CartProduct", cartProductSchema)