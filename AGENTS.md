# 儿童逻辑思维游戏 - Agent 开发指南

本文件为 AI Agent 和人类开发者提供代码库的开发规范和最佳实践。

## 项目概述

**项目类型**: 面向 3-6 岁儿童的 Web 游戏集
**技术栈**:
- 前端: 纯 HTML/CSS/JavaScript (ES6+), 零依赖
- 后端 (可选): Node.js + Express.js + PostgreSQL + Redis

**关键特性**: 响应式设计，双模式存储 (localStorage + PostgreSQL), 6 个游戏，69+ 关卡

---

## 构建、Lint、测试命令

### 前端 (项目根目录)

```bash
make start              # 启动 HTTP 服务器 (端口 8000)
make stop               # 停止服务器
make test               # 运行测试套件
make build             # 构建生产版本到 dist/
make clean             # 清理构建文件
```

### 后端 (backend/ 目录)

```bash
npm start              # 启动生产服务器
npm run dev            # 使用 nodemon 启动开发服务器
npm test              # 运行 Jest 测试套件
npm test -- path/to/test.js    # 运行单个测试文件
npm test -t "test_name"       # 运行特定测试
npm run lint          # 运行 ESLint
```

---

## 代码风格规范

### JavaScript

**格式化**: 2 空格缩进, 单引号 `'`, 必须使用分号, 行宽 100 字符

**命名约定**:
- 类名: `PascalCase` (如 `class UserStorage`)
- 函数/方法: `camelCase` (如 `loadUsers()`)
- 变量: `camelCase`
- 常量: `UPPER_SNAKE_CASE` (如 `MAX_LEVEL`)
- 私有成员: 前缀 `_` (如 `_internalMethod()`)

### CSS

**BEM 风格**: `.block`, `.block__element`, `.block--modifier`

**移动端优化** (必需):
```css
touch-action: manipulation;
-webkit-tap-highlight-color: transparent;
user-select: none;
```

---

## 导入/导出模式

### 前端 (无构建工具)

使用 `<script>` 标签顺序加载，全局类定义，使用 ES6 class 语法.

### 后端 (Node.js CommonJS)

```javascript
const express = require('express');
module.exports = router;
```

---

## 错误处理

### localStorage/存储操作

```javascript
try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : default;
} catch (error) {
    console.error('操作失败:', error);
    return default;
}
```

### 异步操作 (后端)

```javascript
try {
    const result = await query(sql, params);
    return result;
} catch (error) {
    console.error('数据库错误:', error);
    throw new Error('操作失败');
}
```

### 用户输入验证

```javascript
if (!username || username.trim() === '') {
    throw new Error('用户名不能为空');
}
```

---

## 注释规范

使用 JSDoc 注释类和公共方法:

```javascript
/**
 * 用户数据管理类
 * @returns {Array} 用户列表
 */
class UserStorage {
    loadUsers() { /* 实现 */ }
}
```

**关键**: 类和公共方法必须有 JSDoc，使用中文注释

---

## 移动端适配规范

**触摸反馈** (所有交互元素):
```javascript
addTouchFeedback(element) {
    element.addEventListener('touchstart', () => {
        element.style.transform = 'scale(0.95)';
    }, { passive: true });
    element.addEventListener('touchend', () => {
        element.style.transform = 'scale(1)';
    }, { passive: true });
}
```

**响应式断点**: 小屏 < 600px, 中屏 600-768px, 大屏 > 768px

**自适应**: 使用 `clamp()` 实现，如 `font-size: clamp(28px, 6vw, 48px)`

---

## 游戏开发规范

### 游戏结构

每个游戏应包含: 初始化 (`startGame()`), 关卡生成, 交互处理, 状态管理 (`win`/`lose`/`next`/`retry`), 进度保存

### 关卡配置

```javascript
const levelConfig = [
    { level: 1, cardCount: 3, displayTime: 6000, scoreMultiplier: 1.0 },
    // ...
];
```

### 主题系统

使用 emoji 作为图标: `{ name: '水果', items: ['🍎', '🍌', '🍇'] }`

---

## 测试指南

### 前端测试

```bash
make test
```

### 后端测试 (Jest)

```bash
npm test                      # 运行所有测试
npm test -- path/to/test.js    # 运行单个文件
npm test -t "test_name"       # 运行特定测试
npm test -- --coverage         # 生成覆盖率
```

**测试文件命名**: `*.test.js` 或 `*.spec.js`

---

## Git 工作流

```bash
git status                    # 查看未提交更改
git diff                      # 查看差异
git commit -m "feat: 添加新游戏"    # 提交
```

**Commit 类型**: `feat` (新功能), `fix` (修复 bug), `docs` (文档更新), `style` (格式调整), `refactor` (重构), `test` (测试)

---

## 重要提醒

1. **无构建工具**: 前端不使用 Webpack/Vite，直接编辑 `js/` 和 `css/` 文件
2. **移动端优先**: 所有 UI 必须完美适配 iOS/Android
3. **localStorage 优先**: 前端优先使用本地存储，云端为可选增强
4. **触摸优化**: 所有交互元素必须添加 `touch-action: manipulation`
5. **中文文档**: 注释和文档使用中文
6. **Emoji 支持**: 广泛使用 emoji 作为图标
7. **无外部依赖**: 前端保持零依赖，确保快速加载

---

## 快速检查清单

**修改代码前**:
- [ ] 遵循 ESLint/Prettier 规则
- [ ] 添加 JSDoc 注释
- [ ] 移动端触摸优化
- [ ] 错误处理完善
- [ ] 测试通过

**提交前**:
- [ ] `npm run lint` 或 `eslint` 通过
- [ ] `make test` 或 `npm test` 通过
- [ ] Commit 消息符合规范
