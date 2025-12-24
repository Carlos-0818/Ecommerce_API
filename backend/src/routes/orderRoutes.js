// 定義訂單相關的路由

const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createOrder,
  getMyOrders,
  getOrderById,
} = require("../controllers/orderController");

console.log("order controllers:", {
  createOrder,
  getMyOrders,
  getOrderById,
});

// POST /api/orders 建立訂單
router.post("/", authMiddleware, createOrder);

// GET /api/orders/my-orders 取得使用者本人的訂單
router.get("/my-orders", authMiddleware, getMyOrders);

// GET /api/orders/:id 取得單一訂單
router.get("/:id", authMiddleware, getOrderById);

module.exports = router;
