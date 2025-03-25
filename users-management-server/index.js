const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("debug", true);

require('dotenv').config();


const port = process.env.PORT || 8000;

// Use middleware
app.use(express.json());
app.use(cookieParser());


// CORS configuration
app.use(
    cors({
        origin: process.env.ORIGIN || 'http://localhost:3000',
        credentials: true,
    })
);

// MongoDB connection URI
const dbUrl = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASS}@cluster0.fgf3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB client setup
async function run() {
    try {
        await mongoose.connect(dbUrl).then((data) => {
            console.log(`Database connected successfully with ${data.connection.host}`);
        });
    } catch (error) {
        console.log(error.message);
        setTimeout(connectDB, 5000);
        // Retry connection after 5 seconds
    }
};

run();


// Routes setup
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));


app.get('/', (req, res) => {
    res.send("User Management server is running");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});
