import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'

import dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'

import { buildEmailHtml } from './emailTemplate.js'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.resolve(__dirname, '..', 'dist')

const port = Number(process.env.PORT || 3001)
const operatorEmail = (process.env.OPERATOR_EMAIL || '').trim()
const yandexAppPassword = (process.env.YANDEX_APP_PASSWORD || '').trim()

const app = express()
app.use(express.json())

app.post(['/api/send', '/api/send.php'], async (req, res) => {
  if (!operatorEmail || !yandexAppPassword) {
    return res.status(500).json({
      error: 'Не заданы OPERATOR_EMAIL и YANDEX_APP_PASSWORD в .env',
    })
  }

  const {
    name = '',
    phone = '',
    email = '',
    problem = '',
    consentMarketing = false,
  } = req.body ?? {}

  const emailTrim = typeof email === 'string' ? email.trim() : ''
  const phoneTrim = typeof phone === 'string' ? phone.trim() : ''

  if (!phoneTrim && !emailTrim) {
    return res.status(400).json({ error: 'Укажите телефон или email' })
  }
  if (emailTrim && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
    return res.status(400).json({ error: 'Введите корректный email' })
  }

  const data = {
    name: name || '—',
    phone: phoneTrim || '',
    email: emailTrim || '',
    problem: problem || '—',
    consentMarketing,
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: { user: operatorEmail, pass: yandexAppPassword },
  })

  const replyTo =
    data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
      ? data.email
      : operatorEmail

  try {
    await transporter.sendMail({
      from: `"115-ФЗ Защита" <${operatorEmail}>`,
      to: operatorEmail,
      replyTo,
      subject: `Новая заявка (Unblock FZ): ${data.name} ${data.phone || data.email || ''}`,
      html: buildEmailHtml(data),
    })
    return res.json({ ok: true })
  } catch (error) {
    console.error(error)
    const msg = error?.message || String(error)
    const isAuthError = /535|authentication failed|Invalid login|Invalid user or password/i.test(msg)
    return res.status(500).json({
      error: isAuthError
        ? 'Ошибка входа в Яндекс.Почту. Используйте пароль приложения (Паспорт → Безопасность → Пароли приложений), а не обычный пароль. Новый пароль действует через 2–3 часа.'
        : 'Не удалось отправить письмо. Проверьте настройки Яндекс.Почты. Новый пароль приложения Яндекса действует через 2–3 часа.',
      detail: msg,
    })
  }
})

// Продакшен: раздача статики и SPA (если есть папка dist)
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).end()
    res.sendFile(path.join(distPath, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Mail server started on port ${port}`)
})
