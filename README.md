ui: [shadcn](https://ui.shadcn.com/)
安装：bunx --bun shadcn@latest add sidebar --yes
谷歌登录：[clerk](https://dashboard.clerk.com/) [login](https://clerk.com/docs/nextjs/guides/development/custom-sign-in-or-up-page)，配置 .env.local
数据库：[neon](https://www.neon.tech/)，[drizzle](https://orm.drizzle.team/docs/get-started/neon-new)
登录同步本地数据库：[webhook](https://dashboard.clerk.com/apps/app_34EsIk2k6SmdhaTJlupL55hymao/instances/ins_34EsInGchE8jRN2rwPsff5bLoqQ/webhooks) `src/app/api/users/webhook`
缓存：[upstash](https://upstash.com/) [doc](https://upstash.com/docs/redis/sdks/ratelimit-ts/overview)
