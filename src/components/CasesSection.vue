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
const autoplayDelay = 20000
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

onMounted(() => { updateVisibleCount(); window.addEventListener('resize', updateVisibleCount); startAutoplay() })
onUnmounted(() => { stopAutoplay(); if (pauseTimeout) clearTimeout(pauseTimeout); window.removeEventListener('resize', updateVisibleCount) })

const trackOffset = computed(() => {
  const offset = currentIndex.value * visibleCount.value
  const cardPercent = 100 / visibleCount.value
  return `translateX(-${offset * cardPercent}%)`
})
</script>

<template>
  <section id="cases" class="cases" ref="sectionRef">
    <div class="deco-gradient cases__deco-1"></div>
    <div class="deco-gradient cases__deco-2"></div>

    <div class="cases__container container">
      <div class="cases__header reveal">
        <div class="cases__head">
          <span class="section-label section-label--light">Практика</span>
          <h2 class="cases__title section-title">Кейсы</h2>
          <p class="cases__subtitle">
            Реальные ситуации наших клиентов — от&nbsp;проблемы до&nbsp;результата.
          </p>
        </div>
        <div class="cases__nav">
          <button class="cases__nav-btn" @click="manualPrev" aria-label="Назад">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 14L6 9l5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="cases__nav-btn" @click="manualNext" aria-label="Вперёд">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 4l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="cases__viewport reveal reveal-delay-1">
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

.cases__container { position: relative; z-index: 1; }

.cases__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 48px;
}

.cases__title { color: #fff; margin-bottom: 8px; }

.cases__subtitle {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
}

.cases__nav { display: flex; gap: 8px; flex-shrink: 0; }

.cases__nav-btn {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s;
  backdrop-filter: blur(8px);
}

.cases__nav-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
  color: #fff;
}

.cases__viewport { overflow: hidden; margin-bottom: 32px; }

.cases__track {
  display: flex;
  gap: 16px;
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.cases__card {
  min-width: calc((100% - 16px) / 2);
  max-width: calc((100% - 16px) / 2);
  background: var(--color-bg-dark-card);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex-shrink: 0;
  transition: all 0.3s;
}

.cases__card:hover {
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
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
  background: rgba(192, 57, 43, 0.15);
  color: #e74c3c;
}

.cases__card-duration {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-accent);
  padding: 4px 12px;
  background: rgba(192, 57, 43, 0.08);
  border-radius: 6px;
}

.cases__card-title {
  font-size: 17px;
  font-weight: 700;
  color: #fff;
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
  color: rgba(255, 255, 255, 0.35);
}

.cases__card-section p {
  font-size: 14px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.6);
}

.cases__card-footer {
  margin-top: auto;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
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

.cases__dots { display: flex; justify-content: center; gap: 8px; }

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
  .cases { padding: 56px 0; }
  .cases__title { font-size: 26px; }
  .cases__header { flex-direction: column; align-items: flex-start; gap: 16px; margin-bottom: 32px; }
  .cases__card { min-width: 100%; max-width: 100%; padding: 24px 20px; }
}
</style>
