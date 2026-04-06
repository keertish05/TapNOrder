import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  rating: Number,
  image: String,
  category: String,
  isVeg: Boolean,
  isJain: Boolean,
  isEgg: Boolean,
  isGlutenFree: Boolean,
  spiceLevel: Number,
  prepTime: Number,
  isTrending: Boolean,
  moods: [String],
  portionSize: String,
  tasteTags: [String],
  popularityBadge: String,
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true }
});

export const Dish = mongoose.model("Dish", dishSchema);
