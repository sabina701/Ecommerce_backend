const mongoose = require("mongoose");
const categoryData = require("./categoryData.js");
const Product = require("../model/category.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
}

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));
const initDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany(categoryData.data);
  console.log("Data was initialized");
};
initDB();
