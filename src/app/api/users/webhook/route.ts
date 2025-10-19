import { Webhook } from "svix"; // 用于验证 webhook 签名
import { WebhookEvent } from "@clerk/nextjs/server"; // 用于解析 webhook 事件
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

/*
 * 该文件是 webhook 路由文件，用于处理 Clerk 身份验证服务的 webhook 事件。
 * 当用户在 Clerk 中注册、更新或删除账户时，Clerk 会向这个端点发送 webhook 通知，
 * 然后这个路由会相应地更新本地数据库中的用户信息。
 */
export async function POST(req: Request) {
  // webhook 签名密钥
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    return new Response("Signing secret is not set", { status: 500 });
  }

  const wh = new Webhook(SIGNING_SECRET);
  const headersList = req.headers;

  const payload = await req.json();
  const body = JSON.stringify(payload);
  let evt: WebhookEvent;

  try {
    // 将请求头转换为普通对象
    const headersObj = Object.fromEntries(headersList.entries());
    // 验证 webhook 签名
    evt = wh.verify(body, headersObj) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error: Webhook verification failed", { status: 400 });
  }

  const eventType = evt.type;

  // 处理用户相关事件

  // 处理用户创建事件
  if (eventType === "user.created") {
    const { data } = evt;
    await db.insert(users).values({
      clerkId: data.id,
      name: `${data.first_name} ${data.last_name}`,
      imageUrl: data.image_url,
    });
  }

  // 处理用户删除事件
  if (eventType === "user.deleted") {
    const { data } = evt;
    if (!data.id) {
      return new Response("User ID is required for user.deleted event", { status: 400 });
    }
    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  // 处理用户更新事件
  if (eventType === "user.updated") {
    const { data } = evt;
    await db
      .update(users)
      .set({
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      })
      .where(eq(users.clerkId, data.id));
  }

  return new Response("Webhook received", { status: 200 });
}
