import Workshop from "../models/Workshop.model.js";

// CREATE
export const createWorkshop = async (req, res) => {
    try {
        const workshop = new Workshop(req.body);
        await workshop.save();

        res.status(201).json({
            success: true,
            message: "Workshop created successfully",
            data: workshop,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// /get all workshop - read only
export const getAllWorkshops = async (req, res) => {
    try {
        const workshops = await Workshop.find().sort({ date: 1 });

        res.json({
            success: true,
            count: workshops.length,
            data: workshops,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// get single workshop by id - when click on any workshop - view in dialog box
export const getWorkshopById = async (req, res) => {
    try {
        const workshop = await Workshop.findById(req.params.id);

        if (!workshop) {
            return res.status(404).json({ message: "Workshop not found" });
        }

        res.json({ success: true, data: workshop });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// update workshop - admin only
export const updateWorkshop = async (req, res) => {
    try {
        const workshop = await Workshop.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!workshop) {
            return res.status(404).json({ message: "Workshop not found" });
        }

        res.json({
            success: true,
            message: "Workshop updated",
            data: workshop,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// delete workshop - admin 
export const deleteWorkshop = async (req, res) => {
    try {
        const workshop = await Workshop.findByIdAndDelete(req.params.id);

        if (!workshop) {
            return res.status(404).json({ message: "Workshop not found" });
        }

        res.json({
            success: true,
            message: "Workshop deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};