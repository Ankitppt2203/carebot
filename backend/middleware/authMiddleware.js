const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Remove "Bearer " if included
    const actualToken = token.startsWith("Bearer ")
      ? token.slice(7)
      : token;

    const verified = jwt.verify(actualToken, "mysecretkey");

    req.user = verified; // attach user info to request
    next();

  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;