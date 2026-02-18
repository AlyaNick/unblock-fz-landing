<script setup lang="ts">
import { Phone } from '@element-plus/icons-vue'

const problems = [
  'Счёт заблокирован?',
  'ФНС требует документы?',
  'Отчётность не сдавалась?',
  'Перешли порог НДС в 2025?',
]

const steps = [
  'Анализ ситуации',
  'План действий',
  'Работа с банком и ФНС',
  'Решение проблемы',
]
</script>

<template>
  <section id="hero" class="hero">
    <div class="hero__top">
      <div class="hero__video">
        <video autoplay muted loop playsinline preload="auto">
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div class="hero__video-overlay"></div>
      </div>
      <div class="hero__top-content container">

        <div class="hero__head">
          <div class="hero__badge">
            <span class="hero__badge-dot"></span>
            Экстренная бухгалтерская помощь
          </div>

          <h1 class="hero__title">
            Экстренная бухгалтерия<br />
            для бизнеса в кризисе
          </h1>
        </div>

        <div class="hero__problems">
          <div class="hero__problem" v-for="item in problems" :key="item">
            {{ item }}
          </div>
        </div>

        <div class="hero__warning">
          <p>
            Каждый день промедления увеличивает штрафы и&nbsp;риски. Мы подключаемся
            немедленно: разблокируем счета, восстанавливаем учёт и&nbsp;выстраиваем
            план защиты от&nbsp;доначислений.
          </p>
        </div>

      </div>
    </div>

    <div class="hero__under container">
      <div class="hero__process">
        <div class="hero__process-track">
          <div class="hero__process-line"></div>
          <div class="hero__process-fill"></div>
        </div>
        <div class="hero__process-steps">
          <div class="hero__process-step" v-for="(step, i) in steps" :key="i">
            <div class="hero__process-dot" :class="{ 'hero__process-dot--done': i < steps.length - 1, 'hero__process-dot--last': i === steps.length - 1 }">
              <span class="hero__process-dot-inner">{{ i + 1 }}</span>
            </div>
            <div class="hero__process-label">{{ step }}</div>
          </div>
        </div>
      </div>

      <div class="hero__bottom">
        <div class="hero__response">
          <span class="hero__response-value">15 минут</span>
          <span class="hero__response-sep">&mdash;</span>
          <span class="hero__response-desc">первичная реакция. Конфиденциально. По договору. С&nbsp;фиксацией ответственности.</span>
        </div>

        <div class="hero__actions">
          <el-button type="danger" size="large" class="hero__btn-urgent">
            Срочная консультация
          </el-button>
          <el-button size="large" class="hero__btn-contact">
            <el-icon class="hero__btn-icon"><Phone /></el-icon>
            Связаться сейчас
          </el-button>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.hero {
  overflow: hidden;
}

/* --- Video top --- */
.hero__top {
  position: relative;
  color: #fff;
  padding: 96px 0 72px;
  overflow: hidden;
}

.hero__video {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero__video video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero__video-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.7);
}

.hero__top-content {
  position: relative;
  z-index: 1;
}

/* --- Under video --- */
.hero__under {
  background: var(--color-bg);
  padding: 48px 24px 56px;
}

/* --- Head --- */
.hero__head {
  text-align: center;
  margin-bottom: 40px;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: #e74c3c;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.06);
}

.hero__badge-dot {
  width: 7px;
  height: 7px;
  background-color: var(--color-accent);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}

.hero__title {
  font-size: 52px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: #fff;
}

/* --- Problems --- */
.hero__problems {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 36px;
  flex-wrap: wrap;
}

.hero__problem {
  padding: 10px 22px;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  transition: border-color 0.2s, background 0.2s;
}

.hero__problem:hover {
  border-color: rgba(231, 76, 60, 0.5);
  background: rgba(255, 255, 255, 0.1);
}

/* --- Warning --- */
.hero__warning {
  max-width: 720px;
  margin: 0 auto 56px;
  text-align: center;
}

.hero__warning p {
  font-size: 17px;
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.7);
}

/* --- Process --- */
.hero__process {
  position: relative;
  margin-bottom: 48px;
  padding: 0 20px;
}

.hero__process-track {
  position: absolute;
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 160px);
  height: 4px;
  border-radius: 2px;
  background: var(--color-border-light);
}

.hero__process-fill {
  height: 100%;
  width: 75%;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--color-accent), #e67e22);
}

.hero__process-steps {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.hero__process-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.hero__process-dot {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.hero__process-dot--done {
  background: linear-gradient(135deg, var(--color-accent), #e67e22);
  box-shadow: 0 3px 12px rgba(192, 57, 43, 0.25);
}

.hero__process-dot--last {
  background: var(--color-bg);
  border: 2px solid var(--color-border);
}

.hero__process-dot--last .hero__process-dot-inner {
  color: var(--color-text-muted);
}

.hero__process-dot-inner {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  line-height: 1;
}

.hero__process-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  text-align: center;
  max-width: 140px;
}

/* --- Bottom --- */
.hero__bottom {
  border-top: 1px solid var(--color-border);
  padding-top: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.hero__response {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.hero__response-value {
  font-size: 20px;
  font-weight: 800;
  color: var(--color-accent);
  white-space: nowrap;
}

.hero__response-sep {
  color: var(--color-text-muted);
}

.hero__response-desc {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.hero__actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.hero__btn-urgent {
  --el-button-bg-color: var(--color-accent);
  --el-button-border-color: var(--color-accent);
  --el-button-hover-bg-color: var(--color-accent-hover);
  --el-button-hover-border-color: var(--color-accent-hover);
  --el-button-active-bg-color: #922b21;
  --el-button-active-border-color: #922b21;
  --el-button-text-color: #fff;
  font-weight: 600;
  padding: 12px 28px;
  height: 46px;
  font-size: 15px;
  border-radius: 8px;
}

.hero__btn-contact {
  --el-button-bg-color: var(--color-bg);
  --el-button-border-color: var(--color-border);
  --el-button-hover-bg-color: var(--color-bg-alt);
  --el-button-hover-border-color: #d0d5dd;
  --el-button-text-color: var(--color-text);
  --el-button-hover-text-color: var(--color-text);
  font-weight: 600;
  padding: 12px 28px;
  height: 46px;
  font-size: 15px;
  border-radius: 8px;
}

.hero__btn-icon {
  margin-right: 6px;
}

/* --- Responsive --- */
@media (max-width: 860px) {
  .hero__top {
    padding: 64px 0 56px;
  }

  .hero__title {
    font-size: 38px;
  }

  .hero__under {
    padding: 36px 24px 48px;
  }

  .hero__process-track {
    width: calc(100% - 100px);
  }

  .hero__process-label {
    font-size: 12px;
    max-width: 100px;
  }

  .hero__process-dot {
    width: 42px;
    height: 42px;
  }

  .hero__bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .hero__top {
    padding: 48px 0 40px;
  }

  .hero__under {
    padding: 28px 24px 36px;
  }

  .hero__title {
    font-size: 30px;
  }

  .hero__problems {
    gap: 8px;
  }

  .hero__problem {
    padding: 8px 16px;
    font-size: 13px;
  }

  .hero__process {
    padding: 0;
  }

  .hero__process-steps {
    flex-direction: column;
    gap: 0;
  }

  .hero__process-step {
    flex-direction: row;
    gap: 16px;
    padding: 12px 0;
  }

  .hero__process-track {
    width: 4px;
    height: calc(100% - 48px);
    top: 24px;
    left: 23px;
    transform: none;
  }

  .hero__process-fill {
    width: 100%;
    height: 75%;
  }

  .hero__process-dot {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }

  .hero__process-label {
    text-align: left;
    max-width: none;
    font-size: 14px;
  }

  .hero__actions {
    flex-direction: column;
    width: 100%;
  }

  .hero__response-value {
    font-size: 18px;
  }
}
</style>
