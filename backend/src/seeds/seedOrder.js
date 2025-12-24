// 用於測試的訂單 Seed

const Order = require("../models/orderModel");

const orders = [
  {
    user: "694b935836bc8186e8f04e79",
    shippingInfo: {
      fullName: "Mike",
      phone: "0912345678",
      address: "台北市中正區忠孝東路一段 100 號",
    },
    items: [
      {
        productId: "694b935836bc8186e8f04e58",
        name: "Intel Core i7-14700K",
        price: 12990,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
      },
      {
        productId: "694b935836bc8186e8f04e5c",
        name: "MSI GeForce RTX 4060 Ventus 2X",
        price: 10990,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
      },
    ],
    totalAmount: 23980,
    status: "pending",
  },
  {
    user: "694b935836bc8186e8f04e79",
    shippingInfo: {
      fullName: "Mike",
      phone: "0912345678",
      address: "台北市中正區忠孝東路一段 100 號",
    },
    items: [
      {
        productId: "694b935836bc8186e8f04e61",
        name: "Samsung 990 PRO 1TB",
        price: 3990,
        quantity: 2,
        image:
          "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
      },
      {
        productId: "694b935836bc8186e8f04e68",
        name: "G.Skill Trident Z5 RGB 32GB",
        price: 5290,
        quantity: 2,
        image:
          "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
      },
      {
        productId: "694b935836bc8186e8f04e6b",
        name: "Seasonic FOCUS GX-750",
        price: 3890,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
      },
    ],
    totalAmount: 22450,
    status: "pending",
  },
  {
    user: "694b935836bc8186e8f04e7a",
    shippingInfo: {
      fullName: "Alex",
      phone: "0912345678",
      address: "新北市三重區重新路二段 100 號",
    },
    items: [
      {
        productId: "694b935836bc8186e8f04e5f",
        name: "ASUS TUF Gaming RTX 4070 Ti",
        price: 25990,
        quantity: 1,
        image:
          "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
      },
      {
        productId: "694b935836bc8186e8f04e66",
        name: "Kingston Fury Beast DDR5 32GB",
        price: 4590,
        quantity: 2,
        image:
          "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
      },
    ],
    totalAmount: 35170,
    status: "paid",
  },
];

exports.seedOrder = async () => {
  try {
    await Order.deleteMany();
    console.log("訂單資料已清除完畢");

    await Order.insertMany(orders);
    console.log("新增訂單 Seed 成功");
  } catch (error) {
    console.error("新增訂單 Seed 失敗：", error);
  }
};
