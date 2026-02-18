<script setup lang="ts">
import {
  Lock,
  Document,
  Timer,
  Warning,
  FolderDelete,
  Money,
  DataAnalysis,
  Coin,
} from '@element-plus/icons-vue'

const items = [
  { icon: Lock, title: 'Счёт заблокирован', color: '#e74c3c' },
  { icon: Document, title: 'Запрос от ФНС', color: '#e67e22' },
  { icon: Timer, title: 'Пропущена отчётность', color: '#f39c12' },
  { icon: Warning, title: 'Ошибки бухгалтера', color: '#9b59b6' },
  { icon: FolderDelete, title: 'Утеря документов', color: '#3498db' },
  { icon: Money, title: 'Штрафы и пени', color: '#e74c3c' },
  { icon: DataAnalysis, title: 'Неясные финансы', color: '#1abc9c' },
  { icon: Coin, title: 'Порог НДС', color: '#e67e22' },
]
</script>

<template>
  <section id="when" class="when">
    <div class="when__container container">

      <div class="when__head">
        <h2 class="when__title">Когда к нам обращаются</h2>
        <p class="when__subtitle">
          Экстренные ситуации, когда промедление грозит штрафами,
          блокировкой счетов или потерей контроля над&nbsp;финансами.
        </p>
      </div>

      <div class="when__grid">
        <div
          class="when__chip"
          v-for="item in items"
          :key="item.title"
          :style="{ '--chip-color': item.color }"
        >
          <div class="when__chip-icon">
            <el-icon :size="18"><component :is="item.icon" /></el-icon>
          </div>
          <span class="when__chip-text">{{ item.title }}</span>
        </div>
      </div>

      <div class="when__footer">
        Столкнулись хотя бы с&nbsp;одной проблемой? — мы подключаемся
        <strong>немедленно</strong>.
      </div>

    </div>
  </section>
</template>

<style scoped>
.when {
  background-color: var(--color-bg-alt);
  padding: 80px 0;
}

.when__head {
  text-align: center;
  margin-bottom: 40px;
}

.when__title {
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin-bottom: 12px;
}

.when__subtitle {
  font-size: 16px;
  line-height: 1.65;
  color: var(--color-text-secondary);
  max-width: 520px;
  margin: 0 auto;
}

.when__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
}

.when__chip {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 48px;
  cursor: default;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
}

.when__chip:hover {
  border-color: var(--chip-color);
  box-shadow: 0 2px 14px color-mix(in srgb, var(--chip-color) 18%, transparent);
  transform: translateY(-2px);
}

.when__chip-icon {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: color-mix(in srgb, var(--chip-color) 10%, transparent);
  color: var(--chip-color);
  flex-shrink: 0;
  transition: background 0.2s;
}

.when__chip:hover .when__chip-icon {
  background: color-mix(in srgb, var(--chip-color) 16%, transparent);
}

.when__chip-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
}

.when__footer {
  text-align: center;
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

.when__footer strong {
  color: var(--color-accent);
  font-weight: 700;
}

@media (max-width: 860px) {
  .when {
    padding: 64px 0;
  }

  .when__title {
    font-size: 30px;
  }
}

@media (max-width: 600px) {
  .when {
    padding: 48px 0;
  }

  .when__title {
    font-size: 26px;
  }

  .when__subtitle {
    font-size: 14px;
  }

  .when__grid {
    gap: 8px;
  }

  .when__chip {
    padding: 10px 16px;
  }

  .when__chip-icon {
    width: 30px;
    height: 30px;
  }

  .when__chip-text {
    font-size: 13px;
  }

  .when__footer {
    font-size: 14px;
  }
}
</style>
