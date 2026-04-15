import Dexie, { Table } from "dexie";

export interface QueueItem {
  id: string;
  type: string;
  payload: unknown;
  status: "pending" | "processing" | "done" | "error";
  retries: number;
  createdAt: number;
}

class AppDB extends Dexie {
  queue!: Table<QueueItem>;

  constructor() {
    super("app-db");

    this.version(1).stores({
      queue: "id, status, createdAt",
    });
  }
}

export const db = new AppDB();
