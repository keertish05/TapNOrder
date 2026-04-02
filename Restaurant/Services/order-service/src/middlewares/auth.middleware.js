import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.cookies?.accessToken;
        if (!authHeader) {
        return res.status(401).json({ message: "Token missing" });
        }

        const token = authHeader.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // Attach ID from token (issued by auth-service)
        req.restaurantId = decoded.restaurantId; 
        next();
    } catch (error) {
        console.error("JWT verification failed:", error.message);
        res.status(401).json({ message: "Unauthorized" });
    }
};
