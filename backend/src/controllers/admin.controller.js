import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
import { Admin } from "../models/admin.model.js";

const generateAccessTokenAndRefreshToken = async (adminId) => {

    try {

        const admin = await Admin.findById(adminId)
        const accessToken = admin.generateAccessToken()
        const refreshToken = admin.generateRefreshToken()

        admin.refreshToken = refreshToken
        await admin.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {

        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const adminLogin = asyncHandler(async (req, res) => {

    const { email, password, secretKey } = req.body

    if ([email, password, secretKey].some((field) => field?.trim() === "")) {

        throw new ApiError(400, "all field must be required")
    }

    if (!(secretKey === process.env.ADMIN_SECRET_KEY)) {

        throw new ApiError("invalid Secret Key")

    }

    const admin = await Admin.findOne({ email })

    if (!admin) {

        throw new ApiError(404, "admin does not exist")
    }

    const isPasswordValid = await admin.isPasswordCorrect(password)

    if (!isPasswordValid) {

        throw new ApiError(400, "Invalid admin credentials")
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(admin._id)

    const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken")

    const options = {

        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("adminAccessToken", accessToken, options)
        .cookie("adminRefreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    admin: loggedInAdmin, accessToken, refreshToken
                },
                "Admin logged In Successfully"
            )
        )
})

const adminLogout = asyncHandler(async (req, res) => {

    await Admin.findByIdAndUpdate(

        req.admin?._id,
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
        .clearCookie("adminAccessToken", options)
        .clearCookie("adminRefreshToken", options)
        .json(new ApiResponse(200, {}, "Admin log out successfully"))
})

export { adminLogin, adminLogout }