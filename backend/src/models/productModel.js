// 商品（Product）資料模型定義

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // 商品名稱
    name: {
      type: String,
      required: [true, "商品名稱為必填"],
      trim: true,
    },
    // Slug（商品網址用，例如：intel-core-i5-14400f）
    slug: {
      type: String,
      required: [true, "商品 Slug 為必填"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    // 分類
    category: {
      type: String,
      required: [true, "商品分類為必填"],
      trim: true,
    },
    // 品牌（例如：Intel、AMD、MSI ...）
    brand: {
      type: String,
      required: [true, "商品品牌為必填"],
      trim: true,
    },
    // 價格
    price: {
      type: Number,
      required: [true, "商品價格為必填"],
      min: [0, "商品價格不可小於 0"],
    },
    // 庫存
    stock: {
      type: Number,
      min: [0, "商品庫存不可小於 0"],
      default: 0,
    },
    // 商品圖片 URL
    images: {
      type: [String],
      default: [],
      // 先去除多餘空白在儲存
      set: (images) =>
        images.map((img) => (typeof img === "string" ? img.trim() : img)),
    },
    // 規格（彈性欄位，用 Map 儲存各種 {key-value}，key 值不固定，of 指定 value 的 tpye，例如：threads:16）
    specs: {
      type: Map,
      of: String,
      default: {},
    },
    // 商品狀態（上 / 下架）
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    // 商品描述
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
