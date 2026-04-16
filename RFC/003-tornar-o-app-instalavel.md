# 📄 Tornar o app instalável

## 🎯 Objetivo

Implementar os ajustes necessários para que o PWA seja reconhecido como instalável pelo navegador, além das correções já feitas no registro do service worker e no estado inicial de conectividade.

---

## ✅ O que já foi aplicado

- `app/page.tsx`
  - registra explicitamente o service worker com `navigator.serviceWorker.register('/sw.js')`
- `components/SyncStatus.tsx`
  - inicializa `online` usando `navigator.onLine`
  - atualiza o status com eventos `online` / `offline`
- `public/manifest.json`
  - existe e define `name`, `short_name`, `start_url`, `display`, `background_color` e `theme_color`

---

## 🔧 Implementação requerida para instalação

### 1. Referenciar o manifesto no HTML

- Adicionar em `app/layout.tsx`:

```tsx
<link rel="manifest" href="/manifest.json" />
```

- Isso permite que o navegador carregue o manifesto ao abrir a página.

### 2. Incluir metatags PWA relevantes

- Adicionar em `app/layout.tsx`:

```tsx
<meta name="theme-color" content="#000000" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
```

- Essas tags ajudam na integração com dispositivos móveis e na experiência de instalação.

### 3. Definir ícones no manifesto

- Atualizar `public/manifest.json` com um array `icons`
- Exemplo:

```json
"icons": [
  {
    "src": "/icons/icon-192x192.png",
    "sizes": "192x192",
    "type": "image/png"
  },
  {
    "src": "/icons/icon-512x512.png",
    "sizes": "512x512",
    "type": "image/png"
  }
]
```

- Os ícones são necessários para o prompt de instalação e para a tela inicial do app.

### 4. Garantir o Service Worker válido e acessível

- Confirmar que `/sw.js` é servido corretamente em produção
- A URL de registro deve corresponder ao caminho acessível do service worker

### 5. Ajustar metadados do app

- Atualizar `app/layout.tsx` metadata para refletir o PWA:
  - `title`
  - `description`

- Exemplos:

```ts
export const metadata: Metadata = {
  title: "Offline App",
  description: "PWA offline-first com fila de sincronização",
};
```

---

## 📌 Resultado esperado

Após essas implementações, o app deverá ter:

- manifesto referenciado no HTML
- ícones declarados no `manifest.json`
- metatags PWA mínimas presentes
- service worker registrado e acessível
- comportamento reconhecido como instalável pelo navegador

---

## 🧩 Observação

Com isso, o aplicativo estará preparado para ser instalado pelo usuário em dispositivos compatíveis, além de manter a lógica offline-first já implementada.
