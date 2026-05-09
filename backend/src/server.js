const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Import routes
const authRoute = require("./routes/authRoute");


const app = express();

dotenv.config();
const PORT = process.env.BACKEND_PORT || 8000;

app.use(bodyParser.json());
app.use(cors());            // เปิดใช้งาน CORS ทุก routes


app.use(cookieParser())
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API Routes
app.get("/", (req, res) => {
    res.status(200).json({ message: "Backend API Running"});
});

app.use("/api/auth", authRoute);



// Start server
app.listen(PORT, () => {
  
  console.log("-------------------------")
  console.log(`Server is running on port: ${PORT}`);
});