<script setup lang="ts">
import { CloseBold } from '@element-plus/icons-vue'

const items = [
  {
    num: '01',
    title: 'Если вы ищете самый дешёвый вариант',
    desc: 'Наша работа — это экспертиза, ответственность и результат. Стоимость соответствует уровню специалистов.',
  },
  {
    num: '02',
    title: 'Если вы хотите скрыть незаконные операции',
    desc: 'Мы работаем строго в правовом поле. Наша задача — защитить бизнес, а не помочь нарушить закон.',
  },
  {
    num: '03',
    title: 'Если вы не готовы предоставлять документы',
    desc: 'Без полной информации невозможно выстроить защиту. Только открытое взаимодействие.',
  },
]
</script>

<template>
  <section class="notfor">
    <div class="notfor__container container">

      <div class="notfor__inner">
        <div class="notfor__head">
          <div class="notfor__label">Важно</div>
          <h2 class="notfor__title">Кому мы не подходим</h2>
          <p class="notfor__subtitle">
            Мы ценим время — и&nbsp;ваше, и&nbsp;своё. Прозрачность
            на&nbsp;старте позволяет избежать разочарований.
          </p>
        </div>

        <div class="notfor__list">
          <div class="notfor__item" v-for="item in items" :key="item.num">
            <div class="notfor__item-num">{{ item.num }}</div>
            <div class="notfor__item-body">
              <div class="notfor__item-title">
                <el-icon :size="13" class="notfor__item-x"><CloseBold /></el-icon>
                {{ item.title }}
              </div>
              <p class="notfor__item-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.notfor {
  background-color: var(--color-bg);
  padding: 96px 0;
}

.notfor__inner {
  max-width: 800px;
  margin: 0 auto;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 48px 52px;
}

.notfor__head {
  margin-bottom: 36px;
}

.notfor__label {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  margin-bottom: 12px;
}

.notfor__title {
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin-bottom: 10px;
}

.notfor__subtitle {
  font-size: 15px;
  line-height: 1.65;
  color: var(--color-text-secondary);
}

.notfor__list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.notfor__item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px 0;
  border-top: 1px solid var(--color-border);
  transition: padding-left 0.25s;
}

.notfor__item:hover {
  padding-left: 6px;
}

.notfor__item:last-child {
  padding-bottom: 0;
}

.notfor__item-num {
  font-size: 24px;
  font-weight: 800;
  color: var(--color-border);
  line-height: 1;
  min-width: 36px;
  padding-top: 2px;
  transition: color 0.2s;
}

.notfor__item:hover .notfor__item-num {
  color: var(--color-accent);
}

.notfor__item-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.notfor__item-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 8px;
}

.notfor__item-x {
  color: var(--color-accent);
  flex-shrink: 0;
}

.notfor__item-desc {
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-text-muted);
  padding-left: 21px;
}

@media (max-width: 860px) {
  .notfor {
    padding: 72px 0;
  }

  .notfor__inner {
    padding: 36px 32px;
  }

  .notfor__title {
    font-size: 26px;
  }
}

@media (max-width: 480px) {
  .notfor {
    padding: 48px 0;
  }

  .notfor__inner {
    padding: 28px 20px;
    border-radius: 12px;
  }

  .notfor__title {
    font-size: 22px;
  }

  .notfor__subtitle {
    font-size: 14px;
  }

  .notfor__item {
    gap: 14px;
    padding: 16px 0;
  }

  .notfor__item-num {
    font-size: 20px;
    min-width: 28px;
  }

  .notfor__item-desc {
    padding-left: 21px;
  }
}
</style>
