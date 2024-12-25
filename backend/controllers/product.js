import Product from "../models/Product.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";


// Create Product
export const createProduct = async (req, res) => {
  try {
    const { productName, text, price } = req.body;

    if (req.files && req.files.image) {
     
      const fileName = Date.now().toString() + req.files.image.name;

      const __dirname = dirname(fileURLToPath(import.meta.url));

      req.files.image.mv(
        path.join(__dirname, "..", "uploads", fileName),
        async (err) => {
          if (err) {
            return res.status(500).json({ message: "Error uploading image" });
          }

          // Create a new product with the image path
          const newProductWithImage = new Product({
            imgUrl: fileName,
            productName,
            text,
            price,
          });

          // Save the product to the database
          await newProductWithImage.save();
          return res.json(newProductWithImage);
        }
      );
    } else {
      // Create a new product without an image
      const newProductWithoutImage = new Product({
        imgUrl: "", // No image URL if not provided
        productName,
        text,
        price,
      });

      // Save the product to the database
      await newProductWithoutImage.save();
      return res.json(newProductWithoutImage);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating product, please try again!" });
  }
};

// Get All Products
export const getAllProduct = async (req, res) => {
  try {
   
    const products = await Product.find().sort("-createdAt");

    if (!products || products.length === 0) {
      return res.json({ message: "No products available" });
    }

    return res.json({ products });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving products, please try again!" });
  }
};

// Delete product by ID

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Attempt to find and delete the product by ID
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
};