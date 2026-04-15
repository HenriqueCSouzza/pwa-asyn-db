# 📄 Boilerplate PWA Offline-First com Next.js

## 🎯 Objetivo

Gerar uma aplicação **Next.js (App Router)** com suporte a:

- Funcionamento offline-first
- Persistência local com IndexedDB
- Fila de sincronização (queue)
- Retry automático com backoff
- Sincronização ao voltar online
- Estrutura pronta para evolução

---

## 🧱 Estrutura de diretórios

Criar a seguinte estrutura:

```
/app
  /page.tsx
  /layout.tsx

/lib
  db.ts
  queue.ts
  sync.ts

/hooks
  useOfflineQueue.ts

/components
  Form.tsx
  SyncStatus.tsx

/public
  sw.js
  manifest.json

/app/api/forms/route.ts
```

---

## 📦 Dependências

Instalar:

```
npm install dexie
```

---

## 🗄️ Banco local (IndexedDB)

Criar `/lib/db.ts`:

- Usar Dexie
- Criar banco `app-db`
- Criar tabela `queue`

### Interface:

```ts
export interface QueueItem {
  id: string;
  type: string;
  payload: any;
  status: "pending" | "processing" | "done" | "error";
  retries: number;
  createdAt: number;
}
```

### Requisitos:

- Indexar por `id`, `status`, `createdAt`

---

## 📥 Fila (enqueue)

Criar `/lib/queue.ts`

### Função:

```ts
enqueue(type: string, payload: any)
```

### Regras:

- Gerar `id` com `crypto.randomUUID()`
- Status inicial: `pending`
- retries = 0
- createdAt = Date.now()

---

## 🔄 Engine de sincronização

Criar `/lib/sync.ts`

### Função principal:

```ts
processQueue();
```

### Regras:

1. Buscar itens com status `pending`
2. Para cada item:
   - Marcar como `processing`
   - Enviar para `/api/forms`
   - Se sucesso:
     - marcar como `done`

   - Se erro:
     - incrementar retries
     - se retries >= 5 → status `error`
     - senão → voltar para `pending`

---

### Retry strategy:

Implementar exponential backoff:

```
delay = min(1000 * 2^retries, 30000)
```

---

## 🌐 Hook de sincronização

Criar `/hooks/useOfflineQueue.ts`

### Comportamento:

- Ao montar:
  - Se online → processar fila

- Escutar evento:
  - `window.addEventListener('online', processQueue)`

---

## 📝 Formulário offline-first

Criar `/components/Form.tsx`

### Requisitos:

- Campo simples (ex: nome)
- Ao submeter:
  - NÃO chamar API
  - Chamar `enqueue`
  - Limpar formulário
  - Exibir feedback ("Salvo offline")

---

## 📡 Indicador de status

Criar `/components/SyncStatus.tsx`

### Requisitos:

- Detectar:
  - online
  - offline

- Usar:
  - `navigator.onLine`
  - eventos `online` / `offline`

- Exibir:
  - 🟢 Online
  - 🔴 Offline

---

## 🧠 Página principal

Criar `/app/page.tsx`

### Requisitos:

- Usar hook `useOfflineQueue`
- Renderizar:
  - `<SyncStatus />`
  - `<Form />`

---

## ⚙️ Service Worker

Criar `/public/sw.js`

### Requisitos mínimos:

- Listener de install
- Listener de fetch (placeholder)

---

### Registro do SW

Adicionar no client:

```ts
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
```

---

## 📱 Manifest PWA

Criar `/public/manifest.json`

### Conteúdo:

- name
- short_name
- start_url = "/"
- display = "standalone"
- background_color
- theme_color

---

## 🔐 Backend (API Route)

Criar `/app/api/forms/route.ts`

### Método POST:

- Receber JSON
- Usar `id` como chave única
- Garantir idempotência:
  - Se já existir → retornar sucesso
  - Senão → salvar

### Armazenamento:

- Pode usar `Map` em memória (mock)

---

## ⚠️ Regras importantes

### 1. Offline-first obrigatório

- Nenhuma ação do formulário deve depender de API

### 2. Idempotência obrigatória

- Backend deve aceitar reenvio sem duplicação

### 3. Retry resiliente

- Nunca perder dados
- Tentar novamente automaticamente

### 4. Separação de responsabilidades

- queue → armazenamento
- sync → processamento
- UI → apenas interação

---

## 🚀 Critérios de aceite

A aplicação deve:

- Funcionar offline
- Salvar dados no IndexedDB
- Reenviar automaticamente ao voltar online
- Não duplicar dados no backend
- Exibir status de conectividade

---

## 🔮 Extensões futuras (não implementar agora)

- Background Sync real
- Múltiplas filas (payments, events)
- Criptografia local
- Controle de conflitos
- Dashboard de sync

---

## 🧩 Resultado esperado

Um boilerplate funcional com:

- Arquitetura offline-first
- Fila persistente
- Sync automático
- Base pronta para escalar

---
