"use client";

import Form from "@/components/Form";
import SyncStatus from "@/components/SyncStatus";
import { useOfflineQueue } from "@/hooks/useOfflineQueue";

export default function Page() {
  useOfflineQueue();

  return (
    <main>
      <SyncStatus />
      <Form />
    </main>
  );
}
