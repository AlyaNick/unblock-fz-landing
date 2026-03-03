<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'

const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)

const risks = [
  'Транзитный характер операций',
  'Несоответствие финансового профиля',
  'Налоговая нагрузка ниже отраслевой',
  'Работа с контрагентами повышенного риска',
  'Экономическая необоснованность платежей',
]
</script>

<template>
  <section id="reasons" class="reasons" ref="sectionRef">
    <div class="deco-gradient reasons__deco"></div>

    <div class="reasons__container container">
      <div class="reasons__head reveal">
        <span class="section-label section-label--accent">Аналитика</span>
        <h2 class="reasons__title section-title">
          В чём реальная причина блокировки
        </h2>
        <p class="reasons__intro">
          Банки обязаны проводить мониторинг операций по&nbsp;115-ФЗ.
          При выявлении признаков риска счёт может быть приостановлен или закрыт.
        </p>
      </div>

      <div class="reasons__card reveal">
        <div class="reasons__alert">
          <span class="reasons__excl">!</span>
          <span class="reasons__alert-text">Банк фиксирует признаки риска</span>
        </div>

        <div class="reasons__grid">
          <div
            class="reasons__item reveal"
            :class="'reveal-delay-' + (i + 1)"
            v-for="(risk, i) in risks"
            :key="risk"
          >
            <div class="reasons__item-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="reasons__check">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11.5 3.5L5.5 10L2.5 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="reasons__item-text">{{ risk }}</span>
          </div>
        </div>

        <div class="reasons__conclusion">
          <div class="reasons__conclusion-line"></div>
          <p>
            Задача — юридически опровергнуть выводы банка документально:
            структурированной позицией, первичными документами
            и&nbsp;обоснованием деловой цели операций.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.reasons {
  background: linear-gradient(180deg, #f8f9fc 0%, var(--color-bg) 100%);
  padding: 96px 0;
  position: relative;
  overflow: hidden;
}

.reasons__deco {
  width: 600px;
  height: 600px;
  background: var(--color-navy);
  top: -300px;
  right: -200px;
  opacity: 0.03;
}

.reasons__container {
  position: relative;
  z-index: 1;
}

.reasons__head {
  margin-bottom: 48px;
}

.reasons__title {
  margin-bottom: 16px;
}

.reasons__intro {
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 640px;
}

.reasons__card {
  background: #fff;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: 36px 44px 44px;
  box-shadow: var(--shadow-sm), 0 1px 0 0 rgba(255, 255, 255, 0.8) inset;
}

.reasons__alert {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 24px;
  background: linear-gradient(135deg, rgba(192, 57, 43, 0.06) 0%, rgba(192, 57, 43, 0.02) 100%);
  border: 1px solid rgba(192, 57, 43, 0.12);
  border-radius: var(--radius-md);
  margin-bottom: 32px;
}

.reasons__excl {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-accent);
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  border-radius: 50%;
  box-shadow: 0 2px 10px var(--color-accent-glow);
}

.reasons__alert-text {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.01em;
}

.reasons__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px 28px;
  margin-bottom: 32px;
}

.reasons__item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 22px;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  transition: border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.reasons__item:hover {
  background: #fff;
  border-color: var(--color-green);
  box-shadow: 0 4px 16px rgba(39, 174, 96, 0.06);
}

.reasons__item-num {
  font-size: 15px;
  font-weight: 800;
  color: var(--color-text-muted);
  min-width: 28px;
  transition: color 0.3s ease;
}

.reasons__item:hover .reasons__item-num {
  color: var(--color-green);
}

.reasons__check {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-green-light);
  color: var(--color-green);
  border-radius: 8px;
  flex-shrink: 0;
}

.reasons__item-text {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  line-height: 1.45;
}

.reasons__conclusion {
  display: flex;
  gap: 20px;
  padding: 24px 0 0;
  border-top: 1px solid var(--color-border-light);
}

.reasons__conclusion-line {
  width: 4px;
  min-height: 24px;
  flex-shrink: 0;
  background: var(--gradient-navy);
  border-radius: 2px;
}

.reasons__conclusion p {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-navy);
  line-height: 1.65;
  margin: 0;
}

@media (max-width: 768px) {
  .reasons__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .reasons { padding: 56px 0; }
  .reasons__title { font-size: 26px; }
  .reasons__card { padding: 24px 20px; }
  .reasons__item { padding: 14px 16px; }
}
</style>
