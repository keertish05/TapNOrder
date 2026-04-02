import mongoose from "mongoose";

const paymentIntentSchema = new mongoose.Schema({
    clientOrderId: { type: String, required: true, unique: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, required: true },
    tableNumber: { type: String, required: true },
    items: { type: Array, required: true }, // store cart snapshot
    amount: { type: Number, required: true }, // calculated server-side
    currency: { type: String, default: "INR" },
    razorpayOrderId: { type: String }, // created by payment-service
    status: { type: String, enum: ["Pending", "Expired", "Completed"], default: "Pending" },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const PaymentIntent = mongoose.model("PaymentIntent", paymentIntentSchema);
