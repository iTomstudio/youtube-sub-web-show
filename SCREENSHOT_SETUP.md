# 截图文件设置指南

## 已完成的工作 ✅

1. **修复了 TypeScript 错误**
   - 在 `ExampleResource` 接口中取消注释了 `imageUrl` 属性
   - 现在可以正确支持图片显示

2. **更新了页面模板**
   - 示例资源卡片现在会：
     - 优先显示真实图片（如果提供了 `imageUrl`）
     - 如果没有图片，则显示渐变色占位符
     - 支持图片加载错误的优雅降级

3. **创建了 `/public/examples/` 目录**
   - 用于存放您的4张截图

4. **更新了示例资源数据**
   - 已配置4个示例：TVer, Hulu, U-NEXT, TBS
   - 每个都指向对应的图片路径

## 下一步操作 📋

### 添加截图文件

您需要将提供的4张截图（TVer、Hulu、U-NEXT、TBS）保存到以下位置：

```
/home/jerry-e15/main/claude_dev/youtube-sub-web-show/public/examples/
```

**具体文件名**：
1. `tver-screenshot.jpg` - TVer 平台截图
2. `hulu-screenshot.jpg` - Hulu 平台截图
3. `unext-screenshot.jpg` - U-NEXT 平台截图
4. `tbs-screenshot.jpg` - TBS 平台截图

### 方法一：使用命令行复制

如果您的截图文件在某个目录下，可以这样操作：

```bash
# 假设您的截图在下载文件夹中，需要根据实际路径调整
cd /path/to/your/screenshots/

# 复制并重命名文件（请根据实际文件名调整）
cp tver.jpg /home/jerry-e15/main/claude_dev/youtube-sub-web-show/public/examples/tver-screenshot.jpg
cp hulu.jpg /home/jerry-e15/main/claude_dev/youtube-sub-web-show/public/examples/hulu-screenshot.jpg
cp unext.jpg /home/jerry-e15/main/claude_dev/youtube-sub-web-show/public/examples/unext-screenshot.jpg
cp tbs.jpg /home/jerry-e15/main/claude_dev/youtube-sub-web-show/public/examples/tbs-screenshot.jpg
```

### 方法二：使用文件管理器

1. 打开文件管理器
2. 导航到：`/home/jerry-e15/main/claude_dev/youtube-sub-web-show/public/examples/`
3. 将4张截图拖拽到此文件夹
4. 重命名为上述指定的文件名

## 图片要求 📐

- **格式**：JPG 或 PNG（推荐 JPG）
- **宽高比**：16:9（视频格式，如 1920x1080 或 1280x720）
- **文件大小**：建议每张小于 500KB（优化加载速度）
- **分辨率**：建议至少 1280x720

## 查看效果 👀

添加图片后：

1. 开发服务器会自动热更新（如果正在运行）
2. 访问：http://localhost:5174/
3. 点击导航栏的"定制服务"
4. 向下滚动到"我们能为您找到的资源"区域
5. 您应该能看到4张截图以网格布局显示：
   - 移动端：单列
   - 平板：2列
   - 桌面：4列

## 当前页面代码配置

在 `src/pages/CustomServicesView.vue` 中：

```typescript
const exampleResources = ref<ExampleResource[]>([
  {
    id: 1,
    title: 'TVer 日剧资源',
    icon: Tv,
    type: 'drama',
    imageUrl: '/examples/tver-screenshot.jpg' // 指向您要添加的文件
  },
  {
    id: 2,
    title: 'Hulu 日剧资源',
    icon: Play,
    type: 'drama',
    imageUrl: '/examples/hulu-screenshot.jpg' // 指向您要添加的文件
  },
  {
    id: 3,
    title: 'U-NEXT 综合资源',
    icon: BookOpen,
    type: 'drama',
    imageUrl: '/examples/unext-screenshot.jpg' // 指向您要添加的文件
  },
  {
    id: 4,
    title: 'TBS 节目资源',
    icon: BookMarked,
    type: 'drama',
    imageUrl: '/examples/tbs-screenshot.jpg' // 指向您要添加的文件
  }
])
```

## 其他待添加的文件

您还需要添加以下 QR 码图片（之前提到的）：

```
/home/jerry-e15/main/claude_dev/youtube-sub-web-show/public/qr-codes/
├── wechat-qr.jpg ✅ (已存在)
├── qq-qr.jpg ✅ (已存在)
├── wechat-official-qr.jpg ❌ (需要添加 - 微信公众号)
└── qq-group-qr.jpg ❌ (需要添加 - QQ交流群)
```

详细说明请查看：[/public/qr-codes/QR_CODES_GUIDE.md](public/qr-codes/QR_CODES_GUIDE.md)

## 故障排除 🔧

### 图片不显示？
1. 检查文件名是否完全匹配（区分大小写）
2. 检查文件路径是否正确
3. 打开浏览器开发者工具（F12）→ Console 查看错误
4. 尝试硬刷新（Ctrl+Shift+R）

### 显示的是渐变占位符而不是图片？
- 这说明图片文件不存在或路径不正确
- 检查文件是否在正确的目录中
- 检查文件名是否完全匹配

### 图片太模糊？
- 提供更高分辨率的原始截图
- 建议使用至少 1280x720 的图片

---

## 参考文档

- **示例图片详细说明**：[/public/examples/EXAMPLES_GUIDE.md](public/examples/EXAMPLES_GUIDE.md)
- **QR码图片说明**：[/public/qr-codes/QR_CODES_GUIDE.md](public/qr-codes/QR_CODES_GUIDE.md)
- **页面更新总结**：[CUSTOM_SERVICES_UPDATE.md](CUSTOM_SERVICES_UPDATE.md)

---

**完成截图添加后，定制服务页面将完全准备就绪！** 🎉
