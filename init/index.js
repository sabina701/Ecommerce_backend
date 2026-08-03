const mongoose = require("mongoose");
const initData = require("./data.js");
const Product = require("../model/product.js");

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
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6a69d379219240c21cc960c0",
  }));
  await Product.insertMany(initData.data);
  console.log("Data was initialized");
};
initDB();
