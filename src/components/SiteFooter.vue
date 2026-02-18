<template>
  <footer class="footer">
    <div class="footer__container container">

      <div class="footer__top">
        <div class="footer__brand">
          <div class="footer__logo">Экстренная бухгалтерия</div>
          <p class="footer__tagline">
            Помощь бизнесу в&nbsp;кризисных ситуациях.
            Работаем 24/7, 364&nbsp;дня в&nbsp;году.
          </p>
        </div>

        <div class="footer__socials">
          <span class="footer__socials-label">Связаться с нами:</span>
          <div class="footer__socials-links">
            <a href="#" class="footer__social" title="Telegram" aria-label="Telegram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
              </svg>
            </a>
            <a href="#" class="footer__social" title="WhatsApp" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a href="#" class="footer__social" title="VK" aria-label="VK">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.391 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202-2.17-3.042-2.763-5.32-2.763-5.785 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.864 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.644v3.49c0 .373.17.508.271.508.22 0 .407-.135.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.644-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.744-.576.744z"/>
              </svg>
            </a>
            <a href="#" class="footer__social" title="Max" aria-label="Max (ICQ)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-1-3H7l4-9h1l1 3h3l-4 9h-1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__legal">
          <p>&copy; {{ new Date().getFullYear() }} ООО &laquo;Автопрофи&raquo;</p>
          <p>ИНН/КПП/ОГРН — уточняются</p>
        </div>
        <div class="footer__links">
          <a href="#">Политика конфиденциальности</a>
          <a href="#">Договор оферты</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #1a1a1a;
  color: rgba(255, 255, 255, 0.7);
  padding: 56px 0 40px;
}

.footer__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 28px;
}

.footer__logo {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
}

.footer__tagline {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.45);
  max-width: 320px;
}

.footer__socials {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.footer__socials-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
}

.footer__socials-links {
  display: flex;
  gap: 10px;
}

.footer__social {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.6);
  transition: background 0.2s, color 0.2s;
}

.footer__social:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
}

.footer__legal p {
  font-size: 13px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.35);
}

.footer__links {
  display: flex;
  gap: 24px;
}

.footer__links a {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.2s;
}

.footer__links a:hover {
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 600px) {
  .footer {
    padding: 40px 0 32px;
  }

  .footer__top {
    flex-direction: column;
    gap: 28px;
  }

  .footer__socials {
    align-items: flex-start;
  }

  .footer__bottom {
    flex-direction: column;
    gap: 16px;
  }

  .footer__links {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
