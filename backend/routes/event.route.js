import express from "express";
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent, getMyEvents } from "../controllers/event.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/update/:id", verifyToken, updateEvent);
router.delete("/delete/:id", verifyToken, deleteEvent);
router.get("/myEvents", verifyToken, getMyEvents);  
export default router;
