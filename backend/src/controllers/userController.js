// 處理使用者相關的商業邏輯

const User = require("../models/userModel");

/**
 * @desc    取得目前登入的使用者資訊
 * @route   GET /api/user/profile
 * @access  Private（需通過 JWT 驗證）
 */
exports.getProfile = async (req, res) => {
  try {
    // req.user 會在通過 authMiddleware 後設定
    const user = await User.findById(req.user.userId).lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        code: "RESOURCE_NOT_FOUND",
        message: "找不到使用者資訊",
      });
    }

    res.status(200).json({
      success: true,
      message: "取得使用者資訊成功",
      data: {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("取得使用者資訊時發生錯誤：", error);
    res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "取得使用者資訊時發生錯誤，請稍後再試",
    });
  }
};

/**
 * @desc    修改目前登入的使用者資訊
 * @route   PATCH /api/user/profile
 * @access  Private（需通過 JWT 驗證）
 */
exports.updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        code: "UNAUTHORIZED",
        message: "缺少授權資訊，請重新登入",
      });
    }
    let { name, email, currentPassword, newPassword } = req.body;

    // 預先處理成 DB 規範格式
    if (typeof name === "string") name = name.trim();
    if (typeof email === "string") email = email.trim().toLowerCase();

    // 至少要有一樣資料才更新
    const nameUpdated = typeof name === "string" && name.length > 0;
    const emailUpdated = typeof email === "string" && email.length > 0;
    const passwordUpdated =
      typeof currentPassword === "string" || typeof newPassword === "string";

    if (!nameUpdated && !emailUpdated && !passwordUpdated) {
      return res.status(400).json({
        success: false,
        code: "MISSING_PARAMETER",
        message: "請填寫要更新的欄位",
      });
    }

    // 取得目前登入的使用者舊資訊
    const user = await User.findById(req.user.userId).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        code: "RESOURCE_NOT_FOUND",
        message: "找不到使用者資訊",
      });
    }

    // 如果更新欄位是 Email，先檢查是否被其他人註冊過
    if (emailUpdated && email !== user.email) {
      const emailExists = await User.findOne({
        email,
        _id: { $ne: user._id }, // $ne 代表排除條件，避免抓到使用者本身這筆資料
      }).lean();

      if (emailExists) {
        return res.status(409).json({
          success: false,
          code: "RESOURCE_ALREADY_EXISTS",
          message: "此 Email 已經被註冊過，請改用其他 Email",
        });
      }

      user.email = email;
    }

    if (nameUpdated) {
      user.name = name;
    }

    // 更新密碼需要同時輸入舊密碼與新密碼
    if (passwordUpdated) {
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          code: "MISSING_PARAMETER",
          message: "更新密碼需要同時輸入舊密碼與新密碼",
        });
      }

      // 新舊密碼不可相同
      if (currentPassword === newPassword) {
        return res.status(400).json({
          success: false,
          code: "INVALID_PARAMETER",
          message: "新密碼不可與舊密碼相同",
        });
      }

      // 密碼長度檢查
      if (newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          code: "PASSWORD_TOO_WEAK",
          message: "密碼至少需 8 碼",
        });
      }

      // 比對使用者輸入的舊密碼是否與 user 一致
      const isMatch = await user.comparePassword(currentPassword);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          code: "UNAUTHORIZED",
          message: "舊密碼不正確",
        });
      }

      user.password = newPassword;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "使用者資訊更新成功",
      data: {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("更新使用者資訊時發生錯誤：", error);
    res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "更新使用者資訊時發生錯誤，請稍後再試",
    });
  }
};
