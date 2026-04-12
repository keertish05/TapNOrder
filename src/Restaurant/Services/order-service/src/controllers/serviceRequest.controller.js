import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ServiceRequest } from "../models/serviceRequest.model.js";
import { io } from "../index.js";

//  CREATE REQUEST
export const createServiceRequest = asyncHandler(async (req, res) => {
  const { restaurantId, tableNumber, type } = req.body;

  if (!restaurantId || !tableNumber || !type) {
    throw new ApiError(400, "Missing required fields");
  }

  const request = await ServiceRequest.create({
    restaurantId,
    tableNumber,
    type,
  });

  //  REAL-TIME EMIT
  io.emit("serviceRequest", request);

  return res
    .status(201)
    .json(new ApiResponse(201, request, "Request sent"));
});


// GET ALL REQUESTS (for waiter dashboard)
export const getServiceRequests = asyncHandler(async (req, res) => {
  const requests = await ServiceRequest.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, requests, "Fetched"));
});


// 🔥 MARK AS COMPLETED
export const updateServiceRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updated = await ServiceRequest.findByIdAndUpdate(
    id,
    { status: "Completed" },
    { new: true }
  );

  if (!updated) throw new ApiError(404, "Request not found");

  // 🔥 REAL-TIME UPDATE
  io.emit("serviceRequestUpdated", updated);

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Updated"));
});