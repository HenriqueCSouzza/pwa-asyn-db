"use client";

import { useEffect } from "react";
import { processQueue } from "@/lib/sync";

export function useOfflineQueue() {
  useEffect(() => {
    // roda ao iniciar
    if (navigator.onLine) {
      processQueue();
    }

    // roda quando voltar online
    window.addEventListener("online", processQueue);

    return () => {
      window.removeEventListener("online", processQueue);
    };
  }, []);
}
