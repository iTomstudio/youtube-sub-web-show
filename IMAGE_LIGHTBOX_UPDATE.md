# 图片放大功能更新

## 新增功能 ✨

为定制服务页面添加了全局图片放大查看功能，包括示例资源截图和联系方式二维码，大幅提升用户体验。

---

## 主要改进

### 1. 更大的图片显示 📐

**之前**：4列网格布局，图片较小
**现在**：2列网格布局，图片更大更清晰

- **移动端**：单列布局
- **平板/桌面**：2列布局
- 最大宽度限制为 `6xl`，居中显示
- 增大卡片间距：从 `gap-6` 改为 `gap-8`

### 2. 点击放大功能 🔍

**所有图片现在都可以点击放大查看**

#### 示例资源截图
- 悬停时显示放大镜图标提示
- 标题下方显示"点击查看大图"提示文字
- 平滑的缩放动画

#### 联系方式二维码（新增）
- 4个二维码（微信、QQ、公众号、QQ群）都支持点击放大
- 悬停时边框高亮（从蓝色变为更亮的蓝色）
- 显示放大镜图标提示
- 二维码下方显示"点击二维码查看大图"提示

**放大视图**：
- 全屏黑色半透明背景（95% 不透明度）
- 图片居中显示，最大高度 90vh
- 保持图片原始宽高比
- 背景模糊效果（backdrop-blur）

### 3. 多种关闭方式

用户可以通过以下方式关闭放大视图：
1. **点击图片外的区域**
2. **点击右上角的关闭按钮（×）**
3. **按键盘 ESC 键**

### 4. 视觉提示增强

**悬停效果**：
- 图片轻微放大（scale-[1.02]）
- 阴影增强（从 shadow-lg 到 shadow-2xl）
- 半透明黑色遮罩（bg-black/30）
- 白色圆形放大镜图标淡入

**放大视图**：
- 图片上方显示标题
- 图片下方显示操作提示
- 平滑的淡入/淡出动画
- 缩放过渡效果

---

## 技术实现

### 新增的状态管理

```typescript
// 当前选中的图片
const selectedImage = ref<string | null>(null)
const selectedImageTitle = ref<string>('')

// 打开放大视图
const openImageLightbox = (imageUrl: string, title: string) => {
  selectedImage.value = imageUrl
  selectedImageTitle.value = title
  document.body.style.overflow = 'hidden' // 防止背景滚动
}

// 关闭放大视图
const closeLightbox = () => {
  selectedImage.value = null
  selectedImageTitle.value = ''
  document.body.style.overflow = '' // 恢复滚动
}
```

### 键盘事件监听

```typescript
// ESC 键关闭
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && selectedImage.value) {
    closeLightbox()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = '' // 确保清理
})
```

### Lightbox 模态框

使用 Vue 的 `Teleport` 组件将模态框渲染到 body：

```vue
<Teleport to="body">
  <Transition name="lightbox">
    <div v-if="selectedImage" class="fixed inset-0 z-50...">
      <!-- 关闭按钮 -->
      <!-- 图片容器 -->
      <!-- 标题和提示 -->
    </div>
  </Transition>
</Teleport>
```

### CSS 过渡动画

```css
/* 淡入淡出 */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

/* 图片缩放 */
.lightbox-enter-active img,
.lightbox-leave-active img {
  transition: transform 0.3s ease;
}

.lightbox-enter-from img,
.lightbox-leave-to img {
  transform: scale(0.9);
}
```

---

## 用户体验提升

### 视觉清晰度
- ✅ 更大的图片尺寸，内容更清晰可读
- ✅ 2列布局减少视觉干扰
- ✅ 增大的间距让页面呼吸感更好

### 交互友好性
- ✅ 明确的视觉提示（放大镜图标）
- ✅ 多种关闭方式，符合用户习惯
- ✅ 平滑的动画过渡
- ✅ 防止背景滚动（打开放大视图时）

### 响应式设计
- ✅ 移动端单列显示
- ✅ 平板/桌面2列显示
- ✅ 放大视图在所有设备上都能良好显示

---

## 浏览器兼容性

- ✅ 现代浏览器（Chrome, Firefox, Safari, Edge）
- ✅ 移动端浏览器（iOS Safari, Chrome Mobile）
- ✅ 支持深色模式

---

## 如何使用

### 查看示例资源截图

1. 访问定制服务页面：http://localhost:5174/
2. 向下滚动到"我们能为您找到的资源"区域
3. 将鼠标悬停在任何截图上，会显示放大镜图标
4. 点击图片查看大图

### 查看联系方式二维码

1. 向下滚动到页面底部的"准备好开始了吗？"联系区域
2. 将鼠标悬停在任何二维码上，边框会高亮并显示放大镜图标
3. 点击二维码查看大图，方便扫码

### 关闭放大视图

- 点击图片外的黑色区域
- 点击右上角的 × 按钮
- 按键盘 ESC 键

---

## 文件变更

### 修改的文件

**src/pages/CustomServicesView.vue**
- 添加 `selectedImage` 和 `selectedImageTitle` 状态
- 添加 `openImageLightbox` 和 `closeLightbox` 方法
- 添加键盘事件处理 `handleKeydown`
- 添加 `onMounted` 和 `onUnmounted` 生命周期钩子
- 更新示例资源网格布局（4列 → 2列）
- 增大图片和图标尺寸
- 添加悬停放大镜图标提示（示例资源和二维码）
- 为二维码添加点击放大功能
- 二维码容器添加悬停边框高亮效果
- 添加 Lightbox 模态框组件
- 添加 CSS 过渡动画样式

---

## 后续优化建议

### 可选增强功能

1. **图片预加载**
   - 预加载所有示例图片，加快打开速度

2. **左右切换**
   - 在放大视图中添加上一张/下一张按钮
   - 支持键盘方向键切换

3. **缩放控制**
   - 添加缩放滑块或按钮
   - 支持鼠标滚轮缩放

4. **图片下载**
   - 添加下载按钮，允许用户保存图片

5. **分享功能**
   - 添加分享到社交媒体的按钮

---

## 性能说明

- **轻量级实现**：无需额外的图片库依赖
- **按需渲染**：Lightbox 仅在需要时渲染
- **GPU 加速**：使用 CSS transform 实现动画
- **事件清理**：组件卸载时自动清理事件监听器

---

**现在所有图片（示例资源 + 二维码）都支持点击放大，用户体验大幅提升！** 🎉

### 完整的图片交互体验

✅ **示例资源区域**：4张平台截图，2列大图展示，点击放大查看
✅ **联系方式区域**：4个二维码，悬停高亮边框，点击放大扫码

只需添加相应的图片文件即可完整体验：
- 示例截图：TVer, Hulu, U-NEXT, TBS → `/public/examples/`
- 二维码：微信公众号、QQ交流群 → `/public/qr-codes/`
