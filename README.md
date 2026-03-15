# Unblock FZ Landing

## Разработка и отправка формы

Как в bookkeep-landing: один `npm run dev` запускает и фронт (Vite), и API-сервер (Node + Express + Nodemailer).

1. Скопируйте `.env.example` в `.env` и укажите `OPERATOR_EMAIL` и `YANDEX_APP_PASSWORD` (пароль приложения Яндекса).
2. Запустите: **`npm run dev`** — поднимутся и сайт, и сервер отправки писем.

Запросы к `/api/send.php` проксируются на Node-сервер (порт 3001). Письма уходят через SMTP Яндекса.

**Продакшен:** `npm run prod` — сборка и запуск сервера, раздающего статику и обрабатывающего `/api/send.php`. Либо разверните только статику (dist) и используйте PHP `public/api` на хостинге.

---

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
