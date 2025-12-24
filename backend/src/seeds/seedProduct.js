// 用於測試的商品 Seed

const Product = require("../models/productModel");

const products = [
  // ===== CPU =====
  {
    name: "Intel Core i5-14400F",
    slug: "intel-core-i5-14400f",
    category: "CPU",
    brand: "Intel",
    price: 5490,
    stock: 20,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: {
      coreCount: "10",
      threadCount: "16",
      socket: "LGA1700",
      tdp: "65W",
    },
    description: "第 14 代 Intel Core i5，主流遊戲與日常工作首選",
  },
  {
    name: "Intel Core i7-14700K",
    slug: "intel-core-i7-14700k",
    category: "CPU",
    brand: "Intel",
    price: 12990,
    stock: 8,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: {
      coreCount: "20",
      threadCount: "28",
      socket: "LGA1700",
      tdp: "125W",
    },
    description: "高效能創作與遊戲處理器",
  },
  {
    name: "AMD Ryzen 5 7600",
    slug: "amd-ryzen-5-7600",
    category: "CPU",
    brand: "AMD",
    price: 6990,
    stock: 15,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { coreCount: "6", threadCount: "12", socket: "AM5", tdp: "65W" },
    description: "AM5 平台入門首選",
  },
  {
    name: "AMD Ryzen 7 7800X3D",
    slug: "amd-ryzen-7-7800x3d",
    category: "CPU",
    brand: "AMD",
    price: 15990,
    stock: 6,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: {
      coreCount: "8",
      threadCount: "16",
      socket: "AM5",
      cache: "96MB L3",
    },
    description: "遊戲效能王者",
  },
  {
    name: "AMD Ryzen 9 7950X",
    slug: "amd-ryzen-9-7950x",
    category: "CPU",
    brand: "AMD",
    price: 21990,
    stock: 4,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { coreCount: "16", threadCount: "32", socket: "AM5", tdp: "170W" },
    description: "旗艦級創作者 CPU",
    status: "inactive",
  },

  // ===== GPU =====
  {
    name: "MSI GeForce RTX 4060 Ventus 2X",
    slug: "msi-rtx-4060-ventus-2x",
    category: "GPU",
    brand: "MSI",
    price: 10990,
    stock: 12,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { memory: "8GB GDDR6" },
    description: "1080p / 1440p 主流顯卡",
  },
  {
    name: "ASUS Dual RTX 4060 Ti",
    slug: "asus-dual-rtx-4060-ti",
    category: "GPU",
    brand: "ASUS",
    price: 15990,
    stock: 9,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { memory: "8GB GDDR6" },
    description: "效能與價格平衡的中階卡",
  },
  {
    name: "Gigabyte RTX 4070 Windforce",
    slug: "gigabyte-rtx-4070-windforce",
    category: "GPU",
    brand: "GIGABYTE",
    price: 21990,
    stock: 6,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { memory: "12GB GDDR6X" },
    description: "2K 遊戲高效能顯卡",
  },
  {
    name: "ASUS TUF Gaming RTX 4070 Ti",
    slug: "asus-tuf-rtx-4070-ti",
    category: "GPU",
    brand: "ASUS",
    price: 25990,
    stock: 5,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { memory: "12GB GDDR6X" },
    description: "高階遊戲顯卡",
  },
  {
    name: "MSI RTX 4080 SUPRIM X",
    slug: "msi-rtx-4080-suprim-x",
    category: "GPU",
    brand: "MSI",
    price: 42990,
    stock: 2,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { memory: "16GB GDDR6X" },
    description: "頂級 4K 遊戲顯卡",
    status: "inactive",
  },

  // ===== SSD =====
  {
    name: "Samsung 990 PRO 1TB",
    slug: "samsung-990-pro-1tb",
    category: "SSD",
    brand: "Samsung",
    price: 3990,
    stock: 25,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { capacity: "1TB", interface: "PCIe 4.0" },
    description: "旗艦級 SSD",
  },
  {
    name: "Samsung 980 PRO 2TB",
    slug: "samsung-980-pro-2tb",
    category: "SSD",
    brand: "Samsung",
    price: 6990,
    stock: 10,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { capacity: "2TB", interface: "PCIe 4.0" },
    description: "高速穩定 SSD",
  },
  {
    name: "WD Black SN850X 1TB",
    slug: "wd-black-sn850x-1tb",
    category: "SSD",
    brand: "Western Digital",
    price: 3690,
    stock: 18,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { capacity: "1TB", interface: "PCIe 4.0" },
    description: "遊戲專用 SSD",
  },
  {
    name: "Crucial P5 Plus 1TB",
    slug: "crucial-p5-plus-1tb",
    category: "SSD",
    brand: "Crucial",
    price: 2990,
    stock: 20,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { capacity: "1TB", interface: "PCIe 4.0" },
    description: "高性價比 SSD",
  },
  {
    name: "Kingston KC3000 2TB",
    slug: "kingston-kc3000-2tb",
    category: "SSD",
    brand: "Kingston",
    price: 7490,
    stock: 6,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { capacity: "2TB", interface: "PCIe 4.0" },
    description: "高速讀寫旗艦 SSD",
    status: "inactive",
  },

  // ===== RAM =====
  {
    name: "Kingston Fury Beast DDR5 32GB",
    slug: "kingston-fury-beast-ddr5-32gb",
    category: "RAM",
    brand: "Kingston",
    price: 4590,
    stock: 18,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { capacity: "32GB", speed: "DDR5-6000" },
    description: "DDR5 高效能記憶體",
  },
  {
    name: "Corsair Vengeance DDR5 32GB",
    slug: "corsair-vengeance-ddr5-32gb",
    category: "RAM",
    brand: "Corsair",
    price: 4890,
    stock: 14,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { capacity: "32GB", speed: "DDR5-6000" },
    description: "穩定耐用 DDR5",
  },
  {
    name: "G.Skill Trident Z5 RGB 32GB",
    slug: "gskill-trident-z5-rgb-32gb",
    category: "RAM",
    brand: "G.Skill",
    price: 5290,
    stock: 10,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { capacity: "32GB", speed: "DDR5-6400" },
    description: "RGB 高效能記憶體",
  },
  {
    name: "Corsair Vengeance LPX DDR4 16GB",
    slug: "corsair-vengeance-lpx-ddr4-16gb",
    category: "RAM",
    brand: "Corsair",
    price: 1990,
    stock: 30,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { capacity: "16GB", speed: "DDR4-3200" },
    description: "DDR4 穩定首選",
  },
  {
    name: "TeamGroup T-Force Delta RGB 16GB",
    slug: "teamgroup-delta-rgb-16gb",
    category: "RAM",
    brand: "TeamGroup",
    price: 2190,
    stock: 22,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { capacity: "16GB", speed: "DDR4-3600" },
    description: "RGB 電競記憶體",
    status: "inactive",
  },

  // ===== PSU =====
  {
    name: "Seasonic FOCUS GX-750",
    slug: "seasonic-focus-gx-750",
    category: "PSU",
    brand: "Seasonic",
    price: 3890,
    stock: 15,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { wattage: "750W", efficiency: "80+ Gold" },
    description: "全模組金牌電源",
  },
  {
    name: "Corsair RM850x",
    slug: "corsair-rm850x",
    category: "PSU",
    brand: "Corsair",
    price: 4590,
    stock: 10,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { wattage: "850W", efficiency: "80+ Gold" },
    description: "高階顯卡首選",
  },
  {
    name: "Cooler Master MWE Gold 650",
    slug: "cm-mwe-gold-650",
    category: "PSU",
    brand: "Cooler Master",
    price: 2990,
    stock: 20,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { wattage: "650W", efficiency: "80+ Gold" },
    description: "高 CP 值電源",
  },
  {
    name: "ASUS ROG STRIX 1000W",
    slug: "asus-rog-strix-1000w",
    category: "PSU",
    brand: "ASUS",
    price: 7290,
    stock: 5,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { wattage: "1000W", efficiency: "80+ Gold" },
    description: "旗艦電源",
  },
  {
    name: "Thermaltake GF1 750W",
    slug: "thermaltake-gf1-750",
    category: "PSU",
    brand: "Thermaltake",
    price: 3590,
    stock: 8,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { wattage: "750W", efficiency: "80+ Gold" },
    description: "穩定耐用",
    status: "inactive",
  },

  // ===== Case =====
  {
    name: "Lian Li LANCOOL 216",
    slug: "lancool-216",
    category: "Case",
    brand: "Lian Li",
    price: 2990,
    stock: 12,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { formFactor: "ATX", fansIncluded: "3" },
    description: "高散熱中塔機殼",
  },
  {
    name: "NZXT H7 Flow",
    slug: "nzxt-h7-flow",
    category: "Case",
    brand: "NZXT",
    price: 3490,
    stock: 9,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { formFactor: "ATX", fansIncluded: "2" },
    description: "簡約高氣流",
  },
  {
    name: "Fractal Meshify 2 Compact",
    slug: "meshify-2-compact",
    category: "Case",
    brand: "Fractal Design",
    price: 3790,
    stock: 6,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { formFactor: "ATX", fansIncluded: "3" },
    description: "北歐風高散熱",
  },
  {
    name: "Cooler Master NR200P",
    slug: "nr200p",
    category: "Case",
    brand: "Cooler Master",
    price: 2890,
    stock: 14,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { formFactor: "Mini-ITX", fansIncluded: "2" },
    description: "ITX 小鋼砲",
  },
  {
    name: "Phanteks G500A",
    slug: "phanteks-g500a",
    category: "Case",
    brand: "Phanteks",
    price: 3290,
    stock: 7,
    images: [
      "https://images.pexels.com/photos/7859350/pexels-photo-7859350.jpeg",
    ],
    specs: { formFactor: "ATX", fansIncluded: "3" },
    description: "高氣流設計",
    status: "inactive",
  },
];

exports.seedProduct = async () => {
  try {
    await Product.deleteMany();
    console.log("商品資料已清除完畢");

    await Product.insertMany(products);
    console.log("新增商品 Seed 成功");
  } catch (error) {
    console.error("新增商品 Seed 失敗：", error);
  }
};
