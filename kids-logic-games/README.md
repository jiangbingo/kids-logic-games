# 儿童逻辑思维游戏 🎮

> 适合3-6岁儿童的趣味逻辑思维网页游戏集，完美适配iPhone/iPad等移动设备

![Version](https://img.shields.io/badge/version-v3.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey)

## ✨ 核心特性

- **🎮 6个游戏**：颜色配对、形状识别、简单拼图、数字认知、记忆大师、字母配对
- **📊 69+关卡**：丰富的游戏内容，从简单到困难
- **👤 用户系统**：多用户支持，独立进度保存
- **💾 双模式存储**：本地+云端，智能切换
- **📱 完美适配**：响应式设计，触摸优化
- **🌐 零依赖**：纯HTML/CSS/JavaScript，开箱即用
- **🚀 快速加载**：轻量级，性能优秀
- **🔒 隐私保护**：无追踪，无数据收集

## 🎮 游戏介绍

### 🎨 颜色配对
认识6种基本颜色，锻炼颜色识别能力  
**关卡**：5关 | **难度**：简单 | **适合年龄**：3-4岁

### ⭐ 形状识别
学习6种基本形状，提升空间感知能力  
**关卡**：5关 | **难度**：简单 | **适合年龄**：3-4岁

### 🧩 简单拼图
完成可爱的动物拼图，培养手眼协调  
**关卡**：4关 | **难度**：简单 | **适合年龄**：3-5岁

### 🔢 数字认知
学习1-10数字和计数，建立数学基础  
**关卡**：5关 | **难度**：简单 | **适合年龄**：4-6岁

### 🧠 记忆大师
锻炼记忆力和观察力  
**关卡**：50关 | **难度**：4级递进 | **适合年龄**：4-6岁  
**主题**：10种（水果、蔬菜、车辆、动物、运动、天气、食物、花卉、太空、音乐）

### 🔤 字母配对
认识26个英文字母大小写  
**关卡**：无限递进 | **难度**：自适应 | **适合年龄**：4-6岁

## 🚀 快速开始

### 3步上手

```bash
# 1. 下载项目
git clone <your-repo-url>
cd games/kids-logic-games

# 2. 启动服务
python3 -m http.server 8000

# 3. 开始游戏
# 访问 http://localhost:8000
```

### 手机访问

```bash
# 1. 查看IP地址
ifconfig | grep "inet " | grep -v 127.0.0.1

# 2. 手机浏览器访问
# http://[你的IP]:8000
```

## 📖 详细文档

- [快速开始](docs/quick-start.md) - 3分钟上手
- [功能介绍](docs/features.md) - 完整功能说明
- [游戏介绍](docs/games/) - 各游戏详细说明
- [部署指南](docs/deploy/edgeone.md) - EdgeOne部署详解

## 🎯 游戏操作

### 基本流程

1. **登录** - 输入用户名开始游戏
2. **选择** - 从6个游戏中选择一个
3. **游戏** - 按提示操作完成关卡
4. **保存** - 进度自动保存
5. **继续** - 下次登录从断点继续

### 数据存储

**纯前端模式**（推荐）：
- 使用localStorage本地存储
- 零依赖，完全离线可用
- 适合个人/家庭使用

**云端模式**（可选）：
- PostgreSQL + Redis持久化
- 支持跨设备同步
- 适合多用户/团队使用

## 🛠 技术栈

### 前端
- JavaScript (ES6+)
- CSS3
- HTML5

### 后端（可选）
- Node.js + Express.js
- PostgreSQL
- Redis

## 🌐 部署方式

### 方式A：纯前端部署（推荐）

```bash
make build
# 上传 dist/ 目录到EdgeOne
```

### 方式B：完整部署

```bash
make docker-up
make build
# 部署前端+后端
```

## 📱 移动端适配

完美支持：
- ✅ iPhone (iOS 12+)
- ✅ iPad (iOS 12+)
- ✅ Android手机
- ✅ Android平板

## 🔧 可用命令

```bash
# 开发
make start          # 启动前端
make start-api      # 启动后端
make dev            # 启动完整环境
make stop           # 停止所有服务

# 构建
make build          # 构建前端
make clean          # 清理构建文件

# 部署
make deploy         # 部署到EdgeOne
make deploy-all     # 部署前端+后端

# 文档
make docs           # 构建文档
make docs-serve     # 查看文档

# 状态
make status         # 查看服务状态
make health         # 健康检查

# 帮助
make help           # 查看所有命令
```

## 📊 项目统计

- **游戏数**：6个
- **总关卡数**：69+
- **记忆主题**：10种
- **API端点**：15+
- **文档页面**：20+

## 📄 开源协议

MIT License

## 👨 作者

OpenCode AI Assistant

---

**给孩子们一个快乐的童年！** 🎮❤️

🚀 **立即开始**：
```bash
make dev-full
```