import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import alumniRoutes from "./src/routes/alumniRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/alumni", alumniRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});