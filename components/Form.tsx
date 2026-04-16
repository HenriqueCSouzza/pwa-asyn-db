"use client";

import { useState } from "react";
import { enqueue } from "@/lib/queue";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function Form() {
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await enqueue("CREATE_FORM", { name });

    alert("Salvo offline!");
    setName("");
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 1 }}
    >
      <Stack spacing={3}>
        <Typography variant="h6">Formulário offline</Typography>
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" size="large">
          Salvar
        </Button>
      </Stack>
    </Box>
  );
}
