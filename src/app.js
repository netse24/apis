const express = require("express");
const productRoutes = require("./routes/product.routes");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

const app = express();

app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
