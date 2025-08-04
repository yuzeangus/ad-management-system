const db = require('../config/db');

class User {
  static async create(userData) {
    const { username, password, email, role = 'user' } = userData;
    const [result] = await db.execute(
      'INSERT INTO users (username, password, email, role, created_at) VALUES (?, ?, ?, ?, NOW())',
      [username, password, email, role]
    );
    return result.insertId;
  }

  static async findByUsername(username) {
    const [rows] = await db.execute(
      'SELECT id, username, password, email, role, vip_expiry FROM users WHERE username = ?',
      [username]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT id, username, email, role, vip_expiry FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async extendVip(userId, durationDays) {
    const [result] = await db.execute(
      `UPDATE users 
       SET vip_expiry = CASE 
         WHEN vip_expiry IS NULL OR vip_expiry < NOW() 
         THEN DATE_ADD(NOW(), INTERVAL ? DAY)
         ELSE DATE_ADD(vip_expiry, INTERVAL ? DAY)
       END
       WHERE id = ?`,
      [durationDays, durationDays, userId]
    );
    return result.affectedRows > 0;
  }

  static async isVip(userId) {
    const [rows] = await db.execute(
      'SELECT vip_expiry FROM users WHERE id = ?',
      [userId]
    );
    
    if (!rows[0] || !rows[0].vip_expiry) {
      return false;
    }

    return new Date(rows[0].vip_expiry) > new Date();
  }
}

module.exports = User;