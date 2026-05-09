// routes/authRoute.js
const express = require("express");
const { register, login, logout } = require("../Controller/authController");

// const { authMiddleware } = require("../middlewares/authMiddleware");
const { validateRequest } = require("../middlewares/validateRequest");
const { registerSchema, loginSchema } = require("../validators/authValidators");

const router = express.Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", logout);

module.exports = router;