<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const cases = [
  {
    tag: 'Разблокировка счёта',
    title: 'Банк заблокировал счёт по 115-ФЗ',
    problem: 'Компания не могла проводить платежи 3 недели. Контрагенты начали расторгать договоры.',
    solution: 'Подготовили пакет документов, обосновали экономический смысл операций, провели переговоры с комплаенсом банка.',
    result: 'Счёт разблокирован за 5 рабочих дней.',
    duration: '5 дней',
  },
  {
    tag: 'Налоговая проверка',
    title: 'Выездная проверка ФНС с доначислением 12 млн',
    problem: 'ФНС предъявила требования о доначислении НДС и налога на прибыль за 3 года.',
    solution: 'Провели аудит первичной документации, подготовили возражения на акт проверки, представляли интересы в налоговой.',
    result: 'Сумма доначислений снижена на 74%.',
    duration: '3 недели',
  },
  {
    tag: 'Восстановление учёта',
    title: 'Полное отсутствие учёта за 2 года',
    problem: 'Предыдущий бухгалтер не вёл учёт. Отчётность не сдавалась, первичка в хаосе.',
    solution: 'Восстановили бухгалтерский и налоговый учёт, сдали всю отчётность, рассчитали и минимизировали штрафы.',
    result: 'Учёт восстановлен, штрафы снижены на 60%.',
    duration: '6 недель',
  },
  {
    tag: 'Порог НДС',
    title: 'Переход на НДС без подготовки',
    problem: 'Компания на УСН превысила порог и обязана платить НДС, но процессы не настроены.',
    solution: 'Настроили учёт НДС, перевели документооборот, обучили сотрудников, подготовили первую декларацию.',
    result: 'Безболезненный переход без штрафов.',
    duration: '2 недели',
  },
  {
    tag: 'Утеря документов',
    title: 'Потеря первичных документов при смене офиса',
    problem: 'Часть бухгалтерских документов утрачена. ФНС запросила документы для камеральной проверки.',
    solution: 'Запросили дубликаты у контрагентов, восстановили реестры, подготовили пояснения для налоговой.',
    result: 'Проверка пройдена без доначислений.',
    duration: '4 недели',
  },
  {
    tag: 'Штрафы и пени',
    title: 'Накопленные штрафы за 1,5 года',
    problem: 'Несданная отчётность привела к блокировке счёта и начислению штрафов на 800 тыс. руб.',
    solution: 'Сдали просроченную отчётность, подали ходатайства о смягчении, провели сверку с ФНС.',
    result: 'Штрафы снижены до 180 тыс. Счёт разблокирован.',
    duration: '10 дней',
  },
]

const currentPage = ref(0)
const visibleCount = ref(3)
const autoplayDelay = 20000
let timer: ReturnType<typeof setInterval> | null = null
let pauseTimeout: ReturnType<typeof setTimeout> | null = null

const totalPages = computed(() => Math.ceil(cases.length / visibleCount.value))

function updateVisibleCount() {
  const w = window.innerWidth
  const newCount = w <= 600 ? 1 : w <= 960 ? 2 : 3
  if (newCount !== visibleCount.value) {
    visibleCount.value = newCount
    currentPage.value = Math.min(currentPage.value, totalPages.value - 1)
  }
}

function next() {
  currentPage.value = currentPage.value < totalPages.value - 1 ? currentPage.value + 1 : 0
}

function prev() {
  currentPage.value = currentPage.value > 0 ? currentPage.value - 1 : totalPages.value - 1
}

function startAutoplay() {
  stopAutoplay()
  timer = setInterval(next, autoplayDelay)
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function pauseAndResume() {
  stopAutoplay()
  if (pauseTimeout) clearTimeout(pauseTimeout)
  pauseTimeout = setTimeout(startAutoplay, 8000)
}

function manualPrev() {
  prev()
  pauseAndResume()
}

function manualNext() {
  next()
  pauseAndResume()
}

function goTo(page: number) {
  currentPage.value = page
  pauseAndResume()
}

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

const trackOffset = computed(() => {
  const offset = currentPage.value * visibleCount.value
  const cardPercent = 100 / visibleCount.value
  return `translateX(-${offset * cardPercent}%)`
})
</script>

<template>
  <section id="cases" class="cases">
    <div class="cases__container container">

      <div class="cases__header">
        <div class="cases__head">
          <h2 class="cases__title">Кейсы</h2>
          <p class="cases__subtitle">
            Реальные ситуации наших клиентов — от&nbsp;проблемы до&nbsp;результата.
          </p>
        </div>
        <div class="cases__nav">
          <button class="cases__nav-btn" @click="manualPrev">
            <el-icon :size="18"><ArrowLeft /></el-icon>
          </button>
          <button class="cases__nav-btn" @click="manualNext">
            <el-icon :size="18"><ArrowRight /></el-icon>
          </button>
        </div>
      </div>

      <div class="cases__viewport">
        <div class="cases__track" :style="{ transform: trackOffset }">
          <div class="cases__card" v-for="item in cases" :key="item.title">
            <div class="cases__card-tag">{{ item.tag }}</div>
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
              <div class="cases__card-result">
                <div class="cases__card-label">Результат</div>
                <p class="cases__card-result-text">{{ item.result }}</p>
              </div>
              <div class="cases__card-duration">{{ item.duration }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="cases__dots">
        <button
          v-for="i in totalPages"
          :key="i"
          class="cases__dot"
          :class="{ 'cases__dot--active': currentPage === i - 1 }"
          @click="goTo(i - 1)"
        ></button>
      </div>

    </div>
  </section>
</template>

<style scoped>
.cases {
  background-color: var(--color-bg-alt);
  padding: 96px 0;
}

/* --- Header --- */
.cases__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 40px;
}

.cases__title {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin-bottom: 8px;
}

.cases__subtitle {
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.cases__nav {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.cases__nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.cases__nav-btn:hover {
  border-color: #d0d5dd;
  background: var(--color-bg-alt);
}

/* --- Carousel --- */
.cases__viewport {
  overflow: hidden;
  margin-bottom: 28px;
}

.cases__track {
  display: flex;
  gap: 16px;
  transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.cases__card {
  min-width: calc((100% - 32px) / 3);
  max-width: calc((100% - 32px) / 3);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.cases__card:hover {
  border-color: #d0d5dd;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.cases__card-tag {
  display: inline-block;
  align-self: flex-start;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  background: rgba(192, 57, 43, 0.06);
  color: var(--color-accent);
}

.cases__card-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.35;
}

.cases__card-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cases__card-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
}

.cases__card-section p {
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.cases__card-footer {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--color-border-light);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
}

.cases__card-result {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cases__card-result-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.4;
}

.cases__card-duration {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-accent);
  white-space: nowrap;
  padding: 4px 10px;
  background: rgba(192, 57, 43, 0.06);
  border-radius: 6px;
}

/* --- Dots --- */
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
  background: var(--color-border);
  cursor: pointer;
  transition: background 0.2s, width 0.2s;
  padding: 0;
}

.cases__dot--active {
  background: var(--color-accent);
  width: 20px;
  border-radius: 4px;
}

/* --- Responsive --- */
@media (max-width: 960px) {
  .cases {
    padding: 72px 0;
  }

  .cases__title {
    font-size: 30px;
  }

  .cases__card {
    min-width: calc((100% - 16px) / 2);
    max-width: calc((100% - 16px) / 2);
  }
}

@media (max-width: 600px) {
  .cases {
    padding: 48px 0;
  }

  .cases__title {
    font-size: 26px;
  }

  .cases__subtitle {
    font-size: 14px;
  }

  .cases__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 28px;
  }

  .cases__card {
    min-width: 100%;
    max-width: 100%;
    padding: 22px 20px;
  }
}
</style>
