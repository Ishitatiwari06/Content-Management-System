import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    try{
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); //returns the payload we signed (id and role)    
        req.user = {
            id: decoded.id,
            role: decoded.role
        };
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};