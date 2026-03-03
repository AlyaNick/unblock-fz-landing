<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)
const dismissed = ref(false)

function onScroll() {
  if (dismissed.value) return
  visible.value = window.scrollY > 600
}

function dismiss() {
  dismissed.value = true
  visible.value = false
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="slide">
    <aside v-if="visible" class="important">
      <button class="important__close" @click="dismiss" aria-label="Закрыть">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>

      <div class="important__header">
        <div class="important__icon-wrap">
          <span class="important__icon">&#9888;</span>
        </div>
        <div class="important__title">Важно</div>
      </div>

      <p class="important__text">Самостоятельный ответ банку часто:</p>

      <ul class="important__list">
        <li>усиливает подозрения</li>
        <li>фиксирует неудачную формулировку</li>
        <li>снижает шансы на положительное решение</li>
      </ul>

      <div class="important__footer">
        <p>Банк оценивает структуру аргументации и&nbsp;доказательства.</p>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.important {
  position: fixed;
  right: 24px;
  bottom: 88px;
  z-index: 80;
  width: 300px;
  padding: 0;
  background: var(--color-bg-dark);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-lg);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  color: #fff;
}

.important__close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.2s;
}

.important__close:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.important__header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px 14px;
}

.important__icon-wrap {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(230, 126, 34, 0.15);
  border-radius: 10px;
}

.important__icon {
  font-size: 18px;
  color: #e67e22;
}

.important__title {
  font-size: 16px;
  font-weight: 700;
}

.important__text {
  font-size: 13px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.6);
  padding: 0 24px 12px;
}

.important__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 24px 18px;
}

.important__list li {
  position: relative;
  padding-left: 18px;
  font-size: 13px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 500;
}

.important__list li::before {
  content: '×';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: 700;
  font-size: 16px;
  line-height: 1.2;
}

.important__footer {
  padding: 14px 24px;
  background: rgba(255, 255, 255, 0.03);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.important__footer p {
  font-size: 12px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.4);
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(24px) translateY(8px);
}

@media (max-width: 768px) {
  .important { right: 12px; bottom: 72px; width: 280px; }
}

@media (max-width: 480px) {
  .important { right: 8px; left: 8px; bottom: 64px; width: auto; }
}
</style>
