<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'config.php не найден на сервере']);
    exit;
}
$config = require $configFile;
if (empty($config['email']) || empty($config['password'])) {
    http_response_code(500);
    echo json_encode(['error' => 'В .env укажите OPERATOR_EMAIL и YANDEX_APP_PASSWORD для SMTP.']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Неверный формат данных']);
    exit;
}

$name    = trim($input['name'] ?? '') ?: '—';
$phone   = trim($input['phone'] ?? '');
$emailRaw = trim($input['email'] ?? '');
$problem = trim($input['problem'] ?? '') ?: '—';
$consentMarketing = !empty($input['consentMarketing']);

if ($phone === '' && $emailRaw === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Укажите телефон или email']);
    exit;
}
if ($emailRaw !== '' && !filter_var($emailRaw, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Введите корректный email']);
    exit;
}

$phoneDisplay = $phone !== '' ? $phone : '—';
$emailDisplay = $emailRaw !== '' ? $emailRaw : '—';

$replyTo = $config['email'];
if ($emailRaw !== '' && filter_var($emailRaw, FILTER_VALIDATE_EMAIL)) {
    $replyTo = $emailRaw;
}

$subject = 'Новая заявка: ' . $name . ' ' . ($phone !== '' ? $phone : $emailRaw);
$html    = buildEmailHtml($name, $phoneDisplay, $emailDisplay, $problem, $consentMarketing);

$result = smtpSend(
    $config['smtp_host'],
    $config['smtp_port'],
    $config['email'],
    $config['password'],
    $config['email'],
    $config['email'],
    $replyTo,
    $subject,
    $html
);

if ($result === true) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode([
        'error'  => 'Не удалось отправить письмо.',
        'detail' => $result,
    ]);
}

/* ── SMTP ────────────────────────────────────────────── */

function smtpSend($host, $port, $user, $pass, $from, $to, $replyTo, $subject, $htmlBody) {
    $sock = @stream_socket_client(
        "ssl://$host:$port", $errno, $errstr, 30,
        STREAM_CLIENT_CONNECT,
        stream_context_create(['ssl' => ['verify_peer' => false, 'verify_peer_name' => false]])
    );
    if (!$sock) return "Connection failed: $errstr ($errno)";

    fgets($sock, 512);

    fputs($sock, "EHLO localhost\r\n");
    while ($line = fgets($sock, 512)) {
        if (isset($line[3]) && $line[3] === ' ') break;
    }

    fputs($sock, "AUTH LOGIN\r\n");
    fgets($sock, 512);

    fputs($sock, base64_encode($user) . "\r\n");
    fgets($sock, 512);

    fputs($sock, base64_encode($pass) . "\r\n");
    $auth = trim(fgets($sock, 512));
    if (substr($auth, 0, 3) !== '235') {
        fclose($sock);
        return "Auth failed: $auth";
    }

    fputs($sock, "MAIL FROM:<$from>\r\n");
    fgets($sock, 512);

    fputs($sock, "RCPT TO:<$to>\r\n");
    fgets($sock, 512);

    fputs($sock, "DATA\r\n");
    fgets($sock, 512);

    $msg  = "From: =?UTF-8?B?" . base64_encode("Экстренная разблокировка по 115-ФЗ") . "?= <$from>\r\n";
    $msg .= "To: <$to>\r\n";
    $msg .= "Reply-To: <$replyTo>\r\n";
    $msg .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $msg .= "MIME-Version: 1.0\r\n";
    $msg .= "Content-Type: text/html; charset=UTF-8\r\n";
    $msg .= "Content-Transfer-Encoding: base64\r\n";
    $msg .= "\r\n";
    $msg .= chunk_split(base64_encode($htmlBody));
    $msg .= "\r\n.\r\n";

    fputs($sock, $msg);
    $resp = trim(fgets($sock, 512));

    fputs($sock, "QUIT\r\n");
    fclose($sock);

    return (substr($resp, 0, 3) === '250') ? true : "Send failed: $resp";
}

/* ── Шаблон письма ───────────────────────────────────── */

function esc($s) {
    return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8');
}

function buildEmailHtml($name, $phone, $email, $problem, $consentMarketing) {
    $name   = esc($name);
    $phone  = esc($phone);
    $email  = esc($email);
    $problemHtml = nl2br(esc($problem));

    $tags = '';
    if ($consentMarketing) {
        $tags = '<tr><td style="padding:0 18px 24px;"><span style="display:inline-block;padding:5px 11px;background:#f3e8ff;color:#6b21a8;font-size:13px;font-weight:500;border-radius:6px;">Согласие на рекламные рассылки</span></td></tr>';
    }

    return <<<HTML
<!DOCTYPE html>
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
    .mail-email{color:#1e3a5f;font-size:15px;font-weight:600;word-break:break-all;}
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
        <p style="margin:0 0 10px;"><span class="mail-label">Имя</span><span class="mail-name">$name</span></p>
        <p style="margin:0 0 10px;"><span class="mail-label">Телефон</span><span class="mail-phone">$phone</span></p>
        <p style="margin:0;"><span class="mail-label">Email</span><span class="mail-email">$email</span></p>
      </td>
    </tr>
    $tags
    <tr>
      <td style="padding:0 18px 28px;">
        <p class="mail-message-label">Описание ситуации</p>
        <p class="mail-message-body">$problemHtml</p>
      </td>
    </tr>
    <tr>
      <td class="mail-footer">Письмо отправлено автоматически с формы обратной связи сайта.</td>
    </tr>
  </table>
</body>
</html>
HTML;
}
