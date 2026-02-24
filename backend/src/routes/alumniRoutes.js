import express from "express";
import Alumni from "../models/Alumni.model.js";
const router = express.Router();

// Create a new alumni
router.post("/", async (req, res) => {
    const { name, batch_year, father_name, course, designation, organization, email, address } = req.body;
    try {
        const newAlumni = new Alumni({
            name,
            batch_year,
            father_name,
            course,
            designation,
            organization,
            email,
            address,
        });
        const savedAlumni = await newAlumni.save();
        res.status(201).json(savedAlumni);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

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