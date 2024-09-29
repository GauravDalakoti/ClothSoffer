import mongoose from "mongoose";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"

const generateAccessTokenAndRefreshToken = async (userId) => {

    try {

        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {

        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body

    if ([email, username, password].some((field) => field === "")) {

        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({

        $or: [{ username }, { email }]
    })

    if (existedUser) {

        throw new ApiError(400, "User with email or username already exist")
    }

    const user = await User.create({

        username,
        email,
        password
    })

    const createdUser = await User.findById(user?._id).select("-password -refreshToken")

    if (!createdUser) {

        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201)
        .json(
            new ApiResponse(200, createdUser, "User registered Successfully")
        )
})

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if ([email, password].some((field) => field?.trim() === "")) {

        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({ email })

    if (!user) {

        throw new ApiError(404, "user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {

        throw new ApiError(400, "Invalid user credentials")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {

        secure: true,
        httpOnly: true,
        sameSite: "none",
        domain: ".clothsoffer.vercel.app",
        expires: new Date(Date.now() + 900000),
        path: "/"
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(

        req.user?._id,
        {
            $unset: {

                refreshToken: 1
            }
        },

        {
            new: true
        }
    )

    const options = {

        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User log out successfully"))
})

const getCurrentUser = asyncHandler((req, res) => {

    return res.status(200)
        .json(new ApiResponse(200, req.user, "current user fetched successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {

        throw new ApiError(401, "unauthorized request")
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id)

        if (!user) {

            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {

            throw new ApiError(401, "Refresh token is expired or used")
        }

        const options = {

            httpOnly: true,
            secure: true
        }

        const { accessToken, newRefreshToken } = await generateAccessTokenAndRefreshToken(user._id)

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken }
                ),
                "Access token refreshed"
            )
    } catch (error) {

        throw new ApiError(401, error?.message || "Invalid refresh token")
    }

})

const userProfileDetails = asyncHandler(async (req, res) => {

    const { name, address, pincode, phone, state, city } = req.body

    if ([name, address, pincode, phone, state, city].some((field) => field === "")) {

        throw new ApiError(400, "all field must be required")
    }

    const user = await User.findByIdAndUpdate(

        req.user?._id,
        {
            $set: {

                address: address,
                pincode: pincode,
                phone: phone,
                state: state,
                city: city,
                name: name
            }
        },
        {
            new: true
        }

    ).select("-password -refreshToken")

    return res.status(200)
        .json(new ApiResponse(200, user, "user profile details updated successfully"))

})



export { registerUser, loginUser, logoutUser, getCurrentUser, refreshAccessToken, userProfileDetails }