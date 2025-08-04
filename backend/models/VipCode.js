const db = require('../config/db');

class VipCode {
  static async create(codeData) {
    const { code, duration, description, created_by } = codeData;
    const [result] = await db.execute(
      'INSERT INTO vip_codes (code, duration, description, created_by, created_at) VALUES (?, ?, ?, ?, NOW())',
      [code, duration, description, created_by]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.execute(`
      SELECT vc.*, u.username as created_by_name 
      FROM vip_codes vc 
      LEFT JOIN users u ON vc.created_by = u.id 
      ORDER BY vc.created_at DESC
    `);
    return rows;
  }

  static async findByCode(code) {
    const [rows] = await db.execute(
      'SELECT id, code, duration, description, is_used, used_by, used_at FROM vip_codes WHERE code = ?',
      [code]
    );
    return rows[0];
  }

  static async update(id, updateData) {
    const { code, duration, description } = updateData;
    const [result] = await db.execute(
      'UPDATE vip_codes SET code = ?, duration = ?, description = ? WHERE id = ?',
      [code, duration, description, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.execute(
      'DELETE FROM vip_codes WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  static async markAsUsed(code, userId) {
    const [result] = await db.execute(
      'UPDATE vip_codes SET is_used = true, used_by = ?, used_at = NOW() WHERE code = ?',
      [userId, code]
    );
    return result.affectedRows > 0;
  }
}

module.exports = VipCode;