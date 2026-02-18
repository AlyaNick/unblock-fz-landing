<script setup lang="ts">
import {
  Connection,
  Aim,
  CircleCheck,
  List,
  Hide,
} from '@element-plus/icons-vue'

const advantages = [
  {
    icon: Connection,
    title: 'Комплексный подход',
    desc: 'Объединяем бухгалтерскую экспертизу и правовой анализ, чтобы учитывать не только отчётность, но и возможные последствия для собственников и руководителей.',
  },
  {
    icon: Aim,
    title: 'Стратегическое мышление',
    desc: 'Не ограничиваемся устранением симптомов. Формируем позицию и выстраиваем действия с учётом дальнейшего развития ситуации.',
  },
  {
    icon: CircleCheck,
    title: 'Контроль рисков',
    desc: 'Каждый этап работы сопровождается оценкой налоговых и правовых последствий.',
  },
  {
    icon: List,
    title: 'Регламентированный процесс',
    desc: 'Чёткий порядок взаимодействия, поэтапная реализация и прозрачная структура проекта.',
  },
  {
    icon: Hide,
    title: 'Конфиденциальность и этика',
    desc: 'Информация о финансовом состоянии компании защищена и не выходит за рамки профессионального взаимодействия.',
  },
]

const stats = [
  { value: '24/7', label: 'Работаем без выходных,\n364 дня в году' },
  { value: '50+', label: 'Специалистов со всей\nтерритории страны' },
  { value: '15', label: 'Минут — время\nпервичной реакции' },
]
</script>

<template>
  <section id="trust" class="trust">
    <div class="trust__container container">

      <div class="trust__head">
        <h2 class="trust__title">Почему нам доверяют сложные ситуации</h2>
        <p class="trust__subtitle">
          Экстренные бухгалтерские вопросы требуют точности, системности
          и&nbsp;взвешенных решений. Мы работаем с&nbsp;кейсами, где цена
          ошибки особенно высока.
        </p>
      </div>

      <div class="trust__body">
        <div class="trust__advantages">
          <div class="trust__item" v-for="item in advantages" :key="item.title">
            <div class="trust__item-icon">
              <el-icon :size="20"><component :is="item.icon" /></el-icon>
            </div>
            <div class="trust__item-content">
              <h3 class="trust__item-title">{{ item.title }}</h3>
              <p class="trust__item-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <div class="trust__stats">
          <div class="trust__stat" v-for="stat in stats" :key="stat.value">
            <div class="trust__stat-value">{{ stat.value }}</div>
            <div class="trust__stat-label">{{ stat.label }}</div>
          </div>
          <div class="trust__stat-note">
            Мы собрали более 50&nbsp;специалистов со&nbsp;всей территории страны —
            и&nbsp;этот грандиозный опыт мы предоставляем своим клиентам.
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.trust {
  background-color: var(--color-bg-alt);
  padding: 96px 0;
}

/* --- Head --- */
.trust__head {
  text-align: center;
  margin-bottom: 64px;
}

.trust__title {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin-bottom: 16px;
}

.trust__subtitle {
  font-size: 17px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* --- Body grid --- */
.trust__body {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 48px;
  align-items: start;
}

/* --- Advantages --- */
.trust__advantages {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.trust__item {
  display: flex;
  gap: 18px;
  padding: 24px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.trust__item:hover {
  border-color: #d0d5dd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.trust__item-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  flex-shrink: 0;
}

.trust__item-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.trust__item-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.3;
}

.trust__item-desc {
  font-size: 13px;
  line-height: 1.65;
  color: var(--color-text-muted);
}

/* --- Stats sidebar --- */
.trust__stats {
  position: sticky;
  top: 32px;
  display: flex;
  flex-direction: column;
  gap: 0;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
}

.trust__stat {
  padding: 28px 24px;
  text-align: center;
  border-bottom: 1px solid var(--color-border-light);
}

.trust__stat:last-of-type {
  border-bottom: 1px solid var(--color-border-light);
}

.trust__stat-value {
  font-size: 36px;
  font-weight: 800;
  color: var(--color-accent);
  line-height: 1;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.trust__stat-label {
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-muted);
  white-space: pre-line;
}

.trust__stat-note {
  padding: 20px 24px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  background: var(--color-bg-alt);
}

/* --- Responsive --- */
@media (max-width: 960px) {
  .trust {
    padding: 72px 0;
  }

  .trust__title {
    font-size: 30px;
  }

  .trust__body {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .trust__stats {
    position: static;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .trust__stat {
    flex: 1;
    min-width: 140px;
    border-bottom: none;
    border-right: 1px solid var(--color-border-light);
  }

  .trust__stat:last-of-type {
    border-right: none;
    border-bottom: none;
  }

  .trust__stat-note {
    border-top: 1px solid var(--color-border-light);
    flex-basis: 100%;
  }
}

@media (max-width: 600px) {
  .trust {
    padding: 48px 0;
  }

  .trust__title {
    font-size: 26px;
  }

  .trust__subtitle {
    font-size: 15px;
  }

  .trust__item {
    padding: 20px;
  }

  .trust__stats {
    flex-direction: column;
  }

  .trust__stat {
    border-right: none;
    border-bottom: 1px solid var(--color-border-light);
    padding: 22px 20px;
  }

  .trust__stat-value {
    font-size: 30px;
  }
}
</style>
