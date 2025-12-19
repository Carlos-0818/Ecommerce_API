// 驗證 JWT，並將解出的使用者資訊放到 req.user

const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 檢查是否有帶 Authorization header，且開頭為 Bearer
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      code: "UNAUTHORIZED",
      message: "缺少授權資訊，請重新登入",
    });
  }

  const JWT_KEY = process.env.JWT_KEY;
  const token = authHeader.split(" ")[1];

  try {
    // 驗證並解析 token
    const decoded = jwt.verify(token, JWT_KEY);

    // 將解析後的資訊放在 req.user，以供後續使用
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("JWT 驗證失敗：", error);
    return res.status(401).json({
      success: false,
      code: "INVALID_TOKEN",
      message: "登入憑證無效或過期，請重新登入",
    });
  }
};
