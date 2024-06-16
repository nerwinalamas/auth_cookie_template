const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        const token = req.cookies.token;
        const refreshToken = req.cookies.refreshToken;

        if (!token && !refreshToken) {
            return res
                .status(401)
                .json({ success: false, message: "Access denied." });
        }

        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: "Access denied. No token provided." });
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid Token." });
    }
};

module.exports = protect;
