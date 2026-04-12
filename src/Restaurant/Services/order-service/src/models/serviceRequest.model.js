import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    tableNumber: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "waiter",
        "water",
        "napkin",
        "cutlery",
        "charger",
        "highchair",
        "change",
      ],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const ServiceRequest = mongoose.model(
  "ServiceRequest",
  serviceRequestSchema
);