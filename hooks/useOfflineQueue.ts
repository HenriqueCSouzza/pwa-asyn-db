"use client";

import { useEffect } from "react";
import { processQueue } from "@/lib/sync";
import { useOnlineOfflineStatus } from "./useOnlineOfflineStatus";

export function useOfflineQueue() {
  const { isOnline } = useOnlineOfflineStatus();

  useEffect(() => {
    if (isOnline) {
      processQueue();
    }
  }, [isOnline]);
}
