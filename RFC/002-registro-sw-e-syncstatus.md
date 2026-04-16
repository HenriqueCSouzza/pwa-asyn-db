# 📄 Registro de Service Worker e inicialização de SyncStatus

## 🎯 Objetivo

Implantar duas correções na aplicação PWA:

1. Adicionar registro explícito do service worker no cliente.
2. Ajustar `SyncStatus` para inicializar seu estado usando `navigator.onLine` em vez de `true` fixo.

---

## 🔧 Alterações propostas

### 1. Registro explícito do service worker

- Adicionar no cliente um código que registre `/sw.js` quando `serviceWorker` estiver disponível.
- Isso deve ser feito em um componente ou hook executado no browser, preferencialmente em `app/page.tsx` ou em um hook global de inicialização.
- Exemplo:

```ts
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js").catch((error) => {
    console.error("Service Worker registration failed:", error);
  });
}
```

### 2. Ajuste de `SyncStatus`

- Alterar o estado inicial de `SyncStatus` para usar `navigator.onLine`.
- Isso evita exibir `Online` quando a página inicializa no modo offline.
- Exemplo:

```ts
const [online, setOnline] = useState(
  typeof window !== "undefined" ? navigator.onLine : true,
);
```

---

## 📌 Resultado esperado

- O service worker é registrado explicitamente no cliente.
- `SyncStatus` começa com o valor correto de conectividade.
- O comportamento offline/online fica mais consistente e previsível.
