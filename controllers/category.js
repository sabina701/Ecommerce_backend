const Category = require("../model/category");

// GET ALL CATEGORIES
module.exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
