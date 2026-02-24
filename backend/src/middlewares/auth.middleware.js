export const adminAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token === process.env.ADMIN_SECRET) {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized access" });
  }
};