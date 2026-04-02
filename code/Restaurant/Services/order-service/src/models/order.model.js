import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true,
    },
    name: { type: String, required: true },       // Verified name from menu-service
    price: { type: Number, required: true },         // Verified price from menu-service
    quantity: { type: Number, required: true, min: 1 },
    itemTotal: { type: Number, required: true },     // price * quantity (computed)
});

const orderSchema = new mongoose.Schema(
    {
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Restaurant", 
        },
        clientOrderId: { type: String, index: true }, 
        tableNumber: {
            type: String,
            required: true,
        },
        orderNumber: {
            type: Number,
        },
        orderDate: {
        type: Date,
        required: true
        },
        items: [orderItemSchema], 
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
                enum: ["Pending", "Preparing", "Ready", "Served", "Completed", "Cancelled"],
                default: "Pending",
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },
        paymentMethod: {
            type: String,
            enum: ["Cash", "Online"],
            default: "Cash",
        },
        placedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);
orderSchema.index({ restaurantId: 1, orderDate: 1, orderNumber: 1 }, { unique: true });

export const Order = mongoose.model("Order", orderSchema);