// 定義註冊、登入的路由

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// POST /api/auth/signup 使用者註冊
router.post("/signup", authController.signup);

// POST /api/auth/login 使用者登入
router.post("/login", authController.login);

module.exports = router;
