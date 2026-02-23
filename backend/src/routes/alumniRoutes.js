import express from "express";
import Alumni from "../models/Alumni.model.js";
const router = express.Router();

// Get all alumni
router.get("/", async (req, res) => {
    try {
        const alumni = await Alumni.find().sort({ batch_year: -1 });
        res.json(alumni);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get alumni by year
router.get("/year/:year", async (req, res) => {
    try {
        const alumni = await Alumni.find({ batch_year: req.params.year });
        res.json(alumni);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Search by name
router.get("/search/:name", async (req, res) => {
    try {
        const alumni = await Alumni.find({
            name: { $regex: req.params.name, $options: "i" },
        });
        res.json(alumni);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;