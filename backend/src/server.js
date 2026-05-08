const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');


const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(cors());            // เปิดใช้งาน CORS ทุก routes





// Routes
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Backend API Running"
    });
});


// Start server
app.listen(PORT, () => {
  
  console.log("-------------------------")
  console.log(`Server is running on port: ${PORT}`);
});