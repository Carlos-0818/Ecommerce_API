// 處理註冊、登入的商業邏輯

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// 產生 JWT 的工具
function generateToken({ userId, role }) {
  const JWT_KEY = process.env.JWT_KEY;

  return jwt.sign({ userId, role }, JWT_KEY, { expiresIn: "15d" });
}

/**
 * @desc    使用者註冊
 * @route   POST /api/auth/signup
 * @access  Public
 */
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 簡單欄位檢查
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        code: "MISSING_PARAMETER",
        message: "Email、密碼、使用者名稱均為必填",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        code: "PASSWORD_TOO_WEAK",
        message: "密碼至少需 8 碼",
      });
    }

    // 檢查 Email 是否被註冊過
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        code: "RESOURCE_ALREADY_EXISTS",
        message: "此 Email 已經被註冊過，請改用其他 Email",
      });
    }

    // 建立新使用者
    const user = await User.create({ name, email, password });

    // 建立 JWT
    const token = generateToken({ userId: user._id, role: user.role });

    res.status(201).json({
      success: true,
      message: "註冊成功",
      data: {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error("註冊時發生錯誤：", error);
    res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "註冊時發生錯誤，請稍後再試",
    });
  }
};

/**
 * @desc    使用者登入
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 簡單欄位檢查
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        code: "MISSING_PARAMETER",
        message: "Email、密碼均為必填",
      });
    }

    // 檢查使用者輸入的 Eamil 是否存在
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        code: "UNAUTHORIZED",
        message: "登入失敗，Email 或密碼不正確",
      });
    }

    // 比對使用者輸入的密碼是否與 user 一致
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        code: "UNAUTHORIZED",
        message: "登入失敗，Email 或密碼不正確",
      });
    }

    // 建立 JWT
    const token = generateToken({ userId: user._id, role: user.role });

    res.status(200).json({
      success: true,
      message: "登入成功",
      data: {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error("登入時發生錯誤：", error);
    res.status(500).json({
      success: false,
      code: "SERVER_ERROR",
      message: "登入時發生錯誤，請稍後再試",
    });
  }
};
