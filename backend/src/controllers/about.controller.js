import About from "../models/About.model.js";


// CREATE ABOUT (only once)
export const createAbout = async (req, res) => {
  try {

    const existing = await About.findOne();

    if (existing) {
      return res.status(400).json({
        message: "About page already exists",
      });
    }

    const about = new About(req.body);
    await about.save();

    res.status(201).json({
      success: true,
      data: about,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET PUBLIC ABOUT
export const getAbout = async (req, res) => {
  try {

    const about = await About.findOne();

    res.json({
      success: true,
      data: about,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE ABOUT
export const updateAbout = async (req, res) => {
  try {

    const about = await About.findOneAndUpdate(
      {},
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: about,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ADMIN VIEW
export const getAboutAdmin = async (req, res) => {
  try {

    const about = await About.findOne();

    res.json({
      success: true,
      data: about,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};