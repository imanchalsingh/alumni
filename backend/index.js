import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import alumniRoutes from "./src/routes/alumniRoutes.js";
import adminAlumniRoutes from "./src/routes/adminAlumniRoutes.js";
import adminManagementRoutes from "./src/routes/adminManagementRoutes.js";
import workshopRoutes from "./src/routes/workshopRoutes.js";
import aboutRoutes from "./src/routes/aboutRoute.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/alumni", alumniRoutes);
app.use("/api/admin", adminAlumniRoutes);
app.use("/api/admin/alumni", adminManagementRoutes);
app.use("/api/workshops", workshopRoutes);
app.use("/api/about", aboutRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});