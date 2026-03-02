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
      <div class="reasons__layout">

        <div class="reasons__left reveal-left">
          <span class="section-label section-label--accent">Аналитика</span>
          <h2 class="reasons__title section-title">
            В чём реальная причина блокировки
          </h2>

          <div class="reasons__alert">
            <div class="reasons__alert-icons">
              <span class="reasons__excl">!</span>
              <span class="reasons__excl">!</span>
              <span class="reasons__excl">!</span>
            </div>
            <p class="reasons__alert-text">Банк фиксирует признаки риска</p>
          </div>

          <div class="reasons__conclusion">
            <div class="reasons__conclusion-line"></div>
            <p>
              Задача — юридически опровергнуть выводы банка документально.
            </p>
          </div>
        </div>

        <div class="reasons__right">
          <div class="reasons__list">
            <div
              class="reasons__item reveal-right"
              :class="'reveal-delay-' + (i + 1)"
              v-for="(risk, i) in risks"
              :key="risk"
            >
              <div class="reasons__item-num">{{ String(i + 1).padStart(2, '0') }}</div>
              <div class="reasons__item-content">
                <div class="reasons__check">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M11.5 3.5L5.5 10L2.5 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span>{{ risk }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.reasons {
  background: var(--color-bg);
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
  opacity: 0.04;
}

.reasons__container {
  position: relative;
  z-index: 1;
}

.reasons__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

.reasons__title {
  margin-bottom: 32px;
}

.reasons__alert {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: linear-gradient(135deg, rgba(192, 57, 43, 0.06), rgba(192, 57, 43, 0.02));
  border: 1px solid rgba(192, 57, 43, 0.12);
  border-radius: var(--radius-md);
  margin-bottom: 32px;
}

.reasons__alert-icons {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.reasons__excl {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-accent);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  border-radius: 50%;
  box-shadow: 0 2px 8px var(--color-accent-glow);
}

.reasons__alert-text {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
}

.reasons__conclusion {
  display: flex;
  gap: 16px;
  padding: 20px 0;
}

.reasons__conclusion-line {
  width: 3px;
  flex-shrink: 0;
  background: var(--gradient-navy);
  border-radius: 2px;
}

.reasons__conclusion p {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-navy);
  line-height: 1.6;
}

.reasons__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reasons__item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
}

.reasons__item:hover {
  border-color: var(--color-green);
  background: #fff;
  box-shadow: 0 4px 20px rgba(39, 174, 96, 0.08);
  transform: translateX(-4px);
}

.reasons__item-num {
  font-size: 22px;
  font-weight: 800;
  color: var(--color-border);
  min-width: 36px;
  transition: color 0.3s;
}

.reasons__item:hover .reasons__item-num {
  color: var(--color-green);
}

.reasons__item-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.reasons__check {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-green-light);
  color: var(--color-green);
  border-radius: 6px;
  flex-shrink: 0;
}

.reasons__item-content span {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text);
}

@media (max-width: 860px) {
  .reasons__layout { grid-template-columns: 1fr; gap: 40px; }
}

@media (max-width: 600px) {
  .reasons { padding: 56px 0; }
  .reasons__title { font-size: 26px; }
  .reasons__item { padding: 16px 18px; gap: 12px; }
  .reasons__item-num { font-size: 18px; min-width: 28px; }
}
</style>
