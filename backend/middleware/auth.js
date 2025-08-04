const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '未提供访问令牌' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    // 验证用户是否存在
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: '用户不存在' });
    }

    next();
  } catch (error) {
    console.error('Token验证错误:', error);
    res.status(403).json({ message: '无效的访问令牌' });
  }
};

module.exports = { authenticateToken };