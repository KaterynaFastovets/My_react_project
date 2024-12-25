import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  deleteProduct,
} from "../controllers/product.js"; 

const router = new Router();

// Create product
// POST http://localhost:3002/api/products
router.post("/", createProduct);

// Get all products
// GET http://localhost:3002/api/products
router.get("/", getAllProduct);

// Delete product by ID
// DELETE http://localhost:3002/api/products/:id
router.delete("/:id", deleteProduct);

export default router;
