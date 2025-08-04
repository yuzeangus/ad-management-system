# VIP兑换码管理系统

这是一个完整的VIP兑换码管理系统，包含前端和后端两部分。

## 项目结构

- `backend/` - 后端API服务
- `site/` - 前端管理界面

## 技术栈

### 后端
- Node.js
- Express.js
- MySQL
- JWT
- bcryptjs

### 前端
- React
- Ant Design
- Axios

## 功能特性

- 用户注册和登录
- JWT身份验证
- VIP兑换码生成和管理
- VIP状态查询
- 管理员权限控制

## 安装和运行

### 后端

1. 进入后端目录:
   ```
   cd backend
   ```

2. 安装依赖:
   ```
   npm install
   ```

3. 配置环境变量:
   创建 `.env` 文件并配置数据库连接信息和JWT密钥

4. 启动服务:
   ```
   npm start
   ```

### 前端

1. 进入前端目录:
   ```
   cd site
   ```

2. 安装依赖:
   ```
   npm install
   ```

3. 启动开发服务器:
   ```
   npm start
   ```

## API接口

### 认证相关
- POST /api/auth/register - 用户注册
- POST /api/auth/login - 用户登录

### VIP兑换码相关
- GET /api/vip/codes - 获取VIP兑换码列表
- POST /api/vip/codes - 创建新的VIP兑换码
- PUT /api/vip/codes/:id - 更新VIP兑换码
- DELETE /api/vip/codes/:id - 删除VIP兑换码
- POST /api/vip/redeem - 兑换VIP码

## 许可证

MIT