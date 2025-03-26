// const jwt = require("jsonwebtoken");


// module.exports = (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) return res.status(401).json({ message: "Unauthorized" });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch {
//         res.status(401).json({ message: "Invalid token" });
//     }
// };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(403).json({ message: "Access Denied. No token provided." });
    }

    try {
        token = token.replace("Bearer ", ""); // Remove 'Bearer' prefix
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token." });
    }
};





