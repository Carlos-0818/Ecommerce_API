// 定義商品相關的路由

const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET /api/products 取得商品列表
router.get("/", productController.getProducts);

// GET /api/products/slug/:slug 取得單一商品（slug）
router.get("/slug/:slug", productController.getProductBySlug);

// GET /api/products/:id 取得單一商品（id）
router.get("/:id", productController.getProductById);

module.exports = router;
