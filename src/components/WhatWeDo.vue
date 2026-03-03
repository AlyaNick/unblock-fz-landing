<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useReveal } from '../composables/useReveal'

const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)

const BALL_LOOP_MS = 12000
const activeStep = ref(0)
let startTime = 0
let rafId = 0

function tick() {
  const elapsed = (Date.now() - startTime) % BALL_LOOP_MS
  const step = Math.floor((elapsed / BALL_LOOP_MS) * 3) % 3
  if (step !== activeStep.value) activeStep.value = step
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  startTime = Date.now()
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(rafId)
})

const stages = [
  {
    num: '01',
    title: 'Правовой аудит ситуации',
    items: ['Выписки', 'Договорную модель', 'Структуру оборотов', 'Налоговую нагрузку', 'Деловую цель операций'],
    label: 'Анализируем:',
  },
  {
    num: '02',
    title: 'Формирование доказательной позиции',
    items: ['Структурированное пояснение', 'Подтверждение экономического смысла', 'Обоснование деловой цели', 'Пакет первичных документов', 'Корректировку договорной базы'],
    label: 'Готовим:',
  },
  {
    num: '03',
    title: 'Процессуальное сопровождение',
    items: ['Ведем коммуникацию с банком', 'Фиксируем сроки и нарушения', 'Формируем досудебную позицию', 'Оцениваем перспективу суда'],
    label: '',
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

      <div class="practice__wave-block reveal">
        <svg class="practice__wave" viewBox="0 0 1000 60" preserveAspectRatio="none">
          <path
            id="practiceWavePath"
            class="practice__wave-path"
            d="M0 30 Q 250 0 500 30 Q 750 60 1000 30"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle class="practice__wave-ball" r="6" fill="var(--color-accent)">
            <animateMotion dur="12s" repeatCount="indefinite" keyTimes="0;1" keyPoints="0;1">
              <mpath href="#practiceWavePath" />
            </animateMotion>
          </circle>
        </svg>
        <div class="practice__wave-dots">
          <div
            v-for="(stage, i) in stages"
            :key="stage.num"
            class="practice__wave-dot"
            :class="{ 'practice__wave-dot--active': activeStep === i }"
            :style="{ left: (i / (stages.length - 1)) * 100 + '%' }"
          >
            <span class="practice__wave-dot-num">{{ stage.num }}</span>
          </div>
        </div>
      </div>

      <div class="practice__steps reveal">
        <div
          class="practice__step"
          :class="{ 'practice__step--active': activeStep === i }"
          v-for="(stage, i) in stages"
          :key="stage.num"
        >
          <h3 class="practice__step-title">{{ stage.title }}</h3>
          <p v-if="stage.label" class="practice__step-label">{{ stage.label }}</p>
          <ul class="practice__step-list">
            <li v-for="item in stage.items" :key="item">{{ item }}</li>
          </ul>
        </div>
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
  text-align: left;
  margin-bottom: 48px;
}

.practice__title {
  margin-bottom: 12px;
}

.practice__subtitle {
  margin: 0;
}

.practice__wave-block {
  position: relative;
  height: 72px;
  margin-bottom: 40px;
}

.practice__wave {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 72px;
  width: 100%;
  color: var(--color-border);
}

.practice__wave-path {
  stroke: var(--color-navy);
  opacity: 0.4;
}

.practice__wave-ball {
  filter: drop-shadow(0 0 6px var(--color-accent-glow));
  pointer-events: none;
}

.practice__wave-dots {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 0;
  pointer-events: none;
}

.practice__wave-dot {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--color-accent);
  background: var(--color-bg);
  color: var(--color-accent);
  font-size: 14px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  pointer-events: auto;
  cursor: default;
  transition: border-color 0.5s ease, background 0.5s ease, box-shadow 0.5s ease, color 0.5s ease;
}

.practice__wave-dot--active {
  background: var(--gradient-accent);
  color: #fff;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-light), var(--shadow-md);
}

.practice__wave-dot-num {
  line-height: 1;
}

.practice__steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}

.practice__step {
  padding: 24px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
  cursor: default;
}

.practice__step:hover,
.practice__step--active {
  border-color: var(--color-navy);
  box-shadow: var(--shadow-md);
}

.practice__step-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 10px;
  line-height: 1.3;
}

.practice__step-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}

.practice__step-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.practice__step-list li {
  position: relative;
  padding-left: 14px;
  font-size: 13px;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.practice__step-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--color-accent);
}

.practice__results {
  margin-bottom: 40px;
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

@media (max-width: 900px) {
  .practice__steps {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .practice { padding: 56px 0; }
  .practice__wave-block { height: 56px; margin-bottom: 32px; }
  .practice__wave { height: 56px; }
  .practice__wave-dot { width: 40px; height: 40px; font-size: 12px; }
  .practice__step { padding: 20px; }
  .practice__results-inner { padding: 24px; }
  .practice__results-grid { grid-template-columns: 1fr; }
  .practice__mission-inner { padding: 20px; }
}
</style>
