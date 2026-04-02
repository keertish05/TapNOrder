import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { Restaurant } from '../../src/models/restaurant.model.js';
import jwt from 'jsonwebtoken';

const generateAccessTokenAndRefreshToken = async (restaurantId) => {
    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) {
            throw new ApiError(404, 'Restaurant not found');
        }
        const accessToken = restaurant.generateAccessToken();
        const refreshToken = restaurant.generateRefreshToken();

        restaurant.refreshToken = refreshToken;

        await restaurant.save({validateBeforeSave: false});       // validateBeforeSave: false to skip validation like required fields
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, 'Failed to generate tokens');
    }
}

export const register = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;   
    const existingRestaurant = await Restaurant.findOne({email});
    if (existingRestaurant) {
        throw new ApiError(400, "Restaurant with this email already exists");
    }   
    const newRestaurant = await Restaurant.create({
        name,
        email,
        password
    });

    const createdRestaurant = await Restaurant.findById(newRestaurant._id).select("-password");
    if (!createdRestaurant) {
        throw new ApiError(500, "Failed to create restaurant");
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(createdRestaurant._id);
    if (!accessToken || !refreshToken) {
        throw new ApiError(500, "Failed to generate tokens");
    }

    const options = {
        httpOnly: true,
        secure: true,
    }

    res.status(201).cookie('refreshToken', refreshToken, options).cookie('accessToken', accessToken, options).json( new ApiResponse (201, createdRestaurant, "Restaurant registered successfully") );
});

export const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;   
    const restaurant = await Restaurant.findOne({email});
    if (!restaurant) {
        throw new ApiError(400, "Invalid email or password");
    }
    const isPasswordValid = await restaurant.comparePassword(password);
    if (!isPasswordValid) {
        throw new ApiError(400, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(restaurant._id);
    if (!accessToken || !refreshToken) {
        throw new ApiError(500, "Failed to generate tokens");
    }

    const options = {
        // httpOnly: true,    //NOTE: Enable this in production with HTTPS
        // secure: true,  
    }

    res.status(200).cookie('refreshToken', refreshToken, options).cookie('accessToken', accessToken, options).json( new ApiResponse (200, {accessToken, refreshToken}, "Login successful") );
});

export const logout = asyncHandler(async (req, res) => {
    const restaurantId = req.restaurant._id;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
        throw new ApiError(404, 'Restaurant not found');
    }

    restaurant.refreshToken = null;
    await restaurant.save({ validateBeforeSave: false });

    const options = {
        httpOnly: true,
        secure: true
    };

    res.status(200).clearCookie('refreshToken', options).clearCookie('accessToken', options).json(new ApiResponse(200, null, "Logout successful"));
});

export const regenerateAccessToken = asyncHandler(async (req, res) => {
    const { refreshToken: oldRefreshToken } = req.cookies;
    // console.log("Refresh Token:", oldRefreshToken);
    if (!oldRefreshToken) {
        throw new ApiError(401, 'Refresh token is required');
    }
    // verify refresh token
    const decodedToken =  jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decodedToken) {
        throw new ApiError(401, 'Invalid refresh token');
    }
    // find restaurant by id
    const restaurant = await Restaurant.findById(decodedToken.restaurantId);
    // console.log("Restaurant from Refresh Token:", restaurant);
    if (!restaurant) {
        throw new ApiError(404, 'Restaurant not found');
    }
    // match refresh tokens
    if (restaurant.refreshToken !== oldRefreshToken) {
        throw new ApiError(401, 'Refresh token does not match');
    }

    // generate new access token
    const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(restaurant._id);

    // console.log("New Tokens:", { accessToken, refreshToken });
    if (!accessToken || !refreshToken) {
        throw new ApiError(500, 'Failed to generate tokens');
    }
    const options = {
        httpOnly: true,
        secure: true
    };
    
    return res.status(200).cookie('refreshToken', refreshToken, options).cookie('accessToken', accessToken, options)
        .json(new ApiResponse(200, { accessToken, refreshToken }, 'Access token regenerated successfully'));
});

export const getUser = asyncHandler(async (req, res) => {
    const restaurantId = req.restaurant._id;
    if (!restaurantId) {
        throw new ApiError(401, "Unauthorized: Restaurant ID missing");
    }
    const restaurant = await Restaurant.findById(restaurantId).select("-password -refreshToken");
    if (!restaurant) {
        throw new ApiError(404, "Restaurant not found");
    }
    res.status(200).json(new ApiResponse(200, restaurant, "Restaurant profile retrieved successfully"));
}); 