import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import alumniRoutes from "./src/routes/alumniRoutes.js";
import adminAlumniRoutes from "./src/routes/adminAlumniRoutes.js";
import adminManagementRoutes from "./src/routes/adminManagementRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/alumni", alumniRoutes);
app.use("/api/admin", adminAlumniRoutes);
app.use("/api/admin/alumni", adminManagementRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});