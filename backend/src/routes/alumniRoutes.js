import express from "express";
import Alumni from "../models/Alumni.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import alumniAuth from "../middlewares/alumni.auth.middleware.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password, batch_year, designation, organization, address, mobile_number, course } = req.body;

    try {
        const existing = await Alumni.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const alumni = new Alumni({
            ...req.body,
            password: hashedPassword,
        });

        const saved = await alumni.save();

        const token = jwt.sign(
            { id: saved._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// login 
// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;

//     const alumni = await Alumni.findOne({ email });
//     if (!alumni) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, alumni.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//         { id: alumni._id },
//         process.env.JWT_SECRET,
//         { expiresIn: "7d" }
//     );

//     res.json({ token });
// });
// Get all alumni
router.get("/", async (req, res) => {
    try {
        const alumni = await Alumni.find().sort({ batch_year: -1 });
        res.json(alumni);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get alumni by id
router.get("/me", alumniAuth, async (req, res) => {
    const alumni = await Alumni.findById(req.alumniId).select("-password");
    res.json(alumni);
});

// update alumni profile
router.put("/me", alumniAuth, async (req, res) => {
    const updated = await Alumni.findByIdAndUpdate(
        req.alumniId,
        req.body,
        { new: true }
    ).select("-password");

    res.json(updated);
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