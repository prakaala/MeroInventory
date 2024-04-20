require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const createError = require('http-errors')
const categoryRoute = require('./routes/categoryRoute')
const productsRoute = require('./routes/productsRoute')
const customerRoute = require('./routes/customerRoute')
const salesRoute = require('./routes/salesRoute')
const authRoute = require('./routes/authRoute');
const { verifyAccessToken } = require("./middleware/authHelpers/jwtHelper");
const { db } = require("./config/connection");
const router = express.Router();
const mysql = require('mysql2');

const connection = require("./config/connection")

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

//auth
app.use('/api', authRoute)

app.use('/api', productsRoute)

//Routes
app.get("/", async (req, res, next) => {
    res.send("Home Page");
});

//categories
app.use('/api', categoryRoute)

//sales
app.use('/api',salesRoute)


//customer
app.use('/api',customerRoute)
// warehouse
// app.use('/api',  warehouseRoute)


//not found
app.use(async (req, res, next) => {
    // const error = new Error("Not Found")
    // error.status = 404
    // next(error)
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

// app.listen(5200, () => {
//     console.log("Server is running on port 5200");
// });


// console.log(process.env.MONGO_URI)
// console.log(process.env.ACCESS_TOKEN_SECRET)

//Connect to DB 
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then((x) => {
       console.log("Connected to MongoDB")
    })
    .catch((err) => console.log(err))


connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
  });


    app.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`)
    })