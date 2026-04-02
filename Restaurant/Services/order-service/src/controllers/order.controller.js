import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { Order } from '../models/order.model.js';
import { PaymentIntent } from '../models/paymentIntent.model.js';
import axios from 'axios';

// create a new order
export const createOrder = asyncHandler(async (req, res) => {
    const { clientOrderId, restaurantId, tableNumber, items, paymentMethod = "Cash" } = req.body;

    if (!clientOrderId || !restaurantId || !tableNumber || !items || !items.length) {
        throw new ApiError(400, "Missing required fields (clientOrderId, restaurantId, tableNumber, items)");
    }

    // 1) If final order already exists for this clientOrderId -> return it (idempotent)
    const existingOrder = await Order.findOne({ clientOrderId });
    if (existingOrder) {
        return res.status(200).json(new ApiResponse(200, existingOrder, "Order already exists"));
    }

    // 2) Fetch menu from Menu Service & verify prices (same as you had)
    const { data } = await axios.get(`${process.env.GETMENU_API_URL}/restaurant/${restaurantId}`);

    const officialMenu = data?.data || [];
    if (!officialMenu.length) throw new ApiError(404, "No menu found for this restaurant");

    let verifiedItems = [];
    let totalAmount = 0;
    for (const item of items) {
        const menuItem = officialMenu.find(m => m._id.toString() === item.menuItemId);
        if (!menuItem) continue;
        const quantity = Number(item.quantity) || 1;
        const itemTotal = menuItem.price * quantity;
        verifiedItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity,
        itemTotal
        });
        totalAmount += itemTotal;
    }
    if (verifiedItems.length === 0) throw new ApiError(400, "No valid items found in order");

    // 3) Branch: Cash vs Online
    if (paymentMethod === "Cash") {
        // create final order immediately
        const startOfDay = new Date(); startOfDay.setHours(0,0,0,0);
        const endOfDay = new Date(); endOfDay.setHours(23,59,59,999);
        const todaysCount = await Order.countDocuments({ restaurantId, createdAt: { $gte: startOfDay, $lte: endOfDay } });
        const orderNumber = todaysCount + 1;

        const newOrder = await Order.create({
        clientOrderId,
        restaurantId,
        tableNumber,
        items: verifiedItems,
        orderNumber,
        orderDate: new Date(),
        totalAmount,
        status: "Pending",
        paymentStatus: "Pending",
        paymentMethod: "Cash",
        });

        return res.status(201).json(new ApiResponse(201, newOrder, "Order placed successfully"));
    }

    // paymentMethod === "Online"
    // create or reuse a payment intent (idempotent)
    let intent = await PaymentIntent.findOne({ clientOrderId });
    if (intent && intent.status === "Completed") {
        // Already completed -> perhaps order was created; check again
        const order = await Order.findOne({ clientOrderId });
        if (order) return res.status(200).json(new ApiResponse(200, order, "Order already completed"));
    }

    // create or update intent
    if (!intent) {
        intent = await PaymentIntent.create({
        clientOrderId,
        restaurantId,
        tableNumber,
        items: verifiedItems,
        amount: totalAmount
        });
    } else {
        // update snapshot/amount if items changed
        intent.items = verifiedItems;
        intent.amount = totalAmount;
        intent.status = "Pending";
        await intent.save();
    }

    // call Payment Service to create payment (Razorpay) - it should return razorpayOrderId
    // Payment service endpoint and contract must be agreed; example:
    const paymentResp = await axios.post(`${process.env.PAYMENT_SERVICE_URL}/api/v1/payment/create`, {
        amount: totalAmount,
        currency: "INR",
        clientOrderId,
        restaurantId,
        tableNumber
    });

    const { orderId: razorpayOrderId } = paymentResp.data.data || {};
    if (!razorpayOrderId) {
        throw new ApiError(500, "Failed to create payment order");
    }
    
    intent.razorpayOrderId = razorpayOrderId;
    await intent.save();

    return res.status(200).json(new ApiResponse(200, {
        clientOrderId,
        razorpayOrderId,
        amount: totalAmount
    },
    "Payment initiated"));
});

// confirm order after payment success webhook
export const confirmOrder = asyncHandler(async (req, res) => {
    const { clientOrderId, razorpayOrderId, razorpayPaymentId } = req.body;

    if (!clientOrderId || !razorpayOrderId || !razorpayPaymentId) {
        throw new ApiError(400, "Missing confirm data");
    }

    // If order already exists -> idempotent return
    const existingOrder = await Order.findOne({ clientOrderId });
    if (existingOrder) {
        return res.status(200).json(new ApiResponse(200, existingOrder, "Order already exists"));
    }

    // find payment intent
    const intent = await PaymentIntent.findOne({ clientOrderId, razorpayOrderId, status: "Pending" });
    if (!intent) throw new ApiError(404, "Payment intent not found");

    // calculate today's orderNumber (count real orders only)
    const startOfDay = new Date(); startOfDay.setHours(0,0,0,0);
    const endOfDay = new Date(); endOfDay.setHours(23,59,59,999);
    const todaysCount = await Order.countDocuments({ restaurantId: intent.restaurantId, createdAt: { $gte: startOfDay, $lte: endOfDay }});
    const orderNumber = todaysCount + 1;

    // create final order (snapshot items from intent)
    const newOrder = await Order.create({
        clientOrderId,
        restaurantId: intent.restaurantId,
        tableNumber: intent.tableNumber,
        items: intent.items,
        orderNumber,
        orderDate: new Date(),
        totalAmount: intent.amount,
        status: "Pending",
        paymentStatus: "Paid",
        paymentMethod: "Online",
        razorpayOrderId,
        razorpayPaymentId
    });

    // mark intent completed
    intent.status = "Completed";
    await intent.save();

    return res.status(201).json(new ApiResponse(201, newOrder, "Order confirmed"));
});

// get orders for a restaurant
export const getOrdersForRestaurant = asyncHandler(async (req, res) => {
    // verify restaurant ownership
    const restaurantId = req.restaurantId; 
    if(!restaurantId){
        throw new ApiError(400, "Restaurant ID is required");
    }

    const orders = await Order.find({ restaurantId }).sort({ createdAt: -1 });
    return res
        .status(200)
        .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

// update order status
export const updateOrderStatus = asyncHandler(async (req, res) => {
    // verify restaurant ownership
    const restaurantId = req.restaurantId;
    if(!restaurantId){
        throw new ApiError(400, "Restaurant ID is required");
    }

    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
        "Pending",
        "Preparing",
        "Ready",
        "Served",
        "Completed",
        "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
        throw new ApiError(400, "Invalid order status");
    }

    const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    );

    if (!updatedOrder) {
        throw new ApiError(404, "Order not found");
    }

    res
        .status(200)
        .json(new ApiResponse(200, updatedOrder, "Order status updated successfully"));
});

//track order by clientOrderId  
export const getOrderStatus = asyncHandler(async (req, res) => {
    const { clientOrderId } = req.query;
    if (!clientOrderId) throw new ApiError(400, "clientOrderId is required");

    const order = await Order.findOne({ clientOrderId });
    if (order) return res.status(200).json(new ApiResponse(200, order, "Order found"));

    // else check intent
    const intent = await PaymentIntent.findOne({ clientOrderId });
    if (intent) {
        return res.status(200).json(new ApiResponse(200, { intent }, "Payment intent found"));
    }

    return res.status(404).json({ success: false, message: "No order or intent found" });
});

