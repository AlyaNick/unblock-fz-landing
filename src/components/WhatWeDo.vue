<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'

const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)

const stages = [
  {
    num: '01',
    title: 'Правовой аудит ситуации',
    items: ['Выписки', 'Договорную модель', 'Структуру оборотов', 'Налоговую нагрузку', 'Деловую цель операций'],
    label: 'Анализируем:',
    icon: '&#9783;',
  },
  {
    num: '02',
    title: 'Формирование доказательной позиции',
    items: ['Структурированное пояснение', 'Подтверждение экономического смысла', 'Обоснование деловой цели', 'Пакет первичных документов', 'Корректировку договорной базы'],
    label: 'Готовим:',
    icon: '&#9998;',
  },
  {
    num: '03',
    title: 'Процессуальное сопровождение',
    items: ['Ведем коммуникацию с банком', 'Фиксируем сроки и нарушения', 'Формируем досудебную позицию', 'Оцениваем перспективу суда'],
    label: '',
    icon: '&#9878;',
  },
]

const results = [
  'Снятие ограничений',
  'Сохранение счета',
  'Снижение риска повторной блокировки',
  'Корректировка финансовой модели',
]
</script>

<template>
  <section id="practice" class="practice" ref="sectionRef">
    <div class="deco-gradient practice__deco-1"></div>
    <div class="deco-gradient practice__deco-2"></div>

    <div class="practice__container container">
      <div class="practice__head reveal">
        <span class="section-label section-label--navy">Методология</span>
        <h2 class="practice__title section-title">Что мы делаем на&nbsp;практике</h2>
        <p class="practice__subtitle section-subtitle">
          Три этапа системной работы по&nbsp;снятию ограничений
        </p>
      </div>

      <div class="practice__stages">
        <template v-for="(stage, i) in stages" :key="stage.num">
          <div class="practice__stage reveal" :class="'reveal-delay-' + (i + 1)">
            <div class="practice__stage-top">
              <div class="practice__stage-num-wrap">
                <span class="practice__stage-num">{{ stage.num }}</span>
              </div>
              <div class="practice__stage-badge" v-html="stage.icon"></div>
            </div>
            <h3 class="practice__stage-title">{{ stage.title }}</h3>
            <p v-if="stage.label" class="practice__stage-label">{{ stage.label }}</p>
            <ul class="practice__stage-list">
              <li v-for="item in stage.items" :key="item">{{ item }}</li>
            </ul>
          </div>

          <div v-if="i < stages.length - 1" class="practice__arrow">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M15 20h10M21 15l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </template>
      </div>

      <div class="practice__results reveal">
        <div class="practice__results-inner">
          <div class="practice__results-header">
            <div class="practice__results-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <h3 class="practice__results-title">Результат работы</h3>
          </div>
          <div class="practice__results-grid">
            <div class="practice__result" v-for="item in results" :key="item">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15 4.5L6.75 13.5L3 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="practice__mission reveal">
        <div class="practice__mission-inner">
          <div class="practice__mission-line"></div>
          <p>
            Наша задача — не&nbsp;просто разблокировать счет,
            а&nbsp;выстроить безопасную модель работы.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.practice {
  background: var(--color-bg-alt);
  padding: 96px 0;
  position: relative;
  overflow: hidden;
}

.practice__deco-1 {
  width: 400px;
  height: 400px;
  background: var(--color-accent);
  top: -150px;
  left: -150px;
  opacity: 0.04;
}

.practice__deco-2 {
  width: 350px;
  height: 350px;
  background: var(--color-navy);
  bottom: -100px;
  right: -100px;
  opacity: 0.05;
}

.practice__container {
  position: relative;
  z-index: 1;
}

.practice__head {
  text-align: center;
  margin-bottom: 64px;
}

.practice__title {
  margin-bottom: 12px;
}

.practice__subtitle {
  margin: 0 auto;
}

.practice__stages {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  margin-bottom: 48px;
}

.practice__stage {
  flex: 1;
  max-width: 340px;
  padding: 32px 28px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
  position: relative;
}

.practice__stage:hover {
  border-color: var(--color-navy);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.practice__stage-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.practice__stage-num-wrap {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-accent);
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--color-accent-glow);
}

.practice__stage-num {
  font-size: 18px;
  font-weight: 800;
  color: #fff;
}

.practice__stage-badge {
  font-size: 24px;
  color: var(--color-text-muted);
  opacity: 0.4;
}

.practice__stage-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.3;
  margin-bottom: 14px;
}

.practice__stage-label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}

.practice__stage-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.practice__stage-list li {
  position: relative;
  padding-left: 16px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.practice__stage-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-accent);
}

.practice__arrow {
  display: flex;
  align-items: center;
  padding: 0 8px;
  margin-top: 56px;
  color: var(--color-text-muted);
}

.practice__results {
  max-width: 840px;
  margin: 0 auto 40px;
}

.practice__results-inner {
  padding: 36px;
  background: linear-gradient(135deg, var(--color-bg-dark) 0%, #1a2840 100%);
  border-radius: var(--radius-lg);
  color: #fff;
}

.practice__results-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.practice__results-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(39, 174, 96, 0.15);
  color: var(--color-green);
  border-radius: 12px;
}

.practice__results-title {
  font-size: 20px;
  font-weight: 700;
}

.practice__results-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.practice__result {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-on-dark);
}

.practice__result svg {
  color: var(--color-green);
  flex-shrink: 0;
}

.practice__mission {
  max-width: 680px;
  margin: 0 auto;
}

.practice__mission-inner {
  display: flex;
  gap: 20px;
  padding: 24px 32px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.practice__mission-line {
  width: 3px;
  flex-shrink: 0;
  background: var(--gradient-accent);
  border-radius: 2px;
}

.practice__mission p {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.6;
}

@media (max-width: 960px) {
  .practice__stages { flex-direction: column; align-items: center; }
  .practice__stage { max-width: 100%; }
  .practice__arrow { transform: rotate(90deg); padding: 8px 0; margin-top: 0; }
}

@media (max-width: 600px) {
  .practice { padding: 56px 0; }
  .practice__stage { padding: 24px 20px; }
  .practice__results-inner { padding: 24px; }
  .practice__results-grid { grid-template-columns: 1fr; }
  .practice__mission-inner { padding: 20px; }
}
</style>
