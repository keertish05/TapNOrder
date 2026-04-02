import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import jwt from 'jsonwebtoken';
import { Restaurant } from "../models/restaurant.model.js";


export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers?.("authorization")?.replace('Bearer ','')
        if (!token) {
            throw new ApiError(401, 'token missing');
        }
        const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const restaurant =  await Restaurant.findById(decodedToken?.restaurantId).select('-password -otp -otpexpiry -refreshToken');
        if(!restaurant){
            throw new ApiError(401, 'unauthorized restaurant, restaurant not found');
        }

        req.restaurant = restaurant;
        next();
    } catch (error) {
        throw new ApiError(401, 'error in token authentication');
    }
})