import {asyncHandler} from '../utils/asyncHandler.js';
import mongoose from 'mongoose';
import {ApiError} from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { Order } from '../models/order.model.js';

// get dashboard stats for a restaurant
export const getDashboardStats = asyncHandler(async (req, res) => {
    // verify restaurant ownership
    const restaurantId = req.restaurantId;
    if (!restaurantId) {
        throw new ApiError(400, "Restaurant ID is required");
    }

    // time boundaries
    const now = new Date();

    const startOfToday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    );

    // run queries in parallel (FAST)
    const [
        totalOrders,
        ordersToday,
        ordersThisMonth,
        revenueResult
    ] = await Promise.all([
        Order.countDocuments({ restaurantId }),

        Order.countDocuments({
            restaurantId,
            createdAt: { $gte: startOfToday }
        }),

        Order.countDocuments({
            restaurantId,
            createdAt: { $gte: startOfMonth }
        }),

        Order.aggregate([
            {
                $match: {
                    restaurantId: new mongoose.Types.ObjectId(restaurantId),
                    paymentStatus: "Paid"
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" }
                }
            }
        ])
    ]);

    const revenue = revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalOrders,
                ordersToday,
                thisMonth: ordersThisMonth,
                revenue
            },
            "Dashboard stats fetched successfully"
        )
    );
});

// get top 5 selling items for a restaurant
export const getTopItems = asyncHandler(async (req, res) => {
    const restaurantId = req.restaurantId;

    if (!restaurantId) {
        throw new ApiError(400, "Restaurant ID is required");
    }

    const topItems = await Order.aggregate([
        {
            $match: {
                restaurantId: new mongoose.Types.ObjectId(restaurantId),
                status: { $ne: "Cancelled" }
            }
        },
        { $unwind: "$items" },
        {
            $group: {
                _id: "$items.name",
                count: { $sum: "$items.quantity" }
            }
        },
        { $sort: { count: -1 } },
        { $limit: 5 },
        {
            $project: {
                _id: 0,
                name: "$_id",
                count: 1
            }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            topItems,
            "Top selling items fetched successfully"
        )
    );
});

// get orders grouped by hour
export const getOrdersByHour = asyncHandler(async (req, res) => {
    const restaurantId = req.restaurantId;

    if (!restaurantId) {
        throw new ApiError(400, "Restaurant ID is required");
    }

    const ordersByHour = await Order.aggregate([
        {
            $match: {
                restaurantId: new mongoose.Types.ObjectId(restaurantId),
                status: { $ne: "Cancelled" }
            }
        },
        {
            $group: {
                _id: { $hour: "$createdAt" },
                orders: { $sum: 1 }
            }
        },
        { $sort: { "_id": 1 } },
        {
            $project: {
                _id: 0,
                hour: "$_id",
                orders: 1
            }
        }
    ]);

    // convert hour number → readable label
    const formatted = ordersByHour.map(item => ({
        hour: `${item.hour}:00`,
        orders: item.orders
    }));

    return res.status(200).json(
        new ApiResponse(
            200,
            formatted,
            "Orders by hour fetched successfully"
        )
    );
});

// get order trend (daily)
export const getOrdersTrend = asyncHandler(async (req, res) => {
    const restaurantId = req.restaurantId;

    if (!restaurantId) {
        throw new ApiError(400, "Restaurant ID is required");
    }

    const ordersTrend = await Order.aggregate([
        {
            $match: {
                restaurantId: new mongoose.Types.ObjectId(restaurantId),
                status: { $ne: "Cancelled" }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" },
                    day: { $dayOfMonth: "$createdAt" }
                },
                orders: { $sum: 1 }
            }
        },
        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
        {
            $project: {
                _id: 0,
                date: {
                    $concat: [
                        { $toString: "$_id.day" },
                        "-",
                        { $toString: "$_id.month" }
                    ]
                },
                orders: 1
            }
        }
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            ordersTrend,
            "Orders trend fetched successfully"
        )
    );
});
