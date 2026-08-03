const Product = require("../model/product.js");

// Create Product
module.exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    product.owner = req.user._id;
    const savedProduct = await product.save();

    return res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product: savedProduct,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// GET ALL PRODUCTS
module.exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("owner");

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET SINGLE PRODUCT SHOW ROUTE
module.exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("owner")
      .populate({
        path: "reviews",
        populate: {
          path: "author",
          select: "username",
        },
      });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// UPDATE PRODUCT
module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find product first
    const product = await Product.findById(id);

    // 2. Product not found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    // 3. Check ownership
    if (!product.owner.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not the owner of this product",
      });
    }

    // 4. Update only if owner
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE PRODUCT
module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find product first
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    // Check owner
    if (!product.owner.equals(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "You are not the owner of this product",
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// // GET ALL CATEGORIES
// module.exports.getCategories = async (req, res) => {
//   try {
//     const categories = await Product.distinct("category");

//     return res.status(200).json({
//       success: true,
//       categories,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// GET PRODUCTS BY CATEGORY
module.exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET PRODUCTS OF LOGGED-IN USER
module.exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      owner: req.user._id,
    }).populate("owner");

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
