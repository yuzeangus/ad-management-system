const VipCode = require('../models/VipCode');
const User = require('../models/User');

// 获取VIP兑换码列表
const getVipCodes = async (req, res) => {
  try {
    const codes = await VipCode.findAll();
    res.json(codes);
  } catch (error) {
    console.error('获取VIP码错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 创建新的VIP兑换码
const createVipCode = async (req, res) => {
  try {
    const { code, duration, description } = req.body;

    if (!code || !duration) {
      return res.status(400).json({ message: '请提供兑换码和有效期' });
    }

    const id = await VipCode.create({
      code,
      duration,
      description,
      created_by: req.user.userId
    });

    res.status(201).json({
      message: 'VIP兑换码创建成功',
      data: { id, code, duration, description }
    });
  } catch (error) {
    console.error('创建VIP码错误:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: '兑换码已存在' });
    }
    res.status(500).json({ message: '服务器错误' });
  }
};

// 更新VIP兑换码
const updateVipCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, duration, description } = req.body;

    const updated = await VipCode.update(id, {
      code,
      duration,
      description
    });

    if (!updated) {
      return res.status(404).json({ message: 'VIP兑换码不存在' });
    }

    res.json({ message: 'VIP兑换码更新成功' });
  } catch (error) {
    console.error('更新VIP码错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 删除VIP兑换码
const deleteVipCode = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await VipCode.delete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'VIP兑换码不存在' });
    }

    res.json({ message: 'VIP兑换码删除成功' });
  } catch (error) {
    console.error('删除VIP码错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

// 兑换VIP码
const redeemVipCode = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.userId;

    if (!code) {
      return res.status(400).json({ message: '请提供兑换码' });
    }

    // 查找兑换码
    const vipCode = await VipCode.findByCode(code);
    if (!vipCode) {
      return res.status(400).json({ message: '无效的兑换码' });
    }

    if (vipCode.is_used) {
      return res.status(400).json({ message: '兑换码已被使用' });
    }

    // 更新用户VIP状态
    await User.extendVip(userId, vipCode.duration);
    
    // 标记兑换码为已使用
    await VipCode.markAsUsed(code, userId);

    res.json({ message: 'VIP兑换成功', duration: vipCode.duration });
  } catch (error) {
    console.error('兑换VIP码错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
};

module.exports = {
  getVipCodes,
  createVipCode,
  updateVipCode,
  deleteVipCode,
  redeemVipCode
};