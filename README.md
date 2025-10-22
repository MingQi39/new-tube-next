# New Tube Next - 现代化视频平台

一个基于 Next.js 15 构建的现代化视频平台，集成了完整的用户认证、数据库管理、API 路由和现代化 UI 组件。

## 🚀 技术栈

### 核心框架

- **Next.js 15** - React 全栈框架
- **React 19** - 前端 UI 库
- **TypeScript** - 类型安全的 JavaScript

### 身份认证

- **Clerk** - 现代化用户认证服务
- **Google OAuth** - 第三方登录支持

### 数据库 & ORM

- **Neon** - 无服务器 PostgreSQL 数据库
- **Drizzle ORM** - 类型安全的数据库 ORM

### API & 状态管理

- **tRPC** - 端到端类型安全的 API
- **TanStack Query** - 服务端状态管理

### UI & 样式

- **shadcn/ui** - 现代化 UI 组件库
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Radix UI** - 无样式、可访问的 UI 原语

### 缓存 & 限流

- **Upstash Redis** - 无服务器 Redis 缓存
- **Upstash Rate Limiting** - API 限流保护

### 开发工具

- **Bun** - 快速的 JavaScript 运行时和包管理器
- **ESLint** - 代码质量检查
- **ngrok** - 本地开发隧道

## 📁 项目结构

```
new-tube-next/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── (auth)/            # 认证相关页面组
│   │   │   ├── sign-in/       # 登录页面
│   │   │   └── sign-up/       # 注册页面
│   │   ├── (home)/            # 主页相关页面组
│   │   │   ├── protected/     # 受保护页面
│   │   │   ├── client.tsx     # 客户端组件
│   │   │   ├── layout.tsx     # 布局组件
│   │   │   └── page.tsx       # 主页
│   │   ├── api/               # API 路由
│   │   │   ├── trpc/          # tRPC API 端点
│   │   │   └── users/         # 用户相关 API
│   │   │       └── webhook/   # Clerk webhook 处理
│   │   ├── globals.css        # 全局样式
│   │   └── layout.tsx         # 根布局
│   ├── components/            # 可复用 UI 组件
│   │   └── ui/               # shadcn/ui 组件
│   ├── db/                   # 数据库相关
│   │   ├── index.ts          # 数据库连接
│   │   └── schema.ts         # 数据库模式定义
│   ├── hooks/                # 自定义 React Hooks
│   ├── lib/                  # 工具库
│   │   ├── ratelimit.ts      # 限流配置
│   │   ├── redis.ts          # Redis 连接
│   │   └── utils.ts          # 通用工具函数
│   ├── middleware.ts         # Next.js 中间件
│   ├── modules/              # 功能模块
│   │   ├── auth/             # 认证模块
│   │   └── home/             # 主页模块
│   └── trpc/                 # tRPC 配置
│       ├── client.tsx        # 客户端配置
│       ├── init.ts           # 初始化配置
│       ├── query-client.ts   # React Query 配置
│       ├── routers/          # API 路由定义
│       └── server.tsx        # 服务端配置
├── public/                   # 静态资源
├── drizzle.config.ts         # Drizzle 配置
├── next.config.ts           # Next.js 配置
├── tailwind.config.ts       # Tailwind CSS 配置
├── components.json          # shadcn/ui 配置
└── package.json            # 项目依赖
```

## 🛠️ 环境配置

### 1. 克隆项目

```bash
git clone <repository-url>
cd new-tube-next
```

### 2. 安装依赖

```bash
# 使用 Bun (推荐)
bun install

# 或使用 npm
npm install
```

### 3. 环境变量配置

创建 `.env.local` 文件并配置以下环境变量：

```env
# Clerk 身份认证配置
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
CLERK_WEBHOOK_SECRET=whsec_xxx

# 数据库配置 (Neon)
DATABASE_URL=postgresql://username:password@hostname/database

# Redis 配置 (Upstash)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxx

# Next.js 配置
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 4. 数据库初始化

```bash
# 生成数据库迁移文件
bunx drizzle-kit generate

# 执行数据库迁移
bunx drizzle-kit migrate
```

### 5. 启动开发服务器

```bash
# 启动主应用
bun run dev

# 启动开发环境 (包含 ngrok 隧道)
bun run dev:all
```

## 🔧 服务配置指南

### Clerk 身份认证配置

1. **创建 Clerk 应用**

   - 访问 [Clerk Dashboard](https://dashboard.clerk.com/)
   - 创建新应用
   - 获取 `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` 和 `CLERK_SECRET_KEY`

2. **配置 OAuth 提供商**

   - 在 Clerk Dashboard 中启用 Google OAuth
   - 配置重定向 URL: `http://localhost:3000/sso-callback`

3. **设置 Webhook**
   - 在 Clerk Dashboard 中创建 Webhook
   - 端点 URL: `https://your-domain.com/api/users/webhook`
   - 选择事件: `user.created`, `user.updated`, `user.deleted`
   - 获取 `CLERK_WEBHOOK_SECRET`

### Neon 数据库配置

1. **创建数据库**

   - 访问 [Neon Console](https://console.neon.tech/)
   - 创建新项目
   - 获取连接字符串

2. **数据库模式**
   - 当前用户表包含: `id`, `clerkId`, `name`, `imageUrl`, `createdAt`, `updatedAt`
   - 在 `src/db/schema.ts` 中定义新的表结构

### Upstash Redis 配置

1. **创建 Redis 实例**

   - 访问 [Upstash Console](https://console.upstash.com/)
   - 创建新数据库
   - 获取 `UPSTASH_REDIS_REST_URL` 和 `UPSTASH_REDIS_REST_TOKEN`

2. **限流配置**
   - 在 `src/lib/ratelimit.ts` 中配置限流规则
   - 当前配置: 10 次请求/10 秒

## 🎨 UI 组件管理

### 添加新的 shadcn/ui 组件

```bash
# 添加新组件
bunx --bun shadcn@latest add [component-name] --yes

# 例如添加按钮组件
bunx --bun shadcn@latest add button --yes
```

### 自定义主题

1. **修改颜色主题**

   - 编辑 `src/app/globals.css` 中的 CSS 变量
   - 或修改 `tailwind.config.ts` 中的颜色配置

2. **添加新组件样式**
   - 在 `src/components/ui/` 目录下创建新组件
   - 使用 Tailwind CSS 类名进行样式设计

## 🔌 API 开发

### 添加新的 tRPC 路由

1. **创建路由文件**

```typescript
// src/trpc/routers/example.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../init";

export const exampleRouter = createTRPCRouter({
  getData: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    // 实现业务逻辑
    return { data: "example" };
  }),
});
```

2. **注册路由**

```typescript
// src/trpc/routers/_app.ts
import { exampleRouter } from "./example";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  // ... 其他路由
});
```

### 数据库操作

```typescript
// 查询数据
const users = await db.select().from(usersTable);

// 插入数据
await db.insert(usersTable).values({
  clerkId: "user_123",
  name: "John Doe",
  imageUrl: "https://example.com/avatar.jpg",
});

// 更新数据
await db.update(usersTable).set({ name: "Jane Doe" }).where(eq(usersTable.clerkId, "user_123"));
```

## 🚀 部署指南

### Vercel 部署 (推荐)

1. **连接 GitHub 仓库**

   - 在 Vercel Dashboard 中导入项目
   - 配置环境变量

2. **环境变量配置**

   - 复制 `.env.local` 中的所有变量到 Vercel
   - 更新 `NEXTAUTH_URL` 为生产域名

3. **数据库迁移**
   - 在部署前执行数据库迁移
   - 确保生产数据库连接正常

### 其他平台部署

1. **Docker 部署**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

2. **传统服务器部署**
   - 安装 Node.js 18+
   - 配置 PM2 进程管理
   - 设置 Nginx 反向代理

## 🧪 开发工作流

### 常用命令

```bash
# 开发
bun run dev              # 启动开发服务器
bun run dev:all          # 启动开发服务器 + ngrok 隧道

# 构建
bun run build            # 构建生产版本
bun run start            # 启动生产服务器

# 代码质量
bun run lint             # 运行 ESLint 检查

# 数据库
bunx drizzle-kit generate    # 生成迁移文件
bunx drizzle-kit migrate     # 执行迁移
bunx drizzle-kit studio      # 打开数据库管理界面
```

### 开发最佳实践

1. **代码组织**

   - 使用模块化结构 (`src/modules/`)
   - 组件按功能分组
   - 保持文件结构清晰

2. **类型安全**

   - 充分利用 TypeScript 类型检查
   - 使用 tRPC 确保端到端类型安全
   - 为 API 输入输出定义 Zod 模式

3. **性能优化**

   - 使用 React Suspense 进行代码分割
   - 实现适当的缓存策略
   - 优化图片和静态资源

4. **错误处理**
   - 使用 ErrorBoundary 捕获 React 错误
   - 实现全局错误处理
   - 添加适当的日志记录

## 🔍 故障排除

### 常见问题

1. **Clerk 认证失败**

   - 检查环境变量是否正确设置
   - 确认域名配置匹配
   - 验证 Webhook 端点可访问

2. **数据库连接问题**

   - 检查 `DATABASE_URL` 格式
   - 确认数据库服务正常运行
   - 验证网络连接

3. **Redis 连接失败**

   - 检查 Upstash 凭据
   - 确认 Redis 实例状态
   - 验证网络访问权限

4. **构建错误**
   - 清除 `.next` 缓存目录
   - 检查 TypeScript 类型错误
   - 验证所有依赖已正确安装

### 调试技巧

1. **启用详细日志**

```typescript
// 在开发环境中启用详细日志
if (process.env.NODE_ENV === "development") {
  console.log("Debug info:", data);
}
```

2. **使用 React DevTools**

   - 安装 React DevTools 浏览器扩展
   - 使用 Profiler 分析性能

3. **数据库调试**

```bash
# 使用 Drizzle Studio 查看数据
bunx drizzle-kit studio
```

## 📚 学习资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [Clerk 身份认证指南](https://clerk.com/docs)
- [Drizzle ORM 文档](https://orm.drizzle.team/)
- [tRPC 使用指南](https://trpc.io/docs)
- [shadcn/ui 组件库](https://ui.shadcn.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 获取帮助

如果您遇到问题或需要帮助：

1. 查看本文档的故障排除部分
2. 搜索现有的 [Issues](https://github.com/your-repo/issues)
3. 创建新的 Issue 描述您的问题
4. 联系维护者

---

**Happy Coding! 🎉**
