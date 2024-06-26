const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

//DB connection
mongoose.connect(
  "mongodb+srv://adityas:" +process.env.MONGO_ATLAS_PW+"@node-rest-shop.llycyjy.mongodb.net/?retryWrites=true&w=majority&appName=Node-rest-shop");

// using morgan gives us logging details
app.use(morgan("dev"));
//body parser for parsing the json and body of the incoming data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Acess-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

// Routes that handles requests
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
