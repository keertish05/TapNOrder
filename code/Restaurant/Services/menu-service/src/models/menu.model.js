import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
        type: String,
        enum: ['starter', 'main_course', 'fast_food', 'snacks', 'desserts', 'beverages', 'breakfast', 'combos'],
        required: true
        },
    imageUrl: { type: String, required: true },
    available: { type: Boolean, default: true },
    orderCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true }
});

export const MenuItem = mongoose.model("MenuItem", menuItemSchema);
