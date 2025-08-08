const productService = require("../services/product.service");
const { NotFoundError } = require("../utils/errors"); // Import the custom error

const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);

    // If no product is found, throw a NotFoundError
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    res.json(product);
  } catch (error) {
    // Pass the error to the errorHandler middleware
    next(error);
  }
};

// const createProduct = async (req, res, next) => {
//   try {
//     const newProduct = await productService.createProduct(req.body);
//     res.status(201).json(newProduct);
//   } catch (error) {
//     next(error);
//   }
// };
// ... other functions

const createProduct = async (req, res, next) => {
  try {
    // Basic validation
    const { name, price } = req.body;
    if (!name || price === undefined) {
      return res
        .status(400)
        .json({ message: "Bad Request: name and price are required." });
    }

    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

// ... module.exports
const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body
    );
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// const deleteProduct = async (req, res, next) => {
//   try {
//     await productService.deleteProduct(req.params.id);
//     res.status(200).json({
//       message: `Product delete successfully with id: ${req.params.id}`,
//     }); // No content
//   } catch (error) {
//     next(error);
//   }
// };
const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteProduct(req.params.id);

    // If the database returns 0 affectedRows, the product didn't exist
    if (result.affectedRows === 0) {
      throw new NotFoundError("Product not found");
    }

    res.status(200).json({
      status: "success",
      message: `Product deleted successfully with id: ${req.params.id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
