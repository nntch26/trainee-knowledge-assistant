const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma  = require("../lib/prisma");
require("dotenv").config();


// Register
const register = async (req, res) => {
    const { username, email, password } = req.body;

    // ข้อมูลครบหรือไม่
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please provide username, email, and password" });
    }

    // ตรวจสอบ email ซ้ำกับในระบบหรือไม่
    const emailExists = await prisma.user.findUnique({
        where: { email }
    });

        // ถ้ามีแล้ว
    if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
    }
    
    // ตรวจสอบ username ว่ามีอยู่ในระบบหรือไม่
    const usernameExists = await prisma.user.findUnique({
        where: { username }
    });

    if (usernameExists) {
        return res.status(400).json({ message: "Username already exists" });
    }

    try{

        // Hash รหัสผ่าน
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // create user
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({ 
            message: "User created successfully", 
            data :{
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    }catch(error){
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
}


// Login
const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please provide username and password" });
    } 

    // ค้นหาผู้ใช้ ด้วย username
    const user = await prisma.user.findUnique({
        where: { username }
    });

    // ถ้าไม่เจอผู้ใช้
    if(!user){
        return res.status(400).json({ message: "Invalid username or password" });
    }


    // ตรวจสอบรหัสผ่าน
    const isMatch = await bcrypt.compare(password, user.password);

    // รหัสผ่านไม่ถูกต้อง
    if(!isMatch){
        return res.status(400).json({ message: "Invalid username or password" });
    }


    try{

        // สร้าง token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // set token ไปที่ cookie
        res.cookie("token", token, {
            maxAge: 3600000, // 1 ชั่วโมง
            secure: true,
            httpOnly: true, // ฝั่งไคลเอนต์จะเข้าถึงไม่ได้
            sameSite: "none", // cross-site
        });



        res.status(200).json({ 
            message: "Login successful", 
            data :{
                id: user.id,
                username: user.username,
                email: user.email,
            } });


    }catch(error){
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
}


// Logout
const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
};



module.exports = {
    register,
    login,
    logout,
};