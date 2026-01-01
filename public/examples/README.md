# 视频示例封面图片说明

## 需要的文件

请将视频封面图片放在此目录下。根据 [FreeExamplesView.vue](../../src/pages/FreeExamplesView.vue) 中的配置，当前需要以下图片：

1. **day240.jpg** - Day 240 婚礼讲话 vlog
2. **day239.jpg** - Day 239 日本圣诞节
3. **day238.jpg** - Day 238 浅草散步
4. **day237.jpg** - Day 237 草津温泉
5. **day236.jpg** - Day 236 博物馆购物
6. **day235.jpg** - Day 235 冬季购物分享

## 图片规格

- **尺寸**: 建议 1280x720 或 640x360（16:9 比例）
- **格式**: JPG 或 WebP
- **大小**: 建议每张不超过 500KB，以确保快速加载

## 如何添加新视频示例

1. 将新的封面图片添加到此目录
2. 编辑 [src/pages/FreeExamplesView.vue](../../src/pages/FreeExamplesView.vue)
3. 在 `examples` 数组中添加新的视频信息：

```typescript
{
  id: 7,  // 递增的ID
  title: '【Day XXX】视频标题',
  thumbnail: '/examples/dayXXX.jpg',  // 新图片路径
  description: '视频描述',
  tags: ['N5', 'N4', '标签1', '标签2'],
  baiduLink: 'https://pan.baidu.com/s/xxx',  // 百度网盘链接
  quarkLink: 'https://pan.quark.cn/s/xxx'   // 夸克网盘链接
}
```

## 注意事项

- 文件名应该简洁明了，使用小写字母和数字
- 确保图片质量清晰，因为它们会显示在网页上
- 如果图片加载失败，页面会自动显示占位符
- 测试时请在浏览器中检查图片是否正常显示
