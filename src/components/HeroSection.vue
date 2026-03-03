<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'

const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)

const services = [
  'Приостановка операций',
  'Отказ в проведении платежей',
  'Требование закрыть счет',
  'Отказ в ДБО',
  'Включение в перечни риска',
]
</script>

<template>
  <section id="hero" class="hero" ref="sectionRef">
    <div class="hero__bg">
      <video autoplay muted loop playsinline preload="auto">
        <source src="/video.mp4" type="video/mp4" />
      </video>
      <div class="hero__overlay"></div>
      <div class="hero__grain"></div>
      <div class="deco-gradient hero__deco-1"></div>
      <div class="deco-gradient hero__deco-2"></div>
    </div>

    <div class="hero__content container">
      <header class="hero__top reveal">
        <h1 class="hero__title reveal reveal-delay-1">
          Экстренная разблокировка счета по&nbsp;115-ФЗ
        </h1>
        <p class="hero__tagline">
          Правовая защита бизнеса при приостановке операций
        </p>
      </header>

      <div class="hero__quote-block reveal reveal-delay-2">
        <div class="hero__quote-line" aria-hidden="true"></div>
        <p class="hero__quote-text">
          Вопрос не&nbsp;в&nbsp;эмоциях, а&nbsp;в&nbsp;корректной правовой
          позиции и&nbsp;доказательной базе.
        </p>
      </div>

      <div class="hero__stats-block reveal reveal-delay-2">
        <div class="hero__stat">
          <span class="hero__stat-value">24ч</span>
          <span class="hero__stat-label">подключение</span>
        </div>
        <div class="hero__stat-divider"></div>
        <div class="hero__stat">
          <span class="hero__stat-value">200+</span>
          <span class="hero__stat-label">разблокировок</span>
        </div>
        <div class="hero__stat-divider"></div>
        <div class="hero__stat">
          <span class="hero__stat-value">93%</span>
          <span class="hero__stat-label">положительных решений</span>
        </div>
      </div>

      <div class="hero__services-block reveal reveal-delay-3">
        <p class="hero__services-label">Сопровождаем бизнес при:</p>
        <ul class="hero__services-list">
          <li class="hero__service" v-for="item in services" :key="item">{{ item }}</li>
        </ul>
      </div>

      <div class="hero__connect-block reveal reveal-delay-3">
        <p class="hero__connect">
          <span class="hero__connect-dot"></span>
          Подключаемся в&nbsp;день обращения
        </p>
        <div class="hero__buttons">
          <a href="#contact" class="btn btn--primary btn--lg">
            Получить правовую оценку
          </a>
          <a href="#practice" class="btn btn--outline btn--lg">
            Как мы работаем
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
}

.hero__bg video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(12, 18, 32, 0.88) 0%,
    rgba(12, 18, 32, 0.92) 50%,
    rgba(12, 18, 32, 0.96) 100%
  );
}

.hero__grain {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.hero__deco-1 {
  width: 500px;
  height: 500px;
  background: var(--color-accent);
  top: -200px;
  right: -100px;
  opacity: 0.08;
}

.hero__deco-2 {
  width: 400px;
  height: 400px;
  background: var(--color-navy);
  bottom: -100px;
  left: -100px;
  opacity: 0.12;
}

.hero__content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 80px 24px 64px;
  color: #fff;
  box-sizing: border-box;
}

.hero__top {
  margin-bottom: 40px;
}

.hero__title {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #fff 60%, rgba(255, 255, 255, 0.7));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__tagline {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.55);
  font-weight: 400;
  margin: 0;
}

.hero__quote-block {
  display: flex;
  align-items: stretch;
  gap: 20px;
  margin-bottom: 24px;
  padding: 24px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.hero__quote-line {
  width: 3px;
  min-height: 28px;
  flex-shrink: 0;
  background: var(--gradient-accent);
  border-radius: 2px;
}

.hero__quote-text,
.hero__quote-block p {
  font-size: 17px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.85);
  font-style: italic;
  margin: 0;
  flex: 1;
  min-width: 0;
}

.hero__stats-block {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: center;
  gap: 0;
  margin-bottom: 40px;
  padding: 28px 32px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(12px);
}

.hero__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
}

.hero__stat-value {
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  line-height: 1;
}

.hero__stat-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.hero__stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.12);
  align-self: center;
}

.hero__services-block {
  width: 100%;
}

.hero__services-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.45);
  margin-bottom: 16px;
}

.hero__services-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  margin: 0 0 32px 0;
  padding: 0;
}

.hero__service {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.hero__connect-block {
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.hero__connect {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-green);
  margin-bottom: 16px;
}

.hero__connect-dot {
  width: 8px;
  height: 8px;
  background: var(--color-green);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(39, 174, 96, 0.5);
}

.hero__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero__buttons .btn {
  min-width: 180px;
}

@media (max-width: 960px) {
  .hero__title { font-size: 40px; }
  .hero__stats-block { padding: 24px 20px; }
}

@media (max-width: 600px) {
  .hero__content { padding: 48px 24px 40px; }
  .hero__title { font-size: 30px; }
  .hero__tagline { font-size: 16px; }
  .hero__top { margin-bottom: 32px; }
  .hero__quote-text, .hero__quote-block p { font-size: 15px; }
  .hero__stats-block {
    grid-template-columns: 1fr 1fr 1fr;
    padding: 24px 16px;
  }
  .hero__stat-divider { display: none; }
  .hero__buttons { flex-direction: column; }
  .hero__buttons .btn { width: 100%; min-width: 0; }
}
</style>
