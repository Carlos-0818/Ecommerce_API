// 訂單（Order）資料模型定義

const mongoose = require("mongoose");

// 訂單中單筆商品的資料模型定義
const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    image: { String },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    // 訂購人
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 收件人資訊
    shippingInfo: {
      fullName: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      _id: false,
    },

    // 訂購商品清單
    items: {
      type: [orderItemSchema],
      required: true,
      validate: [(arr) => arr.length > 0, "訂單至少要有一項商品"], // 避免空訂單
    },

    // 訂單金額
    totalAmount: {
      type: Number,
      required: true,
    },

    // 訂單狀態
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
