const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 启动VIP兑换码管理系统...\n');

// 启动后端服务器
const backendProcess = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit'
});

// 启动前端开发服务器
const frontendProcess = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'site'),
  stdio: 'inherit'
});

// 监听进程退出
process.on('SIGINT', () => {
  console.log('\n👋 正在关闭所有服务...');
  backendProcess.kill('SIGINT');
  frontendProcess.kill('SIGINT');
  process.exit(0);
});

console.log('✅ 后端服务器已启动 (端口: 5000)');
console.log('✅ 前端开发服务器已启动 (端口: 3000)');
console.log('🌐 访问地址: http://localhost:3000\n');