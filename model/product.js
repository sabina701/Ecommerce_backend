const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    image: {
      filename: {
        type: String,
        default: "product image",
      },

      url: {
        type: String,
        default:
          "https://cdn.prod.website-files.com/5ee0a01b09389eebf4c09b45/667c48d1ac844e8c613ee3e6_1CK-Mobile.webp",
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },

  {
    timestamps: true,
  },
);

productSchema.post("findOneAndDelete", async (product) => {
  if (product) {
    await Review.deleteMany({
      _id: { $in: product.reviews },
    });
  }
});
const product = mongoose.model("Product", productSchema);

module.exports = product;
