# 示例资源图片说明

这个目录用于存放在"定制服务"页面展示的日本视频平台示例截图。

## 需要的文件

请将您提供的4张截图保存为以下文件名，并放置在此目录中：

1. **tver-screenshot.jpg** ❌ (待添加)
   - 用途：TVer 平台示例
   - 显示标题：TVer 日剧资源
   - 建议尺寸：16:9 宽高比（例如 1920x1080 或 1280x720）

2. **hulu-screenshot.jpg** ❌ (待添加)
   - 用途：Hulu 平台示例
   - 显示标题：Hulu 日剧资源
   - 建议尺寸：16:9 宽高比（例如 1920x1080 或 1280x720）

3. **unext-screenshot.jpg** ❌ (待添加)
   - 用途：U-NEXT 平台示例
   - 显示标题：U-NEXT 综合资源
   - 建议尺寸：16:9 宽高比（例如 1920x1080 或 1280x720）

4. **tbs-screenshot.jpg** ❌ (待添加)
   - 用途：TBS 平台示例
   - 显示标题：TBS 节目资源
   - 建议尺寸：16:9 宽高比（例如 1920x1080 或 1280x720）

## 如何添加图片

### 方法 1：直接复制文件
```bash
# 将您的截图文件重命名并复制到这个目录
cp /path/to/your/tver-image.jpg /home/jerry-e15/main/claude_dev/youtube-sub-web-show/public/examples/tver-screenshot.jpg
cp /path/to/your/hulu-image.jpg /home/jerry-e15/main/claude_dev/youtube-sub-web-show/public/examples/hulu-screenshot.jpg
cp /path/to/your/unext-image.jpg /home/jerry-e15/main/claude_dev/youtube-sub-web-show/public/examples/unext-screenshot.jpg
cp /path/to/your/tbs-image.jpg /home/jerry-e15/main/claude_dev/youtube-sub-web-show/public/examples/tbs-screenshot.jpg
```

### 方法 2：使用文件管理器
1. 打开文件管理器
2. 导航到：`/home/jerry-e15/main/claude_dev/youtube-sub-web-show/public/examples/`
3. 将您的4张截图拖拽到此文件夹
4. 重命名为上述指定的文件名

## 图片要求

- **格式**：JPG 或 PNG（推荐 JPG 以减小文件大小）
- **宽高比**：16:9（视频格式）
- **分辨率**：建议 1280x720 或更高
- **文件大小**：建议每张图片小于 500KB（优化网页加载速度）

## 预览效果

添加图片后：
1. 开发服务器会自动重新加载（如果正在运行）
2. 访问定制服务页面：http://localhost:5174/
3. 向下滚动到"我们能为您找到的资源"区域
4. 您应该能看到4张截图以 2x2 网格布局显示

## 故障排除

### 图片不显示？
- 检查文件名是否完全匹配（区分大小写）
- 检查文件扩展名是否为 `.jpg`
- 检查浏览器控制台是否有加载错误
- 尝试硬刷新页面（Ctrl+Shift+R 或 Cmd+Shift+R）

### 图片显示模糊？
- 提供更高分辨率的图片
- 确保原始截图清晰

### 文件太大？
使用图片压缩工具减小文件大小：
- 在线工具：TinyPNG, Compressor.io
- 命令行：`convert input.jpg -quality 85 output.jpg`（需要 ImageMagick）

## 页面布局

示例资源卡片在页面中的显示方式：
- **移动端**（< 640px）：单列布局，垂直排列
- **平板**（640-1024px）：2列网格布局
- **桌面**（> 1024px）：4列网格布局

每张图片都会有：
- 悬停放大效果
- 标题覆盖层（底部渐变）
- 平滑的过渡动画

---

**注意**：如果暂时没有图片，页面会显示渐变色占位符（橙色系），不影响页面使用。
