import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    req.id = decoded.id || decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

export default authenticateToken;
