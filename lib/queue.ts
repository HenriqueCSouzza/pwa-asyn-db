import { db } from "./db";

export async function enqueue(type: string, payload: unknown) {
  await db.queue.add({
    id: crypto.randomUUID(),
    type,
    payload,
    status: "pending",
    retries: 0,
    createdAt: Date.now(),
  });
}
