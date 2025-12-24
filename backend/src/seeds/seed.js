const mongoose = require("mongoose");
const { seedProduct } = require("./seedProduct");
const { seedUser } = require("./seedUser");
const { seedOrder } = require("./seedOrder");

require("dotenv").config();

async function connectDB() {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`✅ MongoDB 已連線：${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB 連線錯誤：", error.message);
    // 連線失敗時直接結束程式（避免服務在錯誤狀態下繼續跑）
    process.exit(1);
  }
}

async function runSeed() {
  try {
    await connectDB();
    console.log("開始新增 Seeds");
    await seedProduct();
    await seedUser();
    await seedOrder();
    console.log("🌱 新增 Seeds 成功");
    process.exit();
  } catch (error) {
    console.error("❌ Seed 失敗：", error);
    process.exit(1);
  }
}

runSeed();
