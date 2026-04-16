# 📱 PWA Async DB

Uma aplicação **Progressive Web App (PWA)** offline-first construída com **Next.js 16** e **IndexedDB**, com suporte a fila de sincronização automática e comportamento resiliente em conexões instáveis.

## 🎯 Sobre o projeto

Esta é uma PWA completa que permite os usuários:

- ✅ **Trabalhar offline**: todos os dados são salvos localmente no IndexedDB
- ✅ **Sincronizar automaticamente**: quando a conexão retorna, os dados são enviados ao servidor
- ✅ **Instalar como app**: comportamento de aplicativo nativo em dispositivos compatíveis
- ✅ **Sem perda de dados**: fila persistida com retry automático (exponential backoff até 5 tentativas)
- ✅ **Idempotência garantida**: backend não duplica dados mesmo em reenvios

---

## 🛠️ Tecnologias

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **MUI 7** (Material UI)
- **Dexie 4** (IndexedDB ORM)
- **Service Worker** (Workbox)
- **CSS moderno**

---

## 📦 Funcionalidades implementadas

### 1. Persistência local

- Banco de dados **IndexedDB** via Dexie
- Tabela `queue` com indexação por `id`, `status`, `createdAt`
- Interface `QueueItem`:
  - `id` (UUID)
  - `type` (tipo de ação)
  - `payload` (dados da ação)
  - `status` (pending | processing | done | error)
  - `retries` (contador de tentativas)
  - `createdAt` (timestamp de criação)

### 2. Fila de sincronização

- Função `enqueue(type, payload)` que salva itens offline
- Motor `processQueue()` que:
  - Busca itens `pending`
  - Marca como `processing`
  - Envia POST para `/api/forms`
  - Se sucesso: marca `done`
  - Se falha: aplica exponential backoff e retorna a `pending`
  - Após 5 retries: marca como `error`

### 3. Integração com UI

- Hook `useOfflineQueue` que:
  - Executa `processQueue` ao montar (se online)
  - Escuta evento `online` para sincronizar novamente
- Componente `SyncStatus` que:
  - Inicializa com `navigator.onLine`
  - Exibe status de conectividade: `🟢 Online` ou `🔴 Offline`
  - Usa componentes MUI para exibir o status de forma visual
- Formulário simples que salva dados offline
  - Migrado para `TextField`, `Button` e layout MUI
- Tema global MUI aplicado via `ThemeProvider` e `CssBaseline`

### 4. Service Worker e PWA

- Service Worker registrado automaticamente no cliente
- Manifesto PWA completo com:
  - Ícones em 192x192 e 512x512
  - Display mode `standalone`
  - Cores de tema e fundo
- Metatags para suporte em iOS e Android
- Caching de assets e routes com Workbox

### 5. Backend idempotente

- Rota POST `/api/forms` que:
  - Recebe `{ id, payload }`
  - Valida idempotência por `id`
  - Armazena em `Map` (pode ser integrado com DB real)

---

## 🚀 Como rodar

### Pré-requisitos

- Node.js 18+ ou superior
- npm / yarn / pnpm

### Instalação

```bash
# Clonar repository
git clone <repo-url>
cd pwa-asyn-db

# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Rodar servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

**Comportamento esperado:**
- Formulário visível com campo "Nome"
- Texto "Salvo offline!" ao submeter
- Status de conexão (🟢 Online)
- Service Worker registrado (ver console do navegador)

### Build para produção

```bash
# Build otimizado
npm run build

# Roda em produção
npm run start
```

---

## 🌐 Como hospedar

### Opção 1: Vercel (recomendado para Next.js)

1. **Conectar repository** em [vercel.com](https://vercel.com)
2. **Configurar variáveis de ambiente** (se necessário)
3. **Deploy automático** a cada push

Benefícios:
- Deploy automático
- HTTPS habilitado (obrigatório para Service Workers)
- CDN global
- Logs em tempo real

```bash
# Alternativa: via CLI
npm i -g vercel
vercel
```

### Opção 2: Azure App Service

```bash
# Publicar no Azure
az webapp up --resource-group <group> --name <app-name> --runtime "NODE|18-lts"
```

### Opção 3: AWS (EC2 + Node)

```bash
# Build e upload para servidor Node.js
npm run build
zip -r app.zip build node_modules package*.json

# No servidor:
unzip app.zip
npm ci --only=production
npm run start
```

### Opção 4: Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Deploy em qualquer plataforma que suporte Docker (Heroku, DigitalOcean, etc).

### ⚠️ Requisitos importantes

- **HTTPS obrigatório** para Service Workers
- **Certificado SSL válido** para ativar instação em produção
- **Manifesto acessível** em `/manifest.json`
- **Service Worker acessível** em `/sw.js`

---

## 📁 Estrutura do projeto

```
.
├── app/
│   ├── page.tsx                 # Página principal com SW registration e layout MUI
│   ├── layout.tsx               # Layout com metatags PWA
│   ├── providers.tsx            # Provider MUI global
│   ├── globals.css
│   └── api/
│       └── forms/
│           └── route.ts         # API idempotente de formulários
├── components/
│   ├── Form.tsx                 # Formulário offline-first com MUI
│   └── SyncStatus.tsx           # Indicador de conectividade com MUI
├── hooks/
│   └── useOfflineQueue.ts       # Hook que gerencia sincronização
├── lib/
│   ├── db.ts                    # Dexie & IndexedDB setup
│   ├── mui/
│   │   └── theme.ts             # Tema MUI global
│   ├── queue.ts                 # Função enqueue
│   └── sync.ts                  # Motor de sincronização (exponential backoff)
├── public/
│   ├── manifest.json            # PWA manifest com ícones
│   ├── sw.js                    # Service Worker (Workbox)
│   └── icons/                   # Ícones 192x192 e 512x512
├── RFC/                         # Documentação de implementação
│   ├── 001-criação-da-estrutura-inicial.md
│   ├── 002-registro-sw-e-syncstatus.md
│   └── 003-tornar-o-app-instalavel.md
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

---

## 🧪 Testando offline

1. Abra o app em [http://localhost:3000](http://localhost:3000)
2. Abra DevTools (F12)
3. Vá para aba **Network** → desmarque "Enable network requests"
4. Ou visite **Application → Service Workers** e clique offline
5. Preencha o formulário e envie
6. Verifique que o IndexedDB foi populado (DevTools → Application → IndexedDB → app-db → queue)
7. Reconecte a rede
8. Veja a sincronização automática acontecer

---

## 🔍 Debugging

### Ver fila de sincronização

Abra console no navegador e execute:

```javascript
// Listar todos os itens da fila
import { db } from '/lib/db.ts';
db.queue.toArray().then(console.log);

// Ver itens com erro
db.queue.where('status').equals('error').toArray().then(console.log);
```

### Testar sincronização manual

```javascript
import { processQueue } from '/lib/sync.ts';
processQueue();
```

### Ver logs do Service Worker

DevTools → Application → Service Workers

---

## 📋 Checklist PWA

- ✅ Service Worker registrado
- ✅ Manifesto com ícones
- ✅ HTTPS (em produção)
- ✅ Metatags de viewport
- ✅ Ícones 192x192 e 512x512
- ✅ Display standalone
- ✅ Offline-first funcional
- ✅ Fila de sincronização com retry

---

## 🚧 Próximos passos (não implementados)

- Background Sync API (para sync em background)
- Múltiplas filas (pagamentos, eventos)
- Criptografia local
- Controle de conflitos
- Dashboard de sincronização
- Persistência em Web Storage adicional

---

## 📞 Suporte

Para mais informações sobre PWA:
- [MDN Web Docs - PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev PWA](https://web.dev/progressive-web-apps/)
- [Dexie.js](https://dexie.org/)

---

## 📄 Licença

MIT
