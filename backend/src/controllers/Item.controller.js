import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Item } from "../models/item.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"

const addNewItem = asyncHandler(async (req, res) => {

    const { name, price, category, rating } = req.body

    if ([name, price, category, rating].some((field) => field === "")) {

        throw new ApiError(400, "all field must be required")
    }

    const images = req.files

    const uploadedImages = images.map(async (curimg) => {

        const result = await uploadOnCloudinary(curimg.path)
        return result
    })

    const allimages = await Promise.all(uploadedImages)

    if (!allimages) {

        throw new ApiError(500, "Something went wrong while uploading on cloudinary")
    }

    const imagesUrl = allimages.map((curimg) => {

        const result = curimg.url
        return result
    })

    const imagesUrlArray = await Promise.all(imagesUrl)

    const newItem = await Item.create({

        name,
        category,
        price,
        rating,
        images: imagesUrlArray
    })

    if (!newItem) {

        throw new ApiError(400, "Something went wrong while uploading on mongodb database")
    }

    return res.status(200)
        .json(new ApiResponse(200, newItem, "new Item Successfully added"))

})

const getAllItems = asyncHandler(async (req, res) => {

    const allItems = await Item.find({})

    if (!allItems) {

        throw new ApiError(500, "Something went wrong while fetching the data from the database")
    }

    return res.status(200)
        .json(new ApiResponse(200, allItems, "AllItems Fetched Successfully"))

})

const getCurrentItem = asyncHandler(async (req, res) => {

    const { _id } = req.body

    const item = await Item.findById(_id)

    if (!item) {

        throw new ApiError(500, "Something went wrong while fetching the item from the database")
    }

    return res.status(200)
        .json(new ApiResponse(200, item, "Current Item fetched successfully"))

})

const getRelatedItems = asyncHandler(async (req, res) => {

    const { _id } = req.body

    const item = await Item.findById(_id)
  
    if (!item) {

        throw new ApiError(400, " invalid id")
    }

    const relatedItems = await Item.find({ category: item.category })

    if (!relatedItems) {

        throw new ApiError(400, "related items doesn't find in the database")
    }

    return res.status(200)
        .json(new ApiResponse(200, relatedItems, "related items fetched successfully"))

})



export { addNewItem, getAllItems, getCurrentItem, getRelatedItems }