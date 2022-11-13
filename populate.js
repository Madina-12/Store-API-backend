require("dotenv").config();
const connectDb = require("./db/connect");
const Product = require("./models/products");
const Products = require("./products.json");
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(Products);
    console.log("success!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start(); 

// connect db
// env
// database
// 