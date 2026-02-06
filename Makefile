.PHONY: help start stop build deploy clean test install dev prod all docs docs-serve docker-up docker-down docker-logs lint format

# 默认目标
.DEFAULT_GOAL := help

help:
	@echo "╔═════════════════════════════════════════════════════════════╗"
	@echo "║     儿童逻辑思维游戏 - 统一命令                              ║"
	@echo "╚═════════════════════════════════════════════════════════════╝"
	@echo ""
	@echo "🚀 开发命令:"
	@echo "  make start       - 启动前端开发服务器 (局域网访问，端口8000)"
	@echo "  make start-api   - 启动后端API服务器 (局域网访问，端口3000)"
	@echo "  make dev          - 启动完整开发环境"
	@echo "  make stop        - 停止所有开发服务器"
	@echo "  make restart     - 重启所有开发服务器"
	@echo ""
	@echo "🧪 测试命令:"
	@echo "  make test        - 运行所有测试"
	@echo "  make test-api    - 测试后端API"
	@echo "  make test-frontend - 测试前端"
	@echo "  make lint        - 运行代码检查"
	@echo "  make format      - 格式化代码"
	@echo ""
	@echo "🔨 构建命令:"
	@echo "  make build        - 构建前端生产版本"
	@echo "  make build-api    - 构建后端API"
	@echo "  make prod         - 构建生产版本（前端+后端）"
	@echo "  make clean        - 清理构建文件"
	@echo ""
	@echo "📦 部署命令:"
	@echo "  make deploy       - 部署到EdgeOne"
	@echo "  make deploy-api   - 部署后端API"
	@echo "  make deploy-all   - 部署前端和后端"
	@echo ""
	@echo "🐳 Docker命令:"
	@echo "  make docker-up     - 启动Docker服务"
	@echo "  make docker-down   - 停止Docker服务"
	@echo "  make docker-logs   - 查看Docker日志"
	@echo "  make docker-restart - 重启Docker服务"
	@echo ""
	@echo "📚 文档命令:"
	@echo "  make docs         - 构建文档"
	@echo "  make docs-serve   - 启动文档服务器 (端口8001)"
	@echo "  make docs-clean   - 清理文档"
	@echo ""
	@echo "📊 状态命令:"
	@echo "  make status       - 查看所有服务状态"
	@echo "  make health       - 健康检查"
	@echo ""
	@echo "💡 提示: 使用 'make <命令>' 来执行特定任务"

# 开发命令
start:
	@echo "🚀 启动前端开发服务器 (局域网访问)..."
	@cd kids-logic-games && python3 -m http.server 8000 --bind 0.0.0.0
	@echo ""
	@echo "✅ 前端已启动!"
	@echo "📱 局域网地址: http://192.168.3.169:8000"
	@echo "📝 本地地址: http://localhost:8000"
	@echo ""
	@echo "📱 局域网访问注意事项:"
	@echo "  1. 确保你的 Mac 和手机/平板在同一个 Wi-Fi 下"
	@echo "  2. 在手机/平板浏览器中输入 http://192.168.3.169:8000"
	@echo "  3. 如果无法访问，请检查 Mac 防火墙设置 (允许传入连接到端口 8000)"

start-api:
	@echo "🚀 启动后端API服务器 (局域网访问)..."
	@cd kids-logic-games/backend && npm start
	@echo ""
	@echo "✅ 后端 API 已启动!"
	@echo "📱 局域网地址: http://192.168.3.169:3000"
	@echo "📝 本地地址: http://localhost:3000"
	@echo ""
	@echo "📱 局域网访问注意事项:"
	@echo "  1. 确保你的 Mac 和手机/平板在同一个 Wi-Fi 下"
	@echo "  2. 在手机/平板浏览器中输入 http://192.168.3.169:3000"
	@echo "  3. 如果无法访问，请检查 Mac 防火墙设置 (允许传入连接到端口 3000)"

dev:
	@echo "🚀 启动开发环境..."
	@make start-api > /tmp/api.log 2>&1 &
	@sleep 2
	@make start
	@echo ""
	@echo "✅ 开发环境已启动!"
	@echo "📱 前端: http://192.168.3.169:8000 (或 localhost:8000)"
	@echo "📱 后端: http://192.168.3.169:3000 (或 localhost:3000)"

stop:
	@echo "🛑 停止所有开发服务器..."
	@pkill -f "python3 -m http.server 8000" || echo "前端服务器未运行"
	@pkill -f "node.*server.js" || echo "后端API服务器未运行"
	@echo "✅ 所有服务器已停止"

restart:
	@echo "🔄 重启所有开发服务器..."
	@make stop
	@sleep 1
	@make dev
	@echo "✅ 服务器已重启!"

# 测试命令
test:
	@echo "🧪 运行所有测试..."
	@make test-frontend
	@make test-api
	@echo "✅ 所有测试完成"

test-frontend:
	@echo "🧪 运行前端测试..."
	@cd kids-logic-games && make test

test-api:
	@echo "🧪 运行后端API测试..."
	@cd kids-logic-games/backend && npm test

lint:
	@echo "🔍 运行代码检查..."
	@cd kids-logic-games/backend && npm run lint
	@echo "✅ 代码检查完成"

format:
	@echo "✨ 格式化代码..."
	@cd kids-logic-games/backend && npm run format
	@echo "✅ 代码格式化完成"

# 构建命令
build:
	@echo "🔨 构建前端生产版本..."
	@cd kids-logic-games && make build
	@echo "✅ 前端构建完成"

build-api:
	@echo "🔨 构建后端API..."
	@cd kids-logic-games/backend && npm run build
	@echo "✅ 后端API构建完成"

prod: build build-api
	@echo "✅ 生产版本构建完成"

clean:
	@echo "🧹 清理构建文件..."
	@cd kids-logic-games && make clean
	@cd kids-logic-games/backend && rm -rf node_modules dist
	@make docs-clean
	@echo "✅ 清理完成"

# 部署命令
deploy:
	@echo "📦 准备部署到EdgeOne..."
	@cd kids-logic-games && make build
	@echo ""
	@echo "部署方式："
	@echo "1. 腾讯云控制台："
	@echo "   - 登录 https://console.cloud.tencent.com/edgeone"
	@echo "   - 创建站点或选择已有站点"
	@echo "   - 将 kids-logic-games/dist/ 目录内容上传到静态网站托管"
	@echo ""
	@echo "2. 使用COS+CDN："
	@echo "   - 将 kids-logic-games/dist/ 目录上传到腾讯云COS存储桶"
	@echo "   - 配置静态网站托管"
	@echo "   - 在EdgeOne中添加CDN加速域名"
	@echo ""
	@make build

deploy-api:
	@echo "📦 部署后端API..."
	@cd kids-logic-games/backend && npm run build
	@echo "后端API构建完成，请使用Docker部署"

deploy-all: deploy deploy-api
	@echo "✅ 前端和后端部署完成"

# Docker命令
docker-up:
	@echo "🐳 启动Docker服务..."
	@cd kids-logic-games && docker-compose up -d
	@echo "✅ Docker服务已启动"
	@echo "   - API: http://localhost:3000"
	@echo "   - Adminer: http://localhost:8080"
	@echo ""
	@echo "📱 局域网地址: http://192.168.3.169:3000 (API)"
	@echo "📱 局域网地址: http://192.168.3.169:8080 (Adminer)"

docker-down:
	@echo "🐳 停止Docker服务..."
	@cd kids-logic-games && docker-compose down
	@echo "✅ Docker服务已停止"

docker-logs:
	@echo "📊 查看Docker日志..."
	@cd kids-logic-games && docker-compose logs -f

docker-restart:
	@echo "🔄 重启Docker服务..."
	@cd kids-logic-games && docker-compose restart
	@echo "✅ Docker服务已重启"

# 文档命令
docs:
	@echo "📚 构建文档网站..."
	@mkdocs build
	@echo "✅ 文档已构建到 site/ 目录"

docs-serve:
	@echo "📚 启动文档服务器 (局域网访问)..."
	@mkdocs serve -a 0.0.0.0:8001
	@echo ""
	@echo "✅ 文档服务器已启动!"
	@echo "📱 局域网地址: http://192.168.3.169:8001"
	@echo "📝 本地地址: http://localhost:8001"

docs-clean:
	@echo "🧹 清理文档构建文件..."
	@rm -rf site/
	@echo "✅ 文档清理完成"

# 状态命令
status:
	@echo "📊 检查服务状态..."
	@echo ""
	@echo "前端服务器 (8000):"
	@ps aux | grep -E "python3 -m http.server 8000" | grep -v grep || grep -v grep && echo "  ✅ 运行中" || echo "  ❌ 未运行"
	@echo ""
	@echo "后端API服务器 (3000):"
	@ps aux | grep -E "node.*server.js" | grep -v grep || grep -v grep && echo "  ✅ 运行中" || echo "  ❌ 未运行"
	@echo ""
	@echo "Docker服务:"
	@cd kids-logic-games && docker-compose ps

health:
	@echo "🔍 执行健康检查..."
	@echo ""
	@echo "检查前端 (8000)..."
	@curl -s -o /dev/null -w "  HTTP %{http_code}\n" http://localhost:8000/ || echo "  ❌ 无法连接"
	@echo ""
	@echo "检查后端API (3000)..."
	@curl -s http://localhost:3000/health || echo "  ❌ 无法连接"
	@echo ""
	@echo "检查数据库 (5432)..."
	@cd kids-logic-games && docker-compose exec -T postgres pg_isready || echo "  ❌ 数据库未就绪"
	@echo ""
	@echo "检查Redis (6379)..."
	@cd kids-logic-games && docker-compose exec -T redis redis-cli ping || echo "  ❌ Redis未就绪"

# 工具命令
install:
	@echo "📥 安装依赖..."
	@cd kids-logic-games/backend && npm install
	@pip install mkdocs-material mkdocs-minify-plugin
	@echo "✅ 依赖安装完成"

install-api:
	@echo "📥 安装后端依赖..."
	@cd kids-logic-games/backend && npm install
	@echo "✅ 后端依赖安装完成"

update:
	@echo "📦 更新依赖..."
	@cd kids-logic-games/backend && npm update
	@pip install --upgrade mkdocs-material mkdocs-minify-plugin
	@echo "✅ 依赖更新完成"

init:
	@echo "🚀 初始化项目..."
	@make install
	@docker network inspect games-network >/dev/null 2>&1 || docker network create games-network
	@echo "✅ 项目初始化完成"

# 组合命令
all: clean build test
	@echo "✅ 所有任务完成"

dev-full: docker-up dev
	@echo "✅ 完整开发环境已启动"

deploy-full: prod deploy-all
	@echo "✅ 完整部署完成"
