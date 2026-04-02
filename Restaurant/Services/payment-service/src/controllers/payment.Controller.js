import Razorpay from "razorpay";
import crypto from "crypto";
import axios from "axios";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
export const createPaymentOrder = asyncHandler( async (req, res) => {
    const { amount, currency, clientOrderId, restaurantId, tableNumber } = req.body;
    if (!amount || !clientOrderId ) {
        throw new ApiError(400, false, "Amount and Client Order ID are required");
    }

    const options = {
    amount: amount * 100,
    currency: currency || "INR",
    receipt: `receipt_${clientOrderId}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json( new ApiResponse(200, {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        clientOrderId,
        restaurantId,
        tableNumber
    }, "Razorpay order created successfully"));
});

// Verify payment (called from frontend after success)
export const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, clientOrderId } = req.body;

    // 👇 Skip signature validation in test mode
    if (process.env.NODE_ENV === "development" || process.env.RAZORPAY_KEY_ID.startsWith("rzp_test_")) {
        console.log("⚙️ Test mode detected — skipping signature validation");

        await axios.post(`${process.env.ORDER_SERVICE_URL}/api/v1/order/confirm`, {
        clientOrderId,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        });

        return res.status(200).json(new ApiResponse(200, {
        clientOrderId,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id
        }, "Payment verified successfully (test mode)"));
    }

    // 🧾 Production signature validation
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // Confirm order after verification
    await axios.post(`${process.env.ORDER_SERVICE_URL}/api/v1/order/confirm`, {
        clientOrderId,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
    });

    return res.status(200).json(new ApiResponse(200, {
        clientOrderId,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id
    }, "Payment verified successfully"));
});

// :TODO: Implement webhook handler for asynchronous payment events from Razorpay
// :TODO: only backend should call this endpoint.