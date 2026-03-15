<script setup lang="ts">
import {
  operatorName,
  operatorInn,
  operatorOgrn,
  operatorAddress,
  operatorEmail,
  operatorPhone,
  linkVk,
  linkMax,
  iconVk,
  iconMax,
} from '../config'

const currentYear = new Date().getFullYear()

const navLinks = [
  { href: '#practice', label: 'Что мы делаем' },
  { href: '#reasons', label: 'Причины блокировок' },
  { href: '#format', label: 'Формат работы' },
  { href: '#banks', label: 'Банки' },
  { href: '#cases', label: 'Кейсы' },
  { href: '#contact', label: 'Заявка' },
]
</script>

<template>
  <footer class="footer">
    <div class="footer__container container">
      <div class="footer__top">
        <div class="footer__brand">
          <div class="footer__logo">115-ФЗ Защита</div>
          <p class="footer__tagline">
            Правовая защита бизнеса при блокировке счетов.
            Работаем по&nbsp;всей России.
          </p>
        </div>

        <div class="footer__nav">
          <h4 class="footer__heading">Навигация</h4>
          <a
            v-for="item in navLinks"
            :key="item.href"
            :href="item.href"
            class="footer__link"
          >
            {{ item.label }}
          </a>
        </div>

        <div class="footer__contacts">
          <h4 class="footer__heading">Связаться</h4>
          <a
            v-if="operatorPhone"
            :href="`tel:+${operatorPhone.replace(/\D/g, '').replace(/^8/, '7')}`"
            class="footer__link"
          >
            {{ operatorPhone }}
          </a>
          <a :href="`mailto:${operatorEmail}`" class="footer__link">
            {{ operatorEmail }}
          </a>
          <div class="footer__socials">
            <a
              :href="linkVk || '#'"
              class="footer__social"
              title="VK"
              aria-label="VK"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img :src="iconVk" alt="VK" class="footer__social-icon" width="20" height="20" />
            </a>
            <a
              :href="linkMax || '#'"
              class="footer__social"
              title="MAX"
              aria-label="MAX"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img :src="iconMax" alt="MAX" class="footer__social-icon footer__social-icon--max" width="20" height="20" />
            </a>
          </div>
        </div>
      </div>

      <div class="footer__bottom">
        <div class="footer__legal">
          <p>&copy; {{ currentYear }} {{ operatorName }}. Все права защищены.</p>
          <p class="footer__requisites">
            ИНН {{ operatorInn }} &middot; ОГРН {{ operatorOgrn }} &middot;
            {{ operatorAddress }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #080c16;
  color: rgba(255, 255, 255, 0.7);
  padding: 56px 0 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.footer__top {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr;
  gap: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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
  color: rgba(255, 255, 255, 0.35);
  max-width: 720px;
}

.footer__heading {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 14px;
}

.footer__nav,
.footer__contacts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer__link {
  display: block;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  padding: 0.2em 0;
  transition: color 0.2s;
  text-decoration: none;
}

.footer__link:hover {
  color: #fff;
}

.footer__socials {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}

.footer__social {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm, 8px);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.25s;
}

.footer__social:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
}

.footer__social-icon {
  display: block;
  width: 20px;
  height: 20px;
  object-fit: contain;
  object-position: center;
  filter: brightness(0) invert(1);
  opacity: 0.9;
  transition: opacity 0.25s;
}

/* Иконка Max — с градиентом, фильтр не применяем, чтобы отображалась корректно */
.footer__social-icon--max {
  filter: none;
  opacity: 1;
}

.footer__social:hover .footer__social-icon {
  opacity: 1;
}

.footer__social:hover .footer__social-icon--max {
  opacity: 1;
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
  color: rgba(255, 255, 255, 0.25);
}

.footer__requisites {
  margin-top: 4px;
  font-size: 12px !important;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .footer__top {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 600px) {
  .footer { padding: 40px 0 32px; }
  .footer__top { gap: 28px; padding-bottom: 28px; margin-bottom: 24px; }
  .footer__bottom { flex-direction: column; gap: 16px; }
}
</style>
