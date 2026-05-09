const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma  = require("../lib/prisma");
require("dotenv").config();

// Middleware สำหรับตรวจ token
const authMiddleware = async (req, res, next) => {

    // ดึง token จาก cookie
    const token = req.cookies.token;

    // ถ้าไม่มี token
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // ตรวจสอบ token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ดึง user
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {   id: true,
                        username: true,
                        email: true,
                    }
        });

        if (!user) {
            return res.status(401).json({ message: "User no longer exists." });
        }

        // Token ถูกต้อง ส่งแนบข้อมูลผู้ใช้ไปกับ request object
        req.user = user;
        
        next();
    }
    catch (err) {
    return res.status(401).json({ message: "Not authorized, token failed" });
    }
    
}


module.exports = { authMiddleware }