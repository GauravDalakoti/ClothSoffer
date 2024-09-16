import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.model.js";

const orderProduct = asyncHandler(async (req, res) => {

    const { cartItems, totalPrice, currentUserDetals } = req.body

    if ([cartItems, totalPrice, currentUserDetals].some((field) => field === "")) {

        throw new ApiError(400, "all field must be required")
    }

    const user = await User.findById(req.user._id)

    if (!user) {

        throw new ApiError(401, "unuthorized request")
    }

    const products = cartItems.map(async (curitem) => {

        const product = await Product.create({

            name: curitem.name,
            price: curitem.price,
            size: curitem.size,
            productQuantity: curitem.productQuantity,
            image: curitem.image,
            owner: user?._id,
            userDetails: currentUserDetals,
            confirmOrder: false
        })

        return product
    })

    const allOrderedProducts = await Promise.all(products)

    if (!allOrderedProducts) {

        throw new ApiError(500, "Something went wrong while ordering the product")
    }

    return res.status(200)
        .json(new ApiResponse(200, allOrderedProducts, "product order successfully"))

})

const cancelOrder = asyncHandler(async (req, res) => {

    const { name, _id } = req.body

    if ([name, _id].some((field) => field === "")) {

        throw new ApiError(400, "all field must be required")
    }

    const cancelProduct = await Product.findByIdAndUpdate(
        _id,
        {
            $set: {

                isCanceled: true
            }
        }, {

        new: true
    }

    )

    if (!cancelProduct) {

        throw new ApiError(500, "Something went wrong while cancel your order")
    }

    res.status(200)
        .json(new ApiResponse(200, cancelProduct, "your order cancel successfully"))

})

const getAllOrders = asyncHandler(async (req, res) => {

    const admin = await Admin.findById(req.admin?._id)

    if (!admin) {

        throw new ApiError(401, "unauthorized request")
    }

    const allOrders = await Product.find({})

    if (!allOrders) {

        throw new ApiError(500, "Something went wrong while fetching all orders from the database")
    }

    return res.status(200)
        .json(new ApiResponse(200, allOrders, "all Orders fetched Successfully"))

})

const orderConfirm = asyncHandler(async (req, res) => {

    const { _id } = req.body

    const updatedProduct = await Product.findByIdAndUpdate(
        _id,
        {

            $set: {

                confirmOrder: true
            }
        },
        {
            new: true
        }

    )

    if (!updatedProduct) {

        throw new ApiError(500, "Something went wrong while updating product order in the database")
    }

    return res.status(200)
        .json(new ApiResponse(200, {}, "Order confirmed Successfully"))

})

const getCurrentUserOrders = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user?._id)

    if (!user) {

        throw new ApiError(401, "unauthorized request")
    }

    const allOrders = await Product.find({ owner: req.user?._id })

    if (!allOrders) {

        throw new ApiError(500, "Something went wrong while fetching all orders from the database")
    }

    return res.status(200)
        .json(new ApiResponse(200, allOrders, "all Orders fetched Successfully"))

})

export { orderProduct, cancelOrder, getAllOrders, orderConfirm, getCurrentUserOrders }

