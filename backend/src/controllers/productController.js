// 處理商品相關的商業邏輯

const Product = require("../models/productModel");

/**
 * @desc    取得商品列表
 * @route   GET /api/products
 * @access  Public
 */
exports.getProducts = async (req, res) => {
  try {
    // 從 query string 取得參數
    const {
      keyword,
      category,
      brand,
      status,
      sort = "createdAt_desc", // 預設依建立時間新到舊
      page = 1,
      limit = 12,
    } = req.query;

    // 查詢條件
    const filter = {};

    if (keyword) {
      // 將使用者輸入的值轉為純文字，避免 regex injection
      // 如果遇到特殊符號自動轉為 \，例如：a.b*c 轉為 a\.b\*c\
      const escapeRegex = (s = "") => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // 模糊搜尋 name / brand
      const regex = new RegExp(escapeRegex(keyword), "i");
      filter.$or = [{ name: regex }, { brand: regex }]; //$or 代表符合其中一項就成立
    }

    if (category) {
      filter.category = category;
    }

    if (brand) {
      filter.brand = brand;
    }

    if (status && status !== "all") {
      filter.status = status;
    } else {
      filter.status = "active";
    }

    // 排序設定
    let sortOption = {};
    switch (sort) {
      case "price_asc":
        sortOption = { price: 1 };
        break;
      case "price_desc":
        sortOption = { price: -1 };
        break;
      case "createdAt_asc":
        sortOption = { createdAt: 1 };
        break;
      case "createdAt_desc":
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    // 總筆數計算
    const totalItems = await Product.countDocuments(filter);

    // 取得商品資訊
    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum)
      .lean();

    res.status(200).json({
      success: true,
      message: "取得商品列表成功",
      data: products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        totalItems,
        totalPages: Math.ceil(totalItems / limitNum),
      },
    });
  } catch (error) {
    console.error("取得商品列表時發生錯誤：", error);
    res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "取得商品列表時發生錯誤，請稍後再試",
    });
  }
};

/**
 * @desc    取得單一商品（slug）
 * @route   GET /api/products/slug/:slug
 * @access  Public
 */
exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug }).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        code: "RESOURCE_NOT_FOUND",
        message: "找不到對應的商品",
      });
    }

    res.status(200).json({
      success: true,
      message: "取得商品資訊成功",
      data: product,
    });
  } catch (error) {
    console.error("取得商品資訊時發生錯誤：", error);
    res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "取得商品資訊時發生錯誤，請稍後再試",
    });
  }
};

/**
 * @desc    取得單一商品（id）
 * @route   GET /api/products/:id
 * @access  Public
 */
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        code: "RESOURCE_NOT_FOUND",
        message: "找不到對應的商品",
      });
    }

    res.status(200).json({
      success: true,
      message: "取得商品資訊成功",
      data: product,
    });
  } catch (error) {
    console.error("取得商品資訊時發生錯誤：", error);
    res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "取得商品資訊時發生錯誤，請稍後再試",
    });
  }
};
