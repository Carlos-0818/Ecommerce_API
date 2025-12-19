// 定義使用者資訊相關的路由

const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

// GET /api/user/profile 取得目前登入使用者的資訊
router.get("/profile", authMiddleware, userController.getProfile);

// PATCH /api/user/profile 更新目前登入使用者的資訊
router.patch("/profile", authMiddleware, userController.updateProfile);

module.exports = router;
