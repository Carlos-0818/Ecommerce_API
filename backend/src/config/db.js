// 連線到 MongoDB
const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`✅ MongoDB 已連線：${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB 連線錯誤：", error.message);
    // 連線失敗時直接結束程式（避免服務在錯誤狀態下繼續跑）
    process.exit(1);
  }
};
