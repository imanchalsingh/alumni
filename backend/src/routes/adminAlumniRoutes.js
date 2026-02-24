import express from "express";
const router = express.Router();

// login route for admin
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        res.json({
            message: "Login successful",
            token: process.env.ADMIN_SECRET,
        });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});


export default router;