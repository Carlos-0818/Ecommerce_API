// 用於測試的使用者 Seed

const User = require("../models/userModel");

const users = [
  // ===== Admin =====
  {
    name: "Grace",
    email: "grace123@gmail.com",
    password: "grace123",
    role: "admin",
  },

  // ===== User =====
  {
    name: "Mike",
    email: "mike1234@gmail.com",
    password: "mike1234",
  },
  {
    name: "Alex",
    email: "alex1234@gmail.com",
    password: "alex1234",
  },
];

exports.seedUser = async () => {
  try {
    await User.deleteMany();
    console.log("使用者資料已清除完畢");

    await User.insertMany(users);
    console.log("新增使用者 Seed 成功");
  } catch (error) {
    console.error("新增使用者 Seed 失敗：", error);
  }
};
