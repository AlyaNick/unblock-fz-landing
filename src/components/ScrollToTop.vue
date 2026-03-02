<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 400
}

function scrollUp() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="fade">
    <button v-show="visible" class="totop" @click="scrollUp" aria-label="Наверх">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 14V4" />
        <path d="M4 9l5-5 5 5" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.totop {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 90;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  border: 1px solid var(--color-border-dark);
  background: var(--color-bg-dark);
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.25s cubic-bezier(.4,0,.2,1);
}

.totop:hover {
  background: var(--color-bg-dark-card-hover);
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 6px 28px rgba(0, 0, 0, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 600px) {
  .totop { bottom: 20px; right: 20px; width: 42px; height: 42px; }
}
</style>
