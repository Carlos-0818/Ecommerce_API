// 使用者（User）資料模型定義

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    // Eamil（用於登入帳號）
    email: {
      type: String,
      required: [true, "Email 為必填"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Email 格式不正確"],
    },
    // 密碼
    password: {
      type: String,
      required: [true, "密碼為必填"],
      minlength: [8, "密碼至少 8 碼"],
      select: false,
    },
    // 使用者名稱
    name: {
      type: String,
      required: [true, "使用者名稱為必填"],
      trim: true,
    },
    // 身分（User / Admin）
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// 自訂方法：比對使用者輸入的密碼是否與資料庫內一致
userSchema.methods.comparePassword = async function (plainpassword) {
  return bcrypt.compare(plainpassword, this.password);
};

// 在儲存進資料庫前,自動對密碼進行 hash 處理
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const saltRound = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, saltRound);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
