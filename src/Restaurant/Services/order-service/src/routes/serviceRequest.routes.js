import express from "express";
import {
  createServiceRequest,
  getServiceRequests,
  updateServiceRequest,
} from "../controllers/serviceRequest.controller.js";

const router = express.Router();

router.post("/", createServiceRequest);
router.get("/", getServiceRequests);
router.patch("/:id", updateServiceRequest);

export default router;