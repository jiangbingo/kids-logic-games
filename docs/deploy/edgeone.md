# 部署到EdgeOne 🚀

## 快速部署

### 1. 创建站点

访问 [EdgeOne控制台](https://console.cloud.tencent.com/edgeone)，点击"新建站点"

### 2. 配置域名

- 站点名称：kids-logic-games
- 站点接入方式：域名接入
- 输入您的域名（如：games.yourdomain.com）

### 3. 上传文件

将 `kids-logic-games/dist/` 目录所有文件上传到静态网站

### 4. 配置HTTPS

1. 进入SSL/TLS配置
2. 申请免费证书
3. 启用HTTPS

### 5. DNS解析

添加CNAME记录：
```
类型：CNAME
主机记录：@
记录值：xxx.cloud.tencentdn.com
```

## 验证部署

```bash
# 检查HTTP响应
curl -I https://your-domain.com

# 测试游戏功能
- 所有游戏可正常访问
- 移动端适配正常
- 进度保存正常
```

## 更新部署

```bash
# 重新构建
make build

# 上传dist/目录文件
```

## 常见问题

**域名访问不了**：检查DNS配置，等待生效（5-60分钟）

**提示不安全**：检查证书是否签发完成

**文件404**：确认文件已上传，清除CDN缓存

---

**完成部署！** 🎉