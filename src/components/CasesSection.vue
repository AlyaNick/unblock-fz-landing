<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useReveal } from '../composables/useReveal'

const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)

const cases = [
  {
    tag: 'Разблокировка счёта',
    title: 'Блокировка по 115-ФЗ — транзитные операции',
    problem: 'Банк заблокировал расчётный счёт, указав на транзитный характер операций. Компания не могла проводить платежи контрагентам.',
    solution: 'Подготовили структурированное пояснение с обоснованием экономического смысла каждой операции, сформировали пакет первичных документов.',
    result: 'Счёт разблокирован за 7 рабочих дней.',
    duration: '7 дней',
  },
  {
    tag: 'Отказ в ДБО',
    title: 'Отключение дистанционного обслуживания',
    problem: 'Банк отключил ДБО и потребовал предоставить документы по всем операциям за 6 месяцев.',
    solution: 'Провели правовой аудит, систематизировали документацию, подготовили правовую позицию для комплаенс-подразделения.',
    result: 'ДБО восстановлено. Претензии банка сняты.',
    duration: '10 дней',
  },
  {
    tag: 'Перечень риска',
    title: 'Включение в перечень повышенного риска',
    problem: 'Компания включена в перечень клиентов повышенного риска, другие банки отказывают в открытии счёта.',
    solution: 'Сформировали доказательную базу, обосновали деловую цель операций, провели переговоры с межведомственной комиссией.',
    result: 'Исключение из перечня. Счёт в новом банке открыт.',
    duration: '3 недели',
  },
  {
    tag: 'Требование закрыть счёт',
    title: 'Принудительное закрытие расчётного счёта',
    problem: 'Банк уведомил о расторжении договора РКО. Компании предложено вывести средства в течение 30 дней.',
    solution: 'Подготовили досудебную претензию, зафиксировали нарушения процедуры со стороны банка, скорректировали договорную базу.',
    result: 'Счёт сохранён. Риск повторной блокировки снижен.',
    duration: '2 недели',
  },
]

const currentIndex = ref(0)
const visibleCount = ref(2)
const viewportRef = ref<HTMLElement | null>(null)
const autoplayDelay = 20000
const gap = 16
let timer: ReturnType<typeof setInterval> | null = null
let pauseTimeout: ReturnType<typeof setTimeout> | null = null
const totalPages = computed(() => Math.ceil(cases.length / visibleCount.value))

function updateVisibleCount() {
  const w = window.innerWidth
  const newCount = w <= 700 ? 1 : 2
  if (newCount !== visibleCount.value) {
    visibleCount.value = newCount
    currentIndex.value = Math.min(currentIndex.value, totalPages.value - 1)
  }
}

function next() { currentIndex.value = currentIndex.value < totalPages.value - 1 ? currentIndex.value + 1 : 0 }
function prev() { currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : totalPages.value - 1 }
function startAutoplay() { stopAutoplay(); timer = setInterval(next, autoplayDelay) }
function stopAutoplay() { if (timer) { clearInterval(timer); timer = null } }
function pauseAndResume() { stopAutoplay(); if (pauseTimeout) clearTimeout(pauseTimeout); pauseTimeout = setTimeout(startAutoplay, 8000) }
function manualPrev() { prev(); pauseAndResume() }
function manualNext() { next(); pauseAndResume() }
function goTo(page: number) { currentIndex.value = page; pauseAndResume() }

const trackOffset = computed(() => {
  const el = viewportRef.value
  if (!el) return 'translateX(0)'
  const w = el.clientWidth
  const n = visibleCount.value
  const cardWidth = (w - gap * (n - 1)) / n
  const shift = currentIndex.value * (cardWidth + gap)
  return `translateX(-${shift}px)`
})

onMounted(() => {
  updateVisibleCount()
  window.addEventListener('resize', updateVisibleCount)
  startAutoplay()
})
onUnmounted(() => {
  stopAutoplay()
  if (pauseTimeout) clearTimeout(pauseTimeout)
  window.removeEventListener('resize', updateVisibleCount)
})
</script>

<template>
  <section id="cases" class="cases" ref="sectionRef">
    <div class="deco-gradient cases__deco-1"></div>
    <div class="deco-gradient cases__deco-2"></div>

    <div class="cases__container container">
      <div class="cases__head reveal">
        <span class="section-label section-label--light">Практика</span>
        <h2 class="cases__title section-title">Кейсы</h2>
        <p class="cases__subtitle">
          Реальные ситуации наших клиентов — от&nbsp;проблемы до&nbsp;результата.
        </p>
      </div>

      <div class="cases__carousel reveal">
        <button
          class="cases__arrow cases__arrow--left"
          @click="manualPrev"
          aria-label="Назад"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div ref="viewportRef" class="cases__viewport">
          <div class="cases__track" :style="{ transform: trackOffset }">
            <div class="cases__card" v-for="item in cases" :key="item.title">
              <div class="cases__card-top">
                <div class="cases__card-tag">{{ item.tag }}</div>
                <div class="cases__card-duration">{{ item.duration }}</div>
              </div>
              <h3 class="cases__card-title">{{ item.title }}</h3>

              <div class="cases__card-section">
                <div class="cases__card-label">Проблема</div>
                <p>{{ item.problem }}</p>
              </div>

              <div class="cases__card-section">
                <div class="cases__card-label">Решение</div>
                <p>{{ item.solution }}</p>
              </div>

              <div class="cases__card-footer">
                <div class="cases__card-label">Результат</div>
                <p class="cases__card-result-text">{{ item.result }}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          class="cases__arrow cases__arrow--right"
          @click="manualNext"
          aria-label="Вперёд"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="cases__dots reveal">
        <button
          v-for="i in totalPages"
          :key="i"
          class="cases__dot"
          :class="{ 'cases__dot--active': currentIndex === i - 1 }"
          @click="goTo(i - 1)"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cases {
  background: var(--gradient-dark);
  padding: 96px 0;
  position: relative;
  overflow: hidden;
  color: #fff;
}

.cases__deco-1 {
  width: 400px;
  height: 400px;
  background: var(--color-accent);
  top: -150px;
  left: -100px;
  opacity: 0.06;
}

.cases__deco-2 {
  width: 350px;
  height: 350px;
  background: var(--color-navy);
  bottom: -100px;
  right: -100px;
  opacity: 0.1;
}

.cases__container {
  position: relative;
  z-index: 1;
}

.cases__head {
  text-align: left;
  margin-bottom: 48px;
}

.cases__title {
  color: #fff;
  margin-bottom: 8px;
}

.cases__subtitle {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
}

.cases__carousel {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
}

.cases__arrow {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s;
}

.cases__arrow:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.35);
  color: #fff;
}

.cases__viewport {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  padding: 4px 0;
}

.cases__track {
  display: flex;
  gap: 16px;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  padding: 0 2px;
}

.cases__card {
  flex: 0 0 calc((100% - 16px) / 2);
  width: calc((100% - 16px) / 2);
  max-width: calc((100% - 16px) / 2);
  background: #fff;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: all 0.3s;
  color: var(--color-text);
  overflow: visible;
  box-sizing: border-box;
}

.cases__card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.cases__card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cases__card-tag {
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  background: var(--color-accent-light);
  color: var(--color-accent);
}

.cases__card-duration {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-navy);
  padding: 4px 12px;
  background: var(--color-navy-light);
  border-radius: 6px;
}

.cases__card-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.35;
}

.cases__card-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cases__card-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.cases__card-section p {
  font-size: 14px;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.cases__card-footer {
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid var(--color-border-light);
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cases__card-result-text {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-green);
  line-height: 1.4;
}

.cases__dots {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.cases__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}

.cases__dot--active {
  background: var(--color-accent);
  width: 24px;
  border-radius: 4px;
  box-shadow: 0 0 12px var(--color-accent-glow);
}

@media (max-width: 700px) {
  .cases {
    padding: 56px 0;
  }

  .cases__title {
    font-size: 26px;
  }

  .cases__head {
    margin-bottom: 32px;
  }

  .cases__carousel {
    gap: 12px;
  }

  .cases__arrow {
    width: 40px;
    height: 40px;
  }

  .cases__card {
    min-width: 100%;
    max-width: 100%;
    padding: 24px 20px;
  }
}
</style>
