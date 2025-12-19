// 後端主入口

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const { connectDB } = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

// 建立 Express
const server = express();

// 連線 MongoDB
connectDB();

// ======= 中介層設定（Middlewares） =======
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use(helmet());

// ======= 測試用健康檢查路由 =======
// 用來確認 API 是否正常啟動
server.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "API 執行中",
    time: new Date().toLocaleString("zh-TW"),
  });
});

// 商品相關路由
server.use("/api/products", productRoutes);

// Auth 相關路由
server.use("/api/auth", authRoutes);

// 使用者資訊相關路由
server.use("/api/user", userRoutes);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`🚀 後端伺服器啟動於 http://localhost:${PORT}`);
});
