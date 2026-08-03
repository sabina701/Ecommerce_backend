const Product = require("../model/product");
const Review = require("../model/review");

module.exports.createReview = async (req, res) => {
  try {
    const { id } = req.params; // product id

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const review = new Review(req.body);

    review.author = req.user._id;
    review.product = product._id;

    await review.save();

    product.reviews.push(review);

    await product.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports.deleteReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params;

    // 1. Find review
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // 2. Only author can delete
    if (!review.author.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this review",
      });
    }

    // 3. Remove review id from product.reviews array
    await Product.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });

    // 4. Delete review document
    await Review.findByIdAndDelete(reviewId);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
