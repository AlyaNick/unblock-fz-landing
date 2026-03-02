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
      <div class="hero__badge reveal">
        <span class="hero__badge-dot"></span>
        Правовая защита бизнеса
      </div>

      <h1 class="hero__title reveal reveal-delay-1">
        Экстренная разблокировка<br />счета по&nbsp;115-ФЗ
      </h1>

      <p class="hero__subtitle reveal reveal-delay-2">
        Правовая защита бизнеса при приостановке операций
      </p>

      <div class="hero__quote reveal reveal-delay-3">
        <div class="hero__quote-line"></div>
        <p>
          Вопрос не&nbsp;в&nbsp;эмоциях, а&nbsp;в&nbsp;корректной правовой
          позиции и&nbsp;доказательной базе.
        </p>
      </div>

      <div class="hero__grid reveal reveal-delay-3">
        <div class="hero__services">
          <p class="hero__services-label">Мы сопровождаем бизнес при:</p>
          <div class="hero__services-list">
            <div class="hero__service" v-for="item in services" :key="item">
              <span class="hero__service-icon">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.5"/>
                  <circle cx="6" cy="6" r="2" fill="currentColor"/>
                </svg>
              </span>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
        <div class="hero__cta-block">
          <div class="hero__connect">
            <span class="hero__connect-indicator"></span>
            Подключаемся в&nbsp;день обращения
          </div>
          <a href="#contact" class="btn btn--primary btn--lg hero__cta-btn">
            Получить правовую оценку
          </a>
          <a href="#practice" class="btn btn--outline hero__cta-btn-secondary">
            Как мы работаем
          </a>
        </div>
      </div>

      <div class="hero__stats reveal reveal-delay-4">
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
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
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
  padding-top: 80px;
  padding-bottom: 64px;
  color: #fff;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.04);
  margin-bottom: 28px;
  backdrop-filter: blur(8px);
}

.hero__badge-dot {
  width: 8px;
  height: 8px;
  background: var(--color-accent);
  border-radius: 50%;
  box-shadow: 0 0 12px var(--color-accent-glow);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 12px var(--color-accent-glow); }
  50% { opacity: 0.4; box-shadow: 0 0 4px var(--color-accent-glow); }
}

.hero__title {
  font-size: 56px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #fff 60%, rgba(255, 255, 255, 0.6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 40px;
  font-weight: 400;
}

.hero__quote {
  display: flex;
  gap: 20px;
  padding: 24px 0;
  margin-bottom: 48px;
  max-width: 640px;
}

.hero__quote-line {
  width: 3px;
  flex-shrink: 0;
  background: var(--gradient-accent);
  border-radius: 2px;
}

.hero__quote p {
  font-size: 17px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.75);
  font-style: italic;
}

.hero__grid {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 56px;
  align-items: start;
  margin-bottom: 56px;
}

.hero__services-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 20px;
}

.hero__services-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.hero__service {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
}

.hero__service-icon {
  color: var(--color-accent);
  flex-shrink: 0;
}

.hero__cta-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(12px);
}

.hero__connect {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 8px;
}

.hero__connect-indicator {
  width: 8px;
  height: 8px;
  background: var(--color-green);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(39, 174, 96, 0.5);
  animation: pulse-green 2s ease-in-out infinite;
}

@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 8px rgba(39, 174, 96, 0.5); }
  50% { box-shadow: 0 0 2px rgba(39, 174, 96, 0.2); }
}

.hero__cta-btn {
  width: 100%;
  text-align: center;
}

.hero__cta-btn-secondary {
  width: 100%;
  text-align: center;
}

.hero__stats {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 28px 36px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(12px);
}

.hero__stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.hero__stat-value {
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  line-height: 1;
}

.hero__stat-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
}

.hero__stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 960px) {
  .hero__title { font-size: 42px; }
  .hero__grid { grid-template-columns: 1fr; gap: 32px; }
  .hero__stats { gap: 24px; padding: 24px; }
}

@media (max-width: 600px) {
  .hero__content { padding-top: 48px; padding-bottom: 40px; }
  .hero__title { font-size: 32px; }
  .hero__subtitle { font-size: 17px; margin-bottom: 28px; }
  .hero__quote { margin-bottom: 32px; }
  .hero__cta-block { padding: 24px; }
  .hero__stats {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
  .hero__stat-divider { width: 100%; height: 1px; }
  .hero__stat { flex-direction: row; align-items: baseline; gap: 10px; }
}
</style>
