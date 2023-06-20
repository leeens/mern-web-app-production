import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        throw new UnauthenticatedError('Authentication Invalid');
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const testUser = payload.userId === '648b0d55046bca3795c8dc08';
        req.user = { userId: payload.userId, testUser };
        next();
    }
    catch (error) {
        throw new UnauthenticatedError('Authentication Invalid');
    }
};

export default auth;