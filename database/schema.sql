-- VIP兑换码管理系统数据库结构

-- 创建数据库
CREATE DATABASE IF NOT EXISTS vip_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vip_system;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    role ENUM('user', 'admin') DEFAULT 'user',
    vip_expiry DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- VIP兑换码表
CREATE TABLE IF NOT EXISTS vip_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    duration INT NOT NULL COMMENT 'VIP有效期(天)',
    description TEXT,
    is_used BOOLEAN DEFAULT FALSE,
    used_by INT NULL,
    used_at TIMESTAMP NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (used_by) REFERENCES users(id) ON DELETE SET NULL
);

-- 创建索引
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_vip_codes_code ON vip_codes(code);
CREATE INDEX idx_vip_codes_is_used ON vip_codes(is_used);
CREATE INDEX idx_vip_codes_created_by ON vip_codes(created_by);

-- 插入默认管理员用户 (密码: admin123)
INSERT INTO users (username, password, email, role) VALUES 
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@example.com', 'admin')
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;