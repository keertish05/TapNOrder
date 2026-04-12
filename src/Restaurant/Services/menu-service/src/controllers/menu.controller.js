import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { MenuItem } from '../../src/models/menu.model.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import { Dish } from '../models/Dish.model.js';

export const createMenuItem = asyncHandler(async (req, res) => {
    const restaurantId = req.restaurantId;
    if (!restaurantId) {
        throw new ApiError(401, "Unauthorized: Restaurant ID missing");
    }
    const { name, description, price, category, available } = req.body;

    // take file path from multer middleware
    const fileUrl = req.file ? req.file.path : null;
    if (!fileUrl) {
        throw new ApiError(400, "Image file is required");
    }
    const imageUrl = await uploadToCloudinary(fileUrl);
    if (!imageUrl) {
        throw new ApiError(500, "Failed to upload image to cloud");
    }

    const newMenuItem = new MenuItem({
        name,
        description,
        price,
        category,
        imageUrl : imageUrl.url,
        available,
        restaurantId 
    });

    await newMenuItem.save();

    res.status(201).json(new ApiResponse(201, newMenuItem, "Menu item created successfully"));
});

// get menu items for the (restaurant view)
export const getMenuItems = asyncHandler(async (req, res) => {
  const restaurantId = req.restaurantId;
  if (!restaurantId) {
    throw new ApiError(401, "Unauthorized");
  }

  const { category, sort = "popular", status = "active" } = req.query;

  // ---------------- Filters ----------------
  const filter = { restaurantId };

  if (status !== "all") {
    filter.available = true; // or isDisabled: false
  }

  if (category && category !== "All") {
    filter.category = category;
  }

  // ---------------- Sorting ----------------
  let sortQuery = { orderCount: -1 }; // popular default

  if (sort === "recent") {
    sortQuery = { createdAt: -1 };
  }

  const menuItems = await MenuItem.find(filter).sort(sortQuery);
  console.log(menuItems);
  return res
    .status(200)
    .json(new ApiResponse(200, menuItems, "Menu fetched successfully"));
});

export const updateMenuItem = asyncHandler(async (req, res) => {
    const restaurantId = req.restaurantId;
    if (!restaurantId) {
        throw new ApiError(401, "Unauthorized: Restaurant ID missing");
    }
    const menuItemId = req.params.id;
    if(!menuItemId){
        throw new ApiError(400, "Menu item ID is required");
    }
    const updates = req.body;
    if ( !updates || Object.keys(updates).length === 0 ) {
        throw new ApiError(400, "No updates provided");
    }

    const menuItem = await MenuItem.findOneAndUpdate(
        { _id: menuItemId, restaurantId },
        updates,
        { new: true }
    );

    if (!menuItem) {
        throw new ApiError(404, "Menu item not found");
    }

    res.status(200).json(new ApiResponse(200, menuItem, "Menu item updated successfully"));
});

export const deleteMenuItem = asyncHandler(async (req, res) => {
    const restaurantId = req.restaurantId;
    if (!restaurantId) {
        throw new ApiError(401, "Unauthorized: Restaurant ID missing");
    }
    const menuItemId = req.params.id;
    if(!menuItemId){
        throw new ApiError(400, "Menu item ID is required");
    }
    const menuItem = await MenuItem.findOneAndDelete({ _id: menuItemId, restaurantId });

    if (!menuItem) {
        throw new ApiError(404, "Menu item not found");
    }

    res.status(200).json(new ApiResponse(200, menuItem, "Menu item deleted successfully"));
});

// Get menu by restaurant ID (user view)
export const getMenuByRestaurant = asyncHandler(async (req, res) => {
    const restaurantId = req.params.restaurantId;
    if (!restaurantId) {
        throw new ApiError(400, "Restaurant ID is required");
    }
    const menuItems = await Dish.find({ restaurantId });
    if (!menuItems) {
        throw new ApiError(404, "No menu items found for this restaurant");
    }
    res.status(200).json(new ApiResponse(200, menuItems, "Menu items retrieved successfully"));
});

// Get Dish by restaurant ID (user view)
export const getDishesByRestaurant = asyncHandler(async (req, res) => {
  const restaurantId = req.params.restaurantId;
    if (!restaurantId) {
        throw new ApiError(400, "Restaurant ID is required");
    }
    const dishes = await Dish.find({ restaurantId: restaurantId });
    if (!dishes) {
        throw new ApiError(404, "No dishes found for this restaurant");
    }
    res.status(200).json(new ApiResponse(200, dishes, "Dishes retrieved successfully"));
});

// create dish (restaurant view)
export const createDish = asyncHandler(async (req, res) => {
  const restaurantId = req.restaurantId;
    if (!restaurantId) {
        throw new ApiError(401, "Unauthorized: Restaurant ID missing");
    }
    const { name, description, price, rating, category, isVeg, isJain, isEgg, isGlutenFree, spiceLevel, prepTime, isTrending, moods, portionSize, tasteTags, popularityBadge } = req.body;

    // take file path from multer middleware
    const fileUrl = req.file ? req.file.path : null;
    if (!fileUrl) {
        throw new ApiError(400, "Image file is required");
    }
    const imageUrl = await uploadToCloudinary(fileUrl);
    if (!imageUrl) {
        throw new ApiError(500, "Failed to upload image to cloud");
    }

    const newDish = new Dish({
        name,
        description,
        price,
        rating,
        category,
        isVeg,
        isJain,
        isEgg,
        isGlutenFree,
        spiceLevel,
        prepTime,
        isTrending,
        moods,
        portionSize,
        tasteTags,
        popularityBadge,
        image: imageUrl.url,
        restaurantId 
    });

    await newDish.save();

    res.status(201).json(new ApiResponse(201, newDish, "Dish created successfully"));
});
