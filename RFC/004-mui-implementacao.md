# 📄 Implementação e configuração do MUI

## 🎯 Objetivo

Adicionar o Material UI na versão mais recente ao projeto, configurando tema global, migrando a interface para componentes MUI e removendo o Tailwind do projeto.

---

## ✅ O que será implementado

- Instalar e configurar **@mui/material** na versão mais recente compatível
- Adicionar dependências de estilo necessárias: **@emotion/react** e **@emotion/styled**
- Remover Tailwind do projeto:
  - remover dependências `tailwindcss` e `@tailwindcss/postcss`
  - limpar `postcss.config.mjs`
  - remover diretivas Tailwind de `app/globals.css`
  - remover classes Tailwind do layout e componentes
  - atualizar README para não mencionar Tailwind
- Criar um tema MUI global em `lib/mui/theme.ts`
- Integrar `ThemeProvider` e `CssBaseline` em `app/layout.tsx`
- Migrar `components/Form.tsx` para usar `TextField`, `Button` e layout MUI
- Migrar `components/SyncStatus.tsx` para usar componentes visuais MUI
- Ajustar `app/page.tsx` para exibir a interface com layout MUI

---

## 🧩 Resultado esperado

Ao final da implementação, o app terá:

- UI baseada em Material UI
- Tema global aplicado
- Componentes de formulário e status estilizados
- Configuração correta de dependências MUI
