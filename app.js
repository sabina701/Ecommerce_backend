const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./model/user.js");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.js");
const productRoutes = require("./routes/product");
const category = require("./model/category.js");
const categoryRoutes = require("./routes/category");
const reviewRoutes = require("./routes/review.js");
async function main() {
  await mongoose.connect(process.env.DB);
}

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

// app.use(
//   cors({
//     origin: ["http://localhost:5173", "https://sabina701.github.io"],
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: "https://sabina701.github.io/Ecommerce",
    credentials: true,
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: "none",
      httpOnly: true,
    },
  }),
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.json());
app.use("/", userRoutes);
app.use("/products/:id/reviews", reviewRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
