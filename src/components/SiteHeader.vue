<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)

const links = [
  { href: '#banks', label: 'Банки' },
  { href: '#reasons', label: 'Причины' },
  { href: '#practice', label: 'Практика' },
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
        <span class="header__logo-icon">&#9878;</span>
        115-ФЗ Защита
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
        <a href="#contact" class="header__cta" @click.prevent="navigate('#contact')">
          Консультация
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
  background: rgba(12, 18, 32, 0.6);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid transparent;
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
}

.header--scrolled {
  background: rgba(12, 18, 32, 0.92);
  border-bottom-color: rgba(255, 255, 255, 0.06);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.header__logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
  text-decoration: none;
}

.header__logo-icon {
  font-size: 18px;
  color: var(--color-accent);
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.header__link {
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
  text-decoration: none;
}

.header__link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.06);
}

.header__cta {
  margin-left: 8px;
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: var(--gradient-accent);
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.25s;
  box-shadow: 0 2px 8px var(--color-accent-glow);
}

.header__cta:hover {
  box-shadow: 0 4px 16px rgba(192, 57, 43, 0.4);
  transform: translateY(-1px);
}

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
  background: #fff;
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
  .header__burger { display: flex; }

  .header__nav {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: rgba(12, 18, 32, 0.97);
    backdrop-filter: blur(16px);
    flex-direction: column;
    padding: 12px 16px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.3s, opacity 0.3s;
    align-items: stretch;
  }

  .header__nav--open {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .header__link {
    padding: 12px 14px;
    font-size: 14px;
  }

  .header__cta {
    margin-left: 0;
    margin-top: 8px;
    text-align: center;
    padding: 12px 20px;
  }
}
</style>
