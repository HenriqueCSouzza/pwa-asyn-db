/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "./db";

const MAX_RETRIES = 5;

export async function processQueue() {
  const items = await db.queue.where("status").equals("pending").toArray();
  console.log("Processando fila:", items);
  for (const item of items) {
    try {
      const payload = item.payload as { [key: string]: unknown };
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: item.id,
          payload,
        }),
      });

      if (!res.ok) throw new Error("API error");

      await db.queue.update(item.id, { status: "done" });
    } catch (err) {
      const retries = item.retries + 1;

      if (retries >= MAX_RETRIES) {
        await db.queue.update(item.id, {
          status: "error",
          retries,
        });
      } else {
        await delay(retries);

        await db.queue.update(item.id, {
          status: "pending",
          retries,
        });
      }
    }
  }
}

function delay(retries: number) {
  const time = Math.min(1000 * 2 ** retries, 30000);
  return new Promise((res) => setTimeout(res, time));
}
