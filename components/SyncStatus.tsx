"use client";

import { Chip, Stack, Typography } from "@mui/material";
import { useOnlineOfflineStatus } from "@/hooks/useOnlineOfflineStatus";

export default function SyncStatus() {
  const { isOnline } = useOnlineOfflineStatus();

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ p: 2, bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}
    >
      <Typography variant="body1">Status:</Typography>
      <Chip
        label={isOnline ? "🟢 Online" : "🔴 Offline"}
        color={isOnline ? "success" : "error"}
        variant="outlined"
      />
    </Stack>
  );
}
