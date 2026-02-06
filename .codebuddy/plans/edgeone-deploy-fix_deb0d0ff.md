---
name: edgeone-deploy-fix
overview: 检查并修复 EdgeOne Pages 集成配置，确保项目命名符合规范，然后重新部署项目到 EdgeOne Pages
todos:
  - id: verify-build
    content: 验证 dist/ 目录构建文件完整性
    status: completed
  - id: check-config
    content: 确认 edgeone-config.json 配置正确
    status: completed
  - id: rebuild-project
    content: 执行 make build 重新构建项目
    status: completed
    dependencies:
      - verify-build
      - check-config
  - id: deploy-edgeone
    content: 使用 [integration:eop] 部署项目到 EdgeOne Pages
    status: completed
    dependencies:
      - rebuild-project
---

## Product Overview

修复 EdgeOne Pages 集成部署问题，确保项目配置符合规范并成功部署。

## Core Features

- 验证 EdgeOne Pages 集成配置正确性
- 确保项目命名符合规范
- 重新构建并部署项目到 EdgeOne Pages

## Tech Stack

- 静态网站：原生 HTML/CSS/JavaScript
- 构建工具：Makefile
- 部署平台：EdgeOne Pages
- 项目类型：前端静态应用

## Tech Architecture

### System Architecture

```mermaid
graph LR
    A[源文件<br/>index.html, css/, js/] --> B[构建脚本<br/>Makefile build]
    B --> C[构建输出<br/>dist/ 目录]
    C --> D[EdgeOne Pages<br/>集成部署]
    D --> E[线上访问<br/>静态网站]
```

### Module Division

- **构建模块**：使用 Makefile 将源文件复制到 dist/ 目录
- **部署模块**：通过 EdgeOne Pages 集成将 dist/ 目录部署到云端
- **配置模块**：edgeone-config.json 定义部署参数和优化设置

### Data Flow

源代码 → Makefile build 命令 → dist/ 构建目录 → EdgeOne Pages 集成部署 → 线上环境

## Implementation Details

### Core Directory Structure

```
kids-logic-games/
├── edgeone-config.json    # EdgeOne 部署配置
├── Makefile               # 构建和部署脚本
├── index.html             # 入口页面
├── css/
│   └── styles.css         # 样式文件
├── js/
│   ├── app.js            # 应用逻辑
│   ├── games.js          # 游戏逻辑
│   ├── api.js            # API 接口
│   └── storage.js        # 存储管理
└── dist/                 # 构建输出目录
    ├── index.html
    ├── css/
    │   └── styles.css
    └── js/
        ├── app.js
        ├── games.js
        ├── api.js
        └── storage.js
```

### Key Code Structures

**edgeone-config.json**：EdgeOne 部署配置文件

```
{
  "version": "1.0",
  "name": "kids-logic-games",
  "deployment": {
    "type": "static",
    "provider": "tencent-edgeone"
  }
}
```

**Makefile build 命令**：构建生产版本

```
build:
	@mkdir -p dist
	@cp -r css js index.html README.md dist/
	@echo "✅ 构建完成，输出到 dist/ 目录"
```

### Technical Implementation Plan

1. **验证构建状态**：检查 dist/ 目录是否包含完整构建文件
2. **确认配置正确**：验证 edgeone-config.json 项目名称符合规范
3. **重新构建项目**：执行 make build 确保构建文件最新
4. **部署到 EdgeOne**：使用集成工具部署 dist/ 目录

### Integration Points

- EdgeOne Pages 集成（已连接状态）
- 部署目标：dist/ 目录
- 静态网站配置：index.html 作为入口页

## Technical Considerations

### Logging

- 记录构建过程中的输出
- 记录部署操作的响应和状态

### Performance Optimization

- 启用 CSS/JS 压缩（已在 edgeone-config.json 配置）
- 配置缓存策略（静态资源 24 小时，HTML 文件 1 小时）

### Security Measures

- 启用 HTTPS
- 设置安全响应头（X-Frame-Options, X-XSS-Protection 等）

## Agent Extensions

### Integration

- **eop** (EdgeOne Pages Integration)
- Purpose: 部署静态网站到 EdgeOne Pages
- Expected outcome: 成功将 dist/ 目录部署到 EdgeOne Pages，项目可在线访问