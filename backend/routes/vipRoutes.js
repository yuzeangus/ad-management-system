const express = require('express');
const router = express.Router();
const vipController = require('../controllers/vipController');
const { authenticateToken } = require('../middleware/auth');

router.get('/codes', authenticateToken, vipController.getVipCodes);
router.post('/codes', authenticateToken, vipController.createVipCode);
router.put('/codes/:id', authenticateToken, vipController.updateVipCode);
router.delete('/codes/:id', authenticateToken, vipController.deleteVipCode);
router.post('/redeem', authenticateToken, vipController.redeemVipCode);

module.exports = router;