/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { enqueue } from "@/lib/queue";

export default function Form() {
  const [name, setName] = useState("");

  async function handleSubmit(e: any) {
    e?.preventDefault();

    await enqueue("CREATE_FORM", { name });

    alert("Salvo offline!");

    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome"
      />

      <button type="submit">Salvar</button>
    </form>
  );
}
