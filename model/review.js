const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Review", reviewSchema);
