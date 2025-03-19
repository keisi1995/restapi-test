import { config } from "../utils/config";
const jwt = require('jsonwebtoken');

export const authMiddleware = (event) => {
    const authHeader = event.headers?.Authorization || event.headers?.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Authentication token not provided!.");       
    }

    const token = authHeader.split(" ")[1];
     
    const decoded = jwt.verify(token, config.JWT_SECRET);
    return { user: decoded };
    
};
