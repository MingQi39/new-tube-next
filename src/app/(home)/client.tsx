"use client";

import { trpc } from "@/trpc/client";

export default function PageClient() {
  const [data] = trpc.hello.useSuspenseQuery({ text: "Wyb" });

  return <div>Client Component says: {data?.greeting}</div>;
}
