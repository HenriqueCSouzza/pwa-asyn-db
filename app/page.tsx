"use client";

import { useEffect } from "react";
import Form from "@/components/Form";
import SyncStatus from "@/components/SyncStatus";
import { useOfflineQueue } from "@/hooks/useOfflineQueue";

export default function Page() {
  useOfflineQueue();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
    }
  }, []);

  return (
    <main>
      <SyncStatus />
      <Form />
    </main>
  );
}
