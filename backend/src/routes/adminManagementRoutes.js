import express from 'express';
import Alumni from "../models/Alumni.model.js";
const router = express.Router();

// get all data as admin
router.get("/all", async (req, res) => {
    try {
        const alumni = await Alumni.find().sort({ batch_year: -1 });
        res.json(alumni);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// update alumni by id
router.put("/:id", async (req, res) => {
    try {
        const updated = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// delete alumni by id
router.delete("/:id", async (req, res) => {
    try {
        await Alumni.findByIdAndDelete(req.params.id);
        res.json({ message: "Alumni deleted" });
    }
    catch (error) {
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