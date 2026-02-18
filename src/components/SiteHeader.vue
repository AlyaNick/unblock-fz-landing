<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)

const links = [
  { href: '#hero', label: 'Главная' },
  { href: '#when', label: 'Ситуации' },
  { href: '#how', label: 'Как работаем' },
  { href: '#trust', label: 'Почему мы' },
  { href: '#cases', label: 'Кейсы' },
  { href: '#contact', label: 'Заявка' },
]

function onScroll() {
  scrolled.value = window.scrollY > 20
}

function navigate(href: string) {
  mobileOpen.value = false
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': scrolled }">
    <div class="header__inner container">
      <a class="header__logo" href="#hero" @click.prevent="navigate('#hero')">
        Экстренная бухгалтерия
      </a>

      <nav class="header__nav" :class="{ 'header__nav--open': mobileOpen }">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          class="header__link"
          @click.prevent="navigate(link.href)"
        >
          {{ link.label }}
        </a>
      </nav>

      <button
        class="header__burger"
        :class="{ 'header__burger--open': mobileOpen }"
        @click="mobileOpen = !mobileOpen"
        aria-label="Меню"
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.25s, box-shadow 0.25s;
}

.header--scrolled {
  border-bottom-color: var(--color-border);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.04);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.header__logo {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  white-space: nowrap;
  text-decoration: none;
}

.header__nav {
  display: flex;
  gap: 6px;
}

.header__link {
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-secondary);
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
  text-decoration: none;
}

.header__link:hover {
  color: var(--color-text);
  background: var(--color-bg-alt);
}

/* Burger */
.header__burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.header__burger span {
  display: block;
  height: 2px;
  background: var(--color-text);
  border-radius: 1px;
  transition: transform 0.25s, opacity 0.25s;
}

.header__burger--open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.header__burger--open span:nth-child(2) {
  opacity: 0;
}

.header__burger--open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .header__burger {
    display: flex;
  }

  .header__nav {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.97);
    backdrop-filter: blur(12px);
    flex-direction: column;
    padding: 8px 16px 16px;
    border-bottom: 1px solid var(--color-border);
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.3s, opacity 0.3s;
  }

  .header__nav--open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .header__link {
    padding: 10px 12px;
    font-size: 14px;
  }
}
</style>
