
const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 นาที
  max: 30, // ยิงได้ 30 request / นาที
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});


const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10, // 10 ครั้ง/นาที
  standardHeaders: true, // ส่งข้อมูล rate limit ใน header
  legacyHeaders: false, // ไม่ส่ง header แบบเก่า
  keyGenerator: (req) => req.user.id, // นับ rate limit ตาม user
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many chat requests, please try again later.",
    });
  }
});


module.exports = {
    apiLimiter,
    chatLimiter
}