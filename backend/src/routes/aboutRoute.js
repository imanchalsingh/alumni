import express from "express";

import {
    createAbout,
    getAbout,
    updateAbout,
    getAboutAdmin
} from "../controllers/about.controller.js";

const router = express.Router();


// PUBLIC
router.get("/", getAbout);


// ADMIN
router.post("/create", createAbout);

router.put("/", updateAbout);

router.get("/admin", getAboutAdmin);


export default router;