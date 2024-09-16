import { CartProduct } from "../models/cartProduct.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const addToCart = asyncHandler(async (req, res) => {

    const { id, name, price, productQuantity, size, rating, image } = req.body

    if ([id, name, price, productQuantity, size, rating, image].some((field) => field === "")) {

        throw new ApiError(400, "all field must be required")
    }

    const user = await User.findById(req.user?._id)

    if (!user) {

        throw new ApiError(400, "unothorized request")
    }

    const isAlreadyExist = await CartProduct.findOne({ $or: [{ name: name }, { id: id }] })

    if (isAlreadyExist) {

        return res.status(400)
            .json(new ApiResponse(400, {}, "Item already exist"))
    }

    const createdProduct = await CartProduct.create({

        id,
        name,
        price,
        productQuantity,
        rating,
        size,
        image,
        owner: user._id
    })

    if (!createdProduct) {

        throw new ApiError(400, "Something went wrong while adding to the cart")
    }

    return res.status(200)
        .json(new ApiResponse(200, {}, "item added Successfully"))

})

const removeToCart = asyncHandler(async (req, res) => {

    const { name } = req.body

    const removedItem = await CartProduct.deleteOne({ name: name })

    if (!removedItem) {

        throw new ApiError(500, "Something went wrong while remove the product from the database")
    }

    return res.status(200)
        .json(new ApiResponse(200, {}, "Item removed Successfully"))
})

const getCartProducts = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (!user) {

        throw new ApiError(401, "unouthorized request")
    }

    const cartProducts = await CartProduct.find({ owner: req.user._id }).select("-owner")

    if (!cartProducts) {

        throw new ApiError(400, "no cart product found")
    }

    return res.status(200)
        .json(new ApiResponse(200, cartProducts, "cart Products fetched Successfully"))

})


export { addToCart, removeToCart, getCartProducts }