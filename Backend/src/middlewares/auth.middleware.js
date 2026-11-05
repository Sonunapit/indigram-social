const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized access, please login first",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({
      _id: decoded.id,
    });

    if (!user) {
      return res.status(401).json({ 
        message: "User not found, please login again" 
      });
    }

    // User ko request object me attach kar diya
    req.user = user;
    
    // Control ko aage (controller/next middleware) pass kar diya
    return next();
    
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token, please login again",
    });
  }
}

module.exports = authMiddleware;