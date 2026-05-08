const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const prisma = require("./lib/prisma");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(cors());            // เปิดใช้งาน CORS ทุก routes





// Routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Backend API Running"});
});


// Get all users
app.get("/users", async (req, res) => {

    try {

        const users = await prisma.user.findMany();

        res.status(200).json(users);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Internal server error"
        });

    }

});


// Start server
app.listen(PORT, () => {
  
  console.log("-------------------------")
  console.log(`Server is running on port: ${PORT}`);
});