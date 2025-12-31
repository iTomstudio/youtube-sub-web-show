# YouTube Sub Web Show

一个使用 Vue 3、TypeScript、Tailwind CSS 和 shadcn/ui 构建的综合 Web 应用程序，用于管理和分析 YouTube 订阅。

## 功能特性

- 响应式设计（移动端、平板端、桌面端）
- 实时分析仪表板
- 使用 shadcn-vue 的现代 UI 组件
- 深色模式支持
- TypeScript 类型安全
- Vite 快速开发

## 技术栈

- **前端框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **构建工具**: Vite
- **样式系统**: Tailwind CSS
- **UI 组件**: shadcn-vue
- **图标**: Lucide Vue Next
- **路由**: Vue Router 4

## 项目结构

```
src/
├── components/        # 可复用的 Vue 组件
│   ├── layout/       # 布局组件（Navigation、MainLayout）
│   ├── common/       # 通用组件（Header、Footer）
│   └── ui/           # shadcn/ui 组件
├── pages/            # 页面组件
├── router/           # Vue Router 配置
├── types/            # TypeScript 类型定义
├── utils/            # 工具函数
├── App.vue           # 根组件
├── main.ts           # 应用入口
└── style.css         # 全局样式
```

## 开始使用

### 前置要求

- Node.js 16.0 或更高版本
- npm 或 yarn 或 pnpm

### 安装

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 构建生产版本：
```bash
npm run build
```

4. 预览生产构建：
```bash
npm run preview
```

## 响应式断点

- **移动端**: < 640px
- **平板端**: 768px - 1023px
- **桌面端**: 1024px+

使用 Tailwind 的响应式前缀（`mobile:`、`tablet:`、`desktop:`）进行响应式设计。

## 组件架构

### 布局组件
- **Navigation.vue**: 带有响应式导航菜单的粘性头部
- **MainLayout.vue**: 带页脚的主布局包装器

### 页面
- **HomeView.vue**: 带有功能和 CTA 的落地页
- **AboutView.vue**: 带有使命和价值观的关于页面
- **DashboardView.vue**: 带有指标的分析仪表板
- **NotFoundView.vue**: 404 错误页面

## 自定义

### 添加新路由

编辑 `src/router/index.ts` 并添加您的路由：

```typescript
{
  path: '/your-route',
  name: 'your-route',
  component: YourComponent,
  meta: {
    title: '您的页面标题'
  }
}
```

### 添加新组件

在 `src/components/` 的适当子目录中创建 Vue 文件：
- 使用带有 TypeScript 的 `<script setup lang="ts">`
- 使用 Composition API
- 遵循现有的命名约定

### 样式

- 使用 Tailwind 工具类
- 自定义 CSS 放在组件的 `<style scoped>` 块中
- 全局样式在 `src/style.css` 中

## 开发指南

- 保持组件专注和单一职责
- 使用 TypeScript 以确保类型安全
- 遵循 Vue 3 Composition API 模式
- 对所有布局更改使用响应式设计前缀
- 从 `@/utils/cn` 导入工具用于类合并

## 许可证

MIT





## 实施步骤
### 1. 项目初始化

创建基础配置文件： package.json - 依赖和脚本

- 核心: vue@3, vite, typescript, vue-router@4
- 样式: tailwindcss, postcss, autoprefixer, clsx, tailwind-merge
- UI: shadcn-vue, lucide-vue-next, class-variance-authority
- 开发: @vitejs/plugin-vue, vue-

vite.config.ts - Vite 配置

- Vue 插件设置
- 路径别名: @/ → src/
- 开发服务器端口 5173

tsconfig.json & tsconfig.node.json - TypeScript 配置

- 启用严格模式
- Vue JSX 支持
- 导入路径映射

tailwind.config.ts - Tailwind 配置

- 自定义断点: mobile (640px), tablet (768px), desktop (1024px)
- 自定义颜色: primary (蓝色), secondary (紫色)
- Vue 文件和 shadcn-vue 组件的内容路径

postcss.config.js - PostCSS 配置

- Tailwind CSS 和 Autoprefixer 插件

.gitignore - Git 忽略规则

- node_modules, dist, .env 文件, IDE 配置

### 2. 文件夹结构

src/  
├── components/   
│   ├── layout/   
│   │   ├── Navigation.vue      # 顶部导航栏（响应式）    
│   │   └── MainLayout.vue      # 主布局包装器（含页脚）    
│   └── ui/                     # shadcn/ui 组件（按需安装）    
├── pages/    
│   ├── HomeView.vue           # 首页（带特性展示）   
│   ├── AboutView.vue          # 关于页面   
│   ├── DashboardView.vue      # 仪表板   
│   └── NotFoundView.vue       # 404 页面   
├── router/   
│   └── index.ts               # Vue Router 设置    
├── types/    
│   ├── components.ts          # 组件类型定义   
│   └── index.ts               # 全局类型   
├── utils/    
│   ├── cn.ts                  # Tailwind 类名合并工具    
│   └── helpers.ts             # 辅助函数   
├── App.vue                    # 根组件   
├── main.ts                    # 应用入口   
└── style.css                  # 全局 Tailwind 样式   


### 3. 核心应用文件

index.html - HTML 入口
- Vue 应用挂载点
- 响应式设计的 meta viewport

src/main.ts - 应用启动
- 创建 Vue 应用
- 注册 Vue Router
- 挂载到 DOM

src/App.vue - 根组件

- 包含 Navigation 组件
- 包含 MainLayout 包装器
- RouterView 用于页面内容

src/style.css - 全局样式

- Tailwind 指令 (@tailwind base/components/utilities)
- 排版的自定义基础样式
- 可复用的组件类

### 4. 路由配置

src/router/index.ts - 路由定义
- 路由: / (首页), /about, /dashboard, /* (404)
- 页面标题的 meta 标签
- 滚动行为配置

### 5. 布局组件

src/components/layout/Navigation.vue - 响应式导航
- 桌面端: 头部水平导航链接
- 移动端/平板端: 汉堡菜单（下拉菜单）
- 粘性定位
- 当前路由高亮
- 使用 Lucide 图标 (Menu, X)

src/components/layout/MainLayout.vue - 主布局包装器
- 带响应式内边距的内容区域
- 带链接和信息的页脚
- 页脚网格布局（移动端 1 列，平板端以上 3 列）

### 6. 页面组件

src/pages/HomeView.vue - 首页
- Hero 区域（带 CTA 按钮）
- 特性卡片网格（移动端 1 列，平板端 2 列，桌面端 3 列）
- CTA 区域
- 使用 Lucide 图标展示特性

src/pages/AboutView.vue - 关于页面

- 使命和愿景内容
- 带勾选标记的特性列表
- 响应式双列布局

src/pages/DashboardView.vue - 仪表板
- 指标卡片（订阅者、浏览量、增长）
- 图表占位符
- 最近活动区域
- 响应式网格布局

src/pages/NotFoundView.vue - 404 页面

- 居中错误消息
- 返回首页链接

### 7. 类型定义

src/types/components.ts - 组件接口
- NavLink, Feature, Metric, User, YouTubeChannel 类型

src/types/index.ts - 全局类型
ApiResponse, PaginatedResponse 类型
- 重新导出组件类型

### 8. 工具函数

src/utils/cn.ts - 类名合并器
- 结合 clsx 和 tailwind-merge 用于条件 Tailwind 类

src/utils/helpers.ts - 辅助工具
- formatNumber: 为数字添加逗号
- formatCompactNumber: 缩写显示 (1.2K, 3.5M)
- getRelativeTime: "2天前"格式化器

### 9. 文档

README.md - 项目文档
- 设置说明
- 技术栈概述
- 项目结构
- 开发指南
- 响应式断点参考