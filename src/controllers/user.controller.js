import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const createAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId);
    
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
    
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
    
        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError
    }
}

const register = asyncHandler(async(req, res) => {
    const {username, email, password, role} = req.body;
    if([username, email, password, role].some(field => field?.trim() === "")){
        throw new ApiError(400, "All the fields are required!!");
    }

    const existedUser = await User.findOne({
        $or: [{username} || {email}]
    });
    if(existedUser){
        throw new ApiError(409, "User with email or username already exist!!");
    }

    let avatarImagePath;
    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0){
        avatarImagePath = req.files.avatar[0].path;
    }
    const avatar = await uploadOnCloudinary(avatarImagePath);

    const user = await User.create({
        username,
        email,
        password,
        role,
        avatar: avatar?.url || ""
    });
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
});

const login = asyncHandler(async(req, res) => {
    //Getting the data
    const {username, email, password} = req.body;
    if(!username && !email){
        throw new ApiError(400, "Username or email is required");
    }

    //Find the user
    const user = await User.findOne({
        $or: [{username}, {email}]
    });
    if(!user){
        throw new ApiError(404, "User doesn't exist");
    }

    //password checking
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid user credentials");
    }

    //access and refresh token
    const {accessToken, refreshToken} = await createAccessAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secrue: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully"
        )
    )
});

const logout = asyncHandler(async(req, res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
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

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out")
    )
});

const refreshAccessToken = asyncHandler(async(req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);
    if(!user){
        throw new ApiError(401, "Invalid refresh token");
    }

    if(incomingRefreshToken !== user?.refreshToken){
        throw new ApiError(401, "RefreshToken is expired or used");
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    const {accessToken, newRefreshToken} = await createAccessAndRefreshToken(user._id);

    return res
    .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200, 
                {accessToken, refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
});

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword} = req.body;
    if([oldPassword, newPassword].some(field => field?.trim === "")){
        throw new ApiError(400, "All the fields are required!!");
    }

    const user = await User.findById(req.user?._id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid old password!!");
    }

    user.password = newPassword;
    user.save({validateBeforeSave: true});

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {}, 
            "Password changed successfully!!"
        )
    );
});

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        )
    )
});

const bookingHistory = asyncHandler(async(req, res) => {
    const user = await User.aggregate([
        {
          $match: {
            _id: req.user._id
          }
        },
        {
          $lookup: {
            from: "slots",
            localField: "bookingHistory",
            foreignField: "_id",
            as: "bookingHistory"
          }
        }
    ]);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user[0].bookingHistory,
            "History fetched successfully"
        )
    );
})

export {
    register,
    login, 
    logout,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    bookingHistory
};