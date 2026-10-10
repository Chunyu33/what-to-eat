# 今天吃什么 🍜

一个有趣的美食随机选择器，帮你解决"今天吃什么"的选择困难症！

## ✨ 功能特点

- 🎲 **随机选择**：从美食库中随机推荐美食
- ⏰ **时间段分类**：按早/中/下午茶/晚/宵夜严格分类，默认选中当前**决策窗口**（边界早于饭点）
- ✅ **正向出口**：抽到满意的直接点「就这个了」，不用一直靠"换一个"硬撑
- 🎉 **庆祝弹窗**：点「就这个了」弹出庆祝弹窗（大表情动画 + 五彩纸屑），分享入口就在弹窗里
- 🚫 **避开最近**：抽奖自动排除"最近决定"里吃过的，不会连着抽到同一道
- 🕘 **最近决定**：记录确认过的美食（localStorage），支持单条删除和清空；
  排除后剩余可抽不足 3 道时会自动清空记录并用轻提示告知
- 📋 **复制分享**：一键复制带站点链接的分享文案，纯前端实现、不依赖任何接口
- 🔍 **搜索功能**：支持按名称、分类、描述搜索美食
- 🌙 **暗色模式**：支持明暗主题切换，保护眼睛
- 🎊 **动画效果**：流畅的转场动画和选中庆祝效果
- 📱 **响应式设计**：完美适配桌面和移动设备
- 😠 **愤怒模式**：连续选择困难5次后的特殊彩蛋

## 🛠️ 技术栈

- **前端框架**：React 19 + TypeScript
- **构建工具**：Vite
- **样式框架**：Tailwind CSS
- **动画库**：Framer Motion
- **图标库**：Lucide React
- **工具库**：clsx, tailwind-merge
- **彩蛋效果**：canvas-confetti

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 📁 项目结构

```
src/
├── components/
│   ├── Header.tsx            # 顶部导航栏（含时段选择器）
│   ├── MainStage.tsx         # 主舞台展示区域
│   ├── ActionButton.tsx      # 操作按钮区（开始随机 / 换一个 / 就这个了）
│   ├── FoodListButton.tsx    # 美食库按钮
│   ├── FoodListPopup.tsx     # 美食库弹窗
│   ├── CelebrationModal.tsx  # 庆祝弹窗（动画 + 分享入口）
│   ├── Toast.tsx             # 轻提示组件（可复用）
│   ├── HistoryButton.tsx     # 最近决定按钮
│   ├── HistoryPopup.tsx      # 最近决定弹窗
│   ├── TimeSelector.tsx      # 时间段下拉选择器
│   ├── TimeDisplay.tsx       # 当前时段显示
│   ├── AngryMode.tsx         # 愤怒模式组件
│   └── Footer.tsx            # 页脚组件
├── utils/
│   ├── timeUtils.ts          # 时间段工具函数
│   ├── formatTime.ts         # 相对时间格式化
│   ├── praise.ts             # 庆祝弹窗的随机夸奖话术
│   └── share.ts              # 分享文案与剪贴板复制
├── hooks/
│   ├── useDarkMode.ts        # 暗色模式Hook
│   ├── useHistory.ts         # 最近决定记录Hook（localStorage）
│   └── useToast.ts           # 轻提示Hook（可复用）
├── data.ts                   # 美食数据（按时间段分类）
├── types.ts                  # TypeScript 类型定义
├── App.tsx                   # 主应用组件
├── index.css                 # 全局样式
└── main.tsx                  # 应用入口
```

## 🎨 主题配置

项目支持明暗两种主题模式：
- 亮色模式：橙色系配色，温暖活泼
- 暗色模式：深色系配色，护眼舒适

主题切换通过在 `document.documentElement` 上添加/移除 `dark` 类来实现。

## 🚀 部署到 Cloudflare Pages

### 方式一：Git 集成（推荐，push 即自动部署）

Cloudflare Dashboard → Workers & Pages → Create → Pages → 连接 Git 仓库，填：

| 配置项 | 值 |
|---|---|
| Framework preset | `Vite` |
| Build command | `npm install && npm run build` ⚠️ |
| Build output directory | `dist` |
| Root directory | 留空（仓库根目录） |

**关于原生模块与 lock 文件（踩过的坑）**

`package-lock.json` 原本在 Windows 上生成，`packages` 段里**只实体化了 Windows 版的原生二进制**
（`@rollup/rollup-win32-x64-msvc`），缺少 Linux 的 `@rollup/rollup-linux-x64-gnu`
（npm 的老问题，见 [npm/cli#4828](https://github.com/npm/cli/issues/4828)）。

Cloudflare 执行 `npm clean-install`（等价 `npm ci`），它**严格按 lock 安装、不补齐其他平台的包**，
于是构建阶段 rollup 加载不到原生模块直接崩：

```
Error: Cannot find module @rollup/rollup-linux-x64-gnu
```

Vercel 默认用 `npm install`（按当前平台补齐），所以同样的仓库一直没暴露这个问题。

**已修**：用 `npm install --package-lock-only --os=linux --cpu=x64` 重新生成，
再补齐各平台缺失的 `resolved` / `integrity`。现在 lock 里 **49 个平台专有包的条目全部完整**，
`npm ci` 在 Linux 上能正常装到 rollup / esbuild 的原生模块。

构建命令里仍保留一句 `npm install` 作为保险：万一本地的 `npm install` 又把 lock 精简回单平台，
这一句能兜住。多花几秒，换构建稳定。

> ⚠️ 以后改依赖后提交 lock 前，**确认 Linux 条目还在**：
> `grep -c 'rollup-linux-x64-gnu' package-lock.json` 应该 ≥ 1。

改完配置记得在 Deployments 页面点 **Retry deployment**。

**Node 版本必须在仓库里锁死**：

Vite 7 要求 Node `^20.19.0 || >=22.12.0`，而 Cloudflare Pages 的构建镜像有两代
（v2 默认 Node 18.17.1、v3 默认 22.16.0），项目被分到哪一代不完全可控 —— 分到 v2 就直接构建失败。

仓库根目录已经放了 `.nvmrc`（内容 `22`），Cloudflare 会自动读取。
它**同时作用于生产环境和预览环境**，比在 Dashboard 手动配 `NODE_VERSION`
（生产和预览要分别设，很容易漏一个）更省心。

如果仍想在 Dashboard 兜一层，展开「环境变量（高级）」加：

| 变量名 | 值 |
|---|---|
| `NODE_VERSION` | `22` |

之后 push 到生产分支自动发布，PR 会自动生成预览环境。

### 方式二：CLI 直接上传

```bash
npx wrangler login   # 首次需要授权
npm run deploy       # 等价于 npm run build && wrangler pages deploy dist
```

Pages 项目名写死在 `package.json` 的 `deploy` 脚本里（当前是 `what-to-eat`），改名就改这里。

### 路径与缓存

- 站点部署在域名根路径，所以 `vite.config.ts` 的 `base` 保持注释状态（默认 `/`）。
  若要挂到子路径（如 `evan666.cc/eat/`），取消注释并改成对应前缀，**同时**要改 `index.html` 里的资源引用方式。
- `public/_headers` 定义了缓存策略：`/assets/*` 带内容哈希 → 强缓存一年；
  HTML → `max-age=0`，保证发版后立刻生效。
- 分享文案里的域名常量在 `src/utils/share.ts` 的 `SITE_URL`，
  `index.html` 的 `og:url` 也要同步改。

### SPA 回退（当前不需要）

项目没有前端路由，直接静态托管即可。如果以后加了路由，
建一个 `public/_redirects`：

```
/*    /index.html   200
```

### 为什么从 Vercel 换到 Cloudflare Pages

Cloudflare Pages 的免费额度**不限制请求次数和带宽**（Vercel 免费版有 100GB/月 的流量上限），
纯静态站点跑在这里更省心。

## 🎮 使用说明

1. **选择时段**：顶部下拉选择器可切换不同时段（早/中/下午茶/晚/宵夜/全部）
2. **查看当前时段**：右上角显示当前时间段的emoji和名称
3. **开始随机**：点击"开始随机"按钮，系统会从当前选中时段的美食中随机推荐
4. **查看结果**：滚动停止后显示最终选择的美食
5. **定下来**：满意就点「就这个了」，弹出庆祝弹窗并写入"最近决定"
6. **分享**：在庆祝弹窗里点「复制分享」，剪贴板会拿到一段带站点链接的文案
7. **看看最近**：底部「最近」按钮可查看决定过的美食，支持单条删除和清空。
   抽奖会自动避开这些菜；若排除后剩余不足 3 道，会自动清空记录并弹出轻提示
8. **搜索美食**：在底部搜索框输入关键词筛选美食
9. **切换主题**：点击右上角的主题切换按钮
10. **重试次数**：右上角显示当前重试次数，最多5次

> 分享文案里的站点地址定义在 `src/utils/share.ts` 的 `SITE_URL` 常量，换域名只改这一处。

## 🕐 时间段分类

时间是「**决策窗口**」，不是用餐时间 —— 这个工具是让人**提前**决定吃什么的，
所以时段边界比饭点提前。比如早上窗口到 9:00 就结束，因为那之后你该想的是午饭。

| 时段 | 决策窗口 | 举例 |
|---|---|---|
| 早上 | 05:00 - 09:00 | 豆浆油条、包子、煎饼果子、广式早茶、小笼包等 |
| 中午 | 09:00 - 12:00 | 兰州拉面、红烧肉、水煮鱼、酸菜鱼、麻婆豆腐等 |
| 下午茶 | 12:00 - 15:00 | 奶茶、蛋糕甜点、冰淇淋、水果捞、咖啡等轻食甜品 |
| 晚上 | 15:00 - 20:00 | 火锅、北京烤鸭、新疆大盘鸡、潮汕牛肉火锅、韩式烤肉等 |
| 宵夜 | 20:00 - 05:00 | 小龙虾、羊肉串、螺蛳粉、炸鸡、韩式炸鸡等 |
| 全部 | 不限时段 | 包含所有时段的美食 |

时段边界定义在 `src/utils/timeUtils.ts` 的 `TIME_OF_DAY_INFO.hourRange`，
筛选逻辑在 `getCurrentTimeOfDay()`，两处要一起改。

## 📱 响应式设计

- 桌面端：8列网格布局
- 平板端：6列网格布局  
- 移动端：3列网格布局

## 🎭 特殊功能

- **愤怒模式**：连续5次重新选择后触发特殊彩蛋
- **庆祝动画**：选中美食后的五彩纸屑效果
- **平滑过渡**：所有交互都有流畅的动画效果

## 📄 许可证

MIT License
