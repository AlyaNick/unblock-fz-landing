<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useReveal } from '../composables/useReveal'

const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)

const BALL_LOOP_MS = 14000
const activeStep = ref(0)
let startTime = 0
let rafId = 0

function tick() {
  const elapsed = (Date.now() - startTime) % BALL_LOOP_MS
  const step = Math.floor((elapsed / BALL_LOOP_MS) * 4) % 4
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

const steps = [
  { num: '1', title: 'Первичная правовая оценка', desc: 'Анализ документов и ситуации в течение 24 часов' },
  { num: '2', title: 'Заключение договора', desc: 'NDA и чёткие условия сотрудничества' },
  { num: '3', title: 'Подготовка позиции', desc: 'Формирование правовой аргументации' },
  { num: '4', title: 'Сопровождение до результата', desc: 'Коммуникация с банком до снятия ограничений' },
]
</script>

<template>
  <section id="format" class="format" ref="sectionRef">
    <div class="format__container container">
      <div class="format__head reveal">
        <span class="section-label section-label--accent">Процесс</span>
        <h2 class="format__title section-title">Формат работы</h2>
        <p class="format__subtitle">
          Прозрачная последовательность этапов по&nbsp;защите бизнеса по&nbsp;115-ФЗ
        </p>
      </div>

      <div class="format__line-block reveal">
        <svg class="format__line-svg" viewBox="0 0 1000 60" preserveAspectRatio="none">
          <path
            id="formatLinePath"
            class="format__line-path"
            d="M0 30 L 1000 30"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle class="format__line-ball" r="6" fill="var(--color-accent)">
            <animateMotion dur="14s" repeatCount="indefinite" keyTimes="0;1" keyPoints="0;1">
              <mpath href="#formatLinePath" />
            </animateMotion>
          </circle>
        </svg>
        <div class="format__line-dots">
          <div
            v-for="(step, i) in steps"
            :key="step.num"
            class="format__line-dot"
            :class="{ 'format__line-dot--active': activeStep === i }"
            :style="{ left: (i / (steps.length - 1)) * 100 + '%' }"
          >
            <span class="format__line-dot-num">{{ step.num }}</span>
          </div>
        </div>
      </div>

      <div class="format__steps reveal">
        <div
          class="format__step"
          :class="{ 'format__step--active': activeStep === i }"
          v-for="(step, i) in steps"
          :key="step.num"
        >
          <h3 class="format__step-title">{{ step.title }}</h3>
          <p class="format__step-desc">{{ step.desc }}</p>
        </div>
      </div>

      <div class="format__note reveal">
        <div class="format__note-inner">
          <svg class="format__note-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 1l2.39 4.84L18 6.54l-4 3.9.94 5.5L10 13.28 5.06 15.94 6 10.44l-4-3.9 5.61-.7L10 1z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>Работаем официально. Конфиденциальность гарантирована.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.format {
  background: var(--color-bg-alt);
  padding: 96px 0;
  position: relative;
}

.format__head {
  text-align: left;
  margin-bottom: 48px;
}

.format__title {
  margin-bottom: 12px;
}

.format__subtitle {
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  max-width: 640px;
  margin: 0;
}

.format__line-block {
  position: relative;
  height: 72px;
  margin-bottom: 40px;
}

.format__line-svg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 72px;
  width: 100%;
  color: var(--color-border);
}

.format__line-path {
  stroke: var(--color-navy);
  opacity: 0.4;
}

.format__line-ball {
  filter: drop-shadow(0 0 6px var(--color-accent-glow));
  pointer-events: none;
}

.format__line-dots {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 0;
  pointer-events: none;
}

.format__line-dot {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--color-accent);
  background: var(--color-bg);
  color: var(--color-accent);
  font-size: 16px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
  pointer-events: auto;
  cursor: default;
  transition: border-color 0.5s ease, background 0.5s ease, box-shadow 0.5s ease, color 0.5s ease;
}

.format__line-dot--active {
  background: var(--gradient-accent);
  color: #fff;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-light), var(--shadow-md);
}

.format__line-dot-num {
  line-height: 1;
}

.format__steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.format__step {
  padding: 24px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color 0.5s ease, box-shadow 0.5s ease;
  cursor: default;
}

.format__step:hover,
.format__step--active {
  border-color: var(--color-navy);
  box-shadow: var(--shadow-md);
}

.format__step-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.3;
  margin-bottom: 6px;
}

.format__step-desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-muted);
  margin: 0;
}

.format__note {
  width: 100%;
}

.format__note-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 20px 28px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.format__note-icon {
  color: var(--color-navy);
  flex-shrink: 0;
}

.format__note p {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-navy);
  margin: 0;
}

@media (max-width: 900px) {
  .format__steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .format {
    padding: 56px 0;
  }

  .format__title {
    font-size: 26px;
  }

  .format__head {
    margin-bottom: 36px;
  }

  .format__line-block {
    height: 56px;
    margin-bottom: 32px;
  }

  .format__line-svg {
    height: 56px;
  }

  .format__line-dot {
    width: 40px;
    height: 40px;
    font-size: 14px;
  }

  .format__steps {
    grid-template-columns: 1fr;
    margin-bottom: 32px;
  }

  .format__step {
    padding: 20px;
  }

  .format__note-inner {
    flex-direction: column;
    padding: 20px;
  }
}
</style>
