require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const errorHandlerMiddleware = require("./middleware/errorHandler");
const notFoundMiddleware = require("./middleware/notFound");

const connectDb = require("./db/connect");
const ProductsRoute = require("./routes/products");
const { startSession } = require("mongoose");

app.use(express.json());  // It may be use less here. because it is used to access req.body. but as there is no POST request in this project, hence there will be no req.body ghaliban.

app.get("/", (req, res) => {
  res.send("<h1>Products API</h1><a href='/api/v1/products'>Products</a>");
});
app.use("/api/v1/products", ProductsRoute);

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on ${port}....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
