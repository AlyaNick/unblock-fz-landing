function escapeHtml(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * @param {{ name: string, phone: string, problem: string, consentMarketing: boolean }} data
 */
export function buildEmailHtml(data) {
  const esc = (s) => escapeHtml(String(s))
  const name = data.name ? esc(data.name) : '—'
  const phone = data.phone ? esc(data.phone) : '—'
  const problemHtml = data.problem ? esc(data.problem).replace(/\n/g, '<br>') : '—'

  const tags = data.consentMarketing
    ? '<tr><td style="padding:0 18px 24px;"><span style="display:inline-block;padding:5px 11px;background:#f3e8ff;color:#6b21a8;font-size:13px;font-weight:500;border-radius:6px;">Согласие на рекламные рассылки</span></td></tr>'
    : ''

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Новая заявка</title>
  <style>
    body{margin:0;padding:24px;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;box-sizing:border-box;}
    .mail-root{max-width:1200px;width:100%;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #f1f5f9;box-shadow:0 1px 3px rgba(0,0,0,0.04);overflow:hidden;}
    .mail-head{background:#0c1220;padding:12px 18px;border-bottom:1px solid rgba(255,255,255,0.08);}
    .mail-logo{width:36px;height:36px;background:linear-gradient(135deg,#1e293b 0%,#334155 100%);border-radius:8px;color:#fff;font-size:18px;line-height:36px;text-align:center;}
    .mail-brand{color:#fff;font-size:15px;font-weight:600;}
    .mail-tag{display:inline-block;padding:4px 10px;background:rgba(255,255,255,0.15);color:rgba(255,255,255,0.9);font-size:12px;font-weight:600;border-radius:4px;}
    .mail-contact{padding:20px 18px 24px;color:#0f172a;font-size:15px;line-height:1.5;}
    .mail-label{color:#64748b;font-size:13px;margin-right:12px;}
    .mail-name{color:#0f172a;font-size:15px;font-weight:600;}
    .mail-phone{color:#1e3a5f;font-size:15px;font-weight:600;}
    .mail-message-label{margin:0 0 8px;color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;}
    .mail-message-body{margin:0;color:#0f172a;font-size:15px;line-height:1.6;}
    .mail-footer{padding:16px 18px 24px;border-top:1px solid #f1f5f9;color:#94a3b8;font-size:12px;}
  </style>
</head>
<body>
  <table role="presentation" cellspacing="0" cellpadding="0" class="mail-root">
    <tr>
      <td class="mail-head">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td style="width:40px;vertical-align:middle;"><div class="mail-logo">&#9878;</div></td>
            <td style="vertical-align:middle;padding:0 12px;"><span class="mail-brand">115-ФЗ Защита</span></td>
            <td style="vertical-align:middle;text-align:right;"><span class="mail-tag">Новая заявка</span></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td class="mail-contact">
        <p style="margin:0 0 10px;"><span class="mail-label">Имя</span><span class="mail-name">${name}</span></p>
        <p style="margin:0;"><span class="mail-label">Телефон</span><span class="mail-phone">${phone}</span></p>
      </td>
    </tr>
    ${tags}
    <tr>
      <td style="padding:0 18px 28px;">
        <p class="mail-message-label">Описание ситуации</p>
        <p class="mail-message-body">${problemHtml}</p>
      </td>
    </tr>
    <tr>
      <td class="mail-footer">Письмо отправлено автоматически с формы обратной связи сайта.</td>
    </tr>
  </table>
</body>
</html>`
}
