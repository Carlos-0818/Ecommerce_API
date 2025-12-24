// 處理訂單相關的商業邏輯

const Order = require("../models/orderModel");

/**
 * @desc    建立訂單
 * @route   POST /api/orders
 * @access  Private
 */
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { shippingInfo, items, totalAmount } = req.body;

    // 商品數量檢查
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        code: "MISSING_PARAM",
        message: "訂單至少需一項商品",
      });
    }

    // 寄件資訊檢查
    if (
      !shippingInfo ||
      !shippingInfo.fullName ||
      !shippingInfo.phone ||
      !shippingInfo.address
    ) {
      return res.status(400).json({
        success: false,
        code: "MISSING_PARAM",
        message: "請填寫完整收件人資訊",
      });
    }

    // 建立新訂單
    const order = await Order.create({
      user: userId,
      shippingInfo,
      items,
      totalAmount,
    });

    return res.status(201).json({
      success: true,
      message: "成功建立訂單",
      data: order,
    });
  } catch (error) {
    console.error("建立訂單時發生錯誤：", error);
    res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "建立訂單時發生錯誤，請稍後再試",
    });
  }
};

/**
 * @desc    取得使用者本人的訂單
 * @route   GET /api/orders/my-orders
 * @access  Private
 */
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      message: "成功取得訂單資訊",
      data: orders,
    });
  } catch (error) {
    console.error("取得訂單資訊時發生錯誤：", error);
    res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "取得訂單資訊時發生錯誤，請稍後再試",
    });
  }
};

/**
 * @desc    取得單一訂單
 * @route   GET /api/orders/:id
 * @access  Private
 */
exports.getOrderById = async (req, res) => {
  try {
    // 必須同時符合兩個參數，避免查詢到其他人的訂單
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.userId,
    }).lean();

    if (!order) {
      return res.status(404).json({
        success: false,
        code: "ORDER_NOT_FOUND",
        message: "找不到指定的訂單",
      });
    }

    res.status(200).json({
      success: true,
      message: "成功取得訂單資訊",
      data: order,
    });
  } catch (error) {
    console.error("取得訂單資訊時發生錯誤：", error);
    res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "取得訂單資訊時發生錯誤，請稍後再試",
    });
  }
};
