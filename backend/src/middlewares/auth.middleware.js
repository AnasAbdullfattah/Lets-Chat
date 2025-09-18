import jwt from "jsonwebtoken";
import User from "../model/user.model.js"
const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
            if (!token) {
                res.status(403).json({message: " there a problem with authentication"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                res.status(403).json({message: " there a problem with authentication"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(400).send("Invalid Token");
    }
}    

export default  protectRoutel