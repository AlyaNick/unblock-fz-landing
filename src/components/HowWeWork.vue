<script setup lang="ts">
import {
  PhoneFilled,
  Lock,
  Search,
  List,
  SetUp,
  CircleCheckFilled,
} from '@element-plus/icons-vue'

const stages = [
  {
    icon: PhoneFilled,
    title: 'Первичный звонок',
    desc: 'Бесплатная консультация 15 минут — оцениваем ситуацию и определяем срочность.',
    tag: 'Бесплатно',
  },
  {
    icon: Lock,
    title: 'Подписание NDA',
    desc: 'Заключаем соглашение о конфиденциальности — ваши данные под защитой.',
    tag: null,
  },
  {
    icon: Search,
    title: 'Платная диагностика',
    desc: 'Глубокий анализ документов, учёта и текущего состояния дел с налоговой и банком.',
    tag: null,
  },
  {
    icon: List,
    title: 'План действий и смета',
    desc: 'Формируем пошаговый план с прозрачной стоимостью каждого этапа.',
    tag: null,
  },
  {
    icon: SetUp,
    title: 'Реализация',
    desc: 'Выполняем работу: взаимодействуем с ФНС, банком, восстанавливаем учёт.',
    tag: null,
  },
  {
    icon: CircleCheckFilled,
    title: 'Отчёт о работе',
    desc: 'Передаём полный отчёт с результатами и рекомендациями на будущее.',
    tag: 'Результат',
  },
]
</script>

<template>
  <section id="how" class="how">
    <div class="how__container container">

      <div class="how__head">
        <h2 class="how__title">Как мы работаем</h2>
        <p class="how__subtitle">
          Прозрачный процесс из&nbsp;шести этапов — от&nbsp;первого звонка
          до&nbsp;финального отчёта. Вы всегда знаете, что происходит
          и&nbsp;сколько это стоит.
        </p>
      </div>

      <div class="how__timeline">
        <div class="how__line"></div>

        <div
          class="how__stage"
          v-for="(stage, i) in stages"
          :key="i"
          :class="{ 'how__stage--accent': i === 0 || i === stages.length - 1 }"
        >
          <div class="how__stage-marker">
            <div class="how__stage-num">{{ i + 1 }}</div>
            <div class="how__stage-connector" v-if="i < stages.length - 1"></div>
          </div>

          <div class="how__stage-card">
            <div class="how__stage-icon">
              <el-icon :size="20"><component :is="stage.icon" /></el-icon>
            </div>
            <div class="how__stage-content">
              <div class="how__stage-header">
                <h3 class="how__stage-title">{{ stage.title }}</h3>
                <span v-if="stage.tag" class="how__stage-tag">{{ stage.tag }}</span>
              </div>
              <p class="how__stage-desc">{{ stage.desc }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.how {
  background-color: var(--color-bg);
  padding: 96px 0;
}

/* --- Head --- */
.how__head {
  text-align: center;
  margin-bottom: 64px;
}

.how__title {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin-bottom: 16px;
}

.how__subtitle {
  font-size: 17px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 560px;
  margin: 0 auto;
}

/* --- Timeline --- */
.how__timeline {
  max-width: 680px;
  margin: 0 auto;
  position: relative;
}

.how__line {
  position: absolute;
  left: 19px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--color-border);
}

.how__stage {
  display: flex;
  gap: 24px;
  position: relative;
}

.how__stage + .how__stage {
  margin-top: 12px;
}

/* --- Marker --- */
.how__stage-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  z-index: 1;
}

.how__stage-num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.how__stage--accent .how__stage-num {
  border-color: var(--color-accent);
  color: var(--color-accent);
  background: #fef2f0;
}

.how__stage-connector {
  width: 2px;
  flex: 1;
  min-height: 12px;
  background: transparent;
}

/* --- Card --- */
.how__stage-card {
  display: flex;
  gap: 16px;
  padding: 22px 24px;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  flex: 1;
  margin-bottom: 0;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.how__stage-card:hover {
  border-color: #d0d5dd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.how__stage--accent .how__stage-card {
  border-color: rgba(192, 57, 43, 0.2);
  background: #fefbfa;
}

.how__stage-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  flex-shrink: 0;
}

.how__stage--accent .how__stage-icon {
  color: var(--color-accent);
  border-color: rgba(192, 57, 43, 0.2);
}

.how__stage-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.how__stage-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.how__stage-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.3;
}

.how__stage-tag {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.02em;
  background: rgba(192, 57, 43, 0.08);
  color: var(--color-accent);
  white-space: nowrap;
}

.how__stage-desc {
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-text-muted);
}

/* --- Responsive --- */
@media (max-width: 768px) {
  .how {
    padding: 72px 0;
  }

  .how__title {
    font-size: 30px;
  }

  .how__head {
    margin-bottom: 48px;
  }

  .how__stage-card {
    padding: 18px 20px;
  }
}

@media (max-width: 480px) {
  .how {
    padding: 48px 0;
  }

  .how__title {
    font-size: 26px;
  }

  .how__subtitle {
    font-size: 15px;
  }

  .how__line {
    left: 15px;
  }

  .how__stage-num {
    width: 32px;
    height: 32px;
    font-size: 12px;
  }

  .how__stage {
    gap: 16px;
  }

  .how__stage-card {
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }

  .how__stage-icon {
    width: 36px;
    height: 36px;
  }
}
</style>
