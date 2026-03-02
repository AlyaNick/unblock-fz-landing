<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'

const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)

const steps = [
  { num: '1', title: 'Первичная правовая оценка', desc: 'Анализ документов и ситуации в течение 24 часов', icon: '&#128269;' },
  { num: '2', title: 'Заключение договора', desc: 'NDA и чёткие условия сотрудничества', icon: '&#128196;' },
  { num: '3', title: 'Подготовка позиции', desc: 'Формирование правовой аргументации', icon: '&#9878;' },
  { num: '4', title: 'Сопровождение до результата', desc: 'Коммуникация с банком до снятия ограничений', icon: '&#10003;' },
]
</script>

<template>
  <section id="format" class="format" ref="sectionRef">
    <div class="format__container container">
      <div class="format__head reveal">
        <span class="section-label section-label--accent">Процесс</span>
        <h2 class="format__title section-title">Формат работы</h2>
      </div>

      <div class="format__timeline">
        <div class="format__line"></div>
        <div
          class="format__step reveal"
          :class="'reveal-delay-' + (i + 1)"
          v-for="(step, i) in steps"
          :key="step.num"
        >
          <div class="format__step-marker">
            <span class="format__step-num">{{ step.num }}</span>
          </div>
          <div class="format__step-card">
            <div class="format__step-icon" v-html="step.icon"></div>
            <div class="format__step-content">
              <h3 class="format__step-title">{{ step.title }}</h3>
              <p class="format__step-desc">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="format__note reveal">
        <div class="format__note-inner">
          <div class="format__note-icon">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 1l2.39 4.84L18 6.54l-4 3.9.94 5.5L10 13.28 5.06 15.94 6 10.44l-4-3.9 5.61-.7L10 1z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p>Работаем официально. Конфиденциальность гарантирована.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.format {
  background: var(--color-bg);
  padding: 96px 0;
  position: relative;
}

.format__head {
  text-align: center;
  margin-bottom: 64px;
}

.format__title {
  margin-bottom: 0;
}

.format__timeline {
  max-width: 700px;
  margin: 0 auto 48px;
  position: relative;
}

.format__line {
  position: absolute;
  left: 23px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, var(--color-accent), var(--color-navy));
  border-radius: 1px;
}

.format__step {
  display: flex;
  gap: 24px;
  position: relative;
}

.format__step + .format__step {
  margin-top: 16px;
}

.format__step-marker {
  flex-shrink: 0;
  z-index: 1;
}

.format__step-num {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-accent);
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  border-radius: 50%;
  box-shadow: 0 4px 16px var(--color-accent-glow);
}

.format__step-card {
  display: flex;
  gap: 18px;
  padding: 24px;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  flex: 1;
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
}

.format__step-card:hover {
  border-color: var(--color-navy);
  box-shadow: var(--shadow-md);
  transform: translateX(4px);
}

.format__step-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  font-size: 20px;
  flex-shrink: 0;
}

.format__step-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.format__step-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.3;
}

.format__step-desc {
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.format__note {
  max-width: 700px;
  margin: 0 auto;
}

.format__note-inner {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 28px;
  background: linear-gradient(135deg, rgba(30, 58, 95, 0.06), rgba(30, 58, 95, 0.02));
  border: 1px solid rgba(30, 58, 95, 0.12);
  border-radius: var(--radius-md);
}

.format__note-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-navy-light);
  color: var(--color-navy);
  border-radius: 10px;
  flex-shrink: 0;
}

.format__note p {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-navy);
}

@media (max-width: 768px) {
  .format { padding: 72px 0; }

  .format__step-card {
    flex-direction: column;
    gap: 12px;
    padding: 20px;
  }
}

@media (max-width: 600px) {
  .format { padding: 56px 0; }
  .format__title { font-size: 26px; }
  .format__step { gap: 16px; }
  .format__step-num { width: 40px; height: 40px; font-size: 14px; }
  .format__line { left: 19px; }
}
</style>
