"use client";

import { useEffect } from "react";
import { Box, Container } from "@mui/material";
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
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ display: "grid", gap: 3 }}>
        <SyncStatus />
        <Form />
      </Box>
    </Container>
  );
}
