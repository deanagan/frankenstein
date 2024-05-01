import express from "express";

import {
  getProducts,
  getProductById /*Add: createProduct, updateProduct, deleteProduct*/,
} from "../controllers/productApiController";

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);

export default router;
