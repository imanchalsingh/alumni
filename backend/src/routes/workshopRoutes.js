import express from "express";
import {
    createWorkshop,
    getAllWorkshops,
    getWorkshopById,
    updateWorkshop,
    deleteWorkshop,
} from "../controllers/workshop.controller.js";


const router = express.Router();

// PUBLIC ROUTES
router.get("/", getAllWorkshops);
router.get("/:id", getWorkshopById);

// ADMIN ROUTES
router.post("/create", createWorkshop);
router.put("/:id",  updateWorkshop);
router.delete("/:id",  deleteWorkshop);

export default router;