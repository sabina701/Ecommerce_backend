const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewController = require("../controllers/review");

const { isLoggedIn, validateReview } = require("../middleware");

router.post("/", isLoggedIn, validateReview, reviewController.createReview);
router.delete("/:reviewId", isLoggedIn, reviewController.deleteReview);

module.exports = router;
