<script setup lang="ts">
import { ref } from 'vue'
import { useReveal } from '../composables/useReveal'
import sberLogo from '../assets/bankicons/sberlogo.svg'
import vtbLogo from '../assets/bankicons/vtblogo.svg'
import alfaLogo from '../assets/bankicons/alfalogo.svg'
import tinkoffLogo from '../assets/bankicons/tinkoff.svg'
import tochkaLogo from '../assets/bankicons/tochkabanklogo.svg'
import rshbLogo from '../assets/bankicons/rshblogo.svg'
import psbLogo from '../assets/bankicons/psblogo.svg'
import sovcomLogo from '../assets/bankicons/sovcombanklogo.svg'

const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)

const banks = [
  { name: 'Сбербанк', short: 'СБ', logo: sberLogo, logoScale: 1.15 },
  { name: 'ВТБ', short: 'ВТБ', logo: vtbLogo, logoScale: 1.2 },
  { name: 'Альфа-Банк', short: 'АБ', logo: alfaLogo, logoScale: 1.2 },
  { name: 'Тинькофф Банк', short: 'Т', logo: tinkoffLogo },
  { name: 'Точка банк', short: 'ТБ', logo: tochkaLogo, logoScale: 1.15 },
  { name: 'Модуль банк', short: 'МБ', logo: null as string | null },
  { name: 'Бланк банк', short: 'ББ', logo: null as string | null },
  { name: 'Россельхоз банк', short: 'РХ', logo: rshbLogo, logoScale: 1.2 },
  { name: 'Промсвязьбанк', short: 'ПСБ', logo: psbLogo, logoScale: 1.15 },
  { name: 'Совкомбанк', short: 'СК', logo: sovcomLogo, logoScale: 1.2 },
]

const logoErrors = ref<Set<string>>(new Set())

function onLogoError(name: string) {
  logoErrors.value.add(name)
}
</script>

<template>
  <section id="banks" class="banks" ref="sectionRef">
    <div class="deco-gradient banks__deco-1"></div>
    <div class="deco-gradient banks__deco-2"></div>

    <div class="banks__container container">
      <div class="banks__head reveal">
        <span class="section-label section-label--light">Опыт работы</span>
        <h2 class="banks__title section-title">
          Работаем с&nbsp;комплаенс-подразделениями
        </h2>
        <p class="banks__subtitle">
          Понимаем внутреннюю методологию оценки операций
          и&nbsp;риск-профиля клиента.
        </p>
      </div>

      <div class="banks__grid">
        <div
          class="banks__card reveal-scale"
          :class="'reveal-delay-' + Math.min(i + 1, 5)"
          v-for="(bank, i) in banks"
          :key="bank.name"
        >
          <div v-if="bank.logo && !logoErrors.has(bank.name)" class="banks__logo-wrap">
            <img
              :src="bank.logo"
              :alt="bank.name"
              class="banks__logo"
              :class="{ 'banks__logo--light': bank.logoLight }"
              :style="bank.logoScale ? { transform: `scale(${bank.logoScale})` } : undefined"
              loading="lazy"
              @error="onLogoError(bank.name)"
            />
          </div>
          <div v-else class="banks__logo-placeholder">
            {{ bank.short }}
          </div>
          <span class="banks__name">{{ bank.name }}</span>
        </div>
      </div>

      <p class="banks__extra reveal">
        Региональные банки и&nbsp;другие кредитные организации — работаем по&nbsp;всей России.
      </p>
    </div>
  </section>
</template>

<style scoped>
.banks {
  background: var(--gradient-dark);
  padding: 96px 0;
  position: relative;
  overflow: hidden;
  color: #fff;
}

.banks__deco-1 {
  width: 500px;
  height: 500px;
  background: var(--color-navy);
  top: -200px;
  left: 50%;
  opacity: 0.15;
}

.banks__deco-2 {
  width: 300px;
  height: 300px;
  background: var(--color-accent);
  bottom: -100px;
  right: -50px;
  opacity: 0.06;
}

.banks__container {
  position: relative;
  z-index: 1;
}

.banks__head {
  text-align: left;
  margin-bottom: 56px;
}

.banks__title {
  color: #fff;
  margin-bottom: 16px;
}

.banks__subtitle {
  font-size: 17px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 auto;
}

.banks__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.banks__card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 28px 16px;
  background: var(--color-bg-dark-card);
  border: 1px solid var(--color-border-dark);
  border-radius: var(--radius-md);
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
}

.banks__card:hover {
  background: var(--color-bg-dark-card-hover);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.banks__logo-wrap {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.banks__logo {
  width: 52px;
  height: 52px;
  object-fit: contain;
  object-position: center;
  filter: brightness(0) invert(1);
  opacity: 0.7;
  transition: opacity 0.3s, transform 0.2s ease;
  transform-origin: center;
}

.banks__logo--light {
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.8));
  opacity: 0.95;
}

.banks__card:hover .banks__logo {
  opacity: 1;
}

.banks__logo-placeholder {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 16px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: -0.02em;
  transition: all 0.3s;
}

.banks__card:hover .banks__logo-placeholder {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
}

.banks__name {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  line-height: 1.3;
  transition: color 0.3s;
}

.banks__card:hover .banks__name {
  color: rgba(255, 255, 255, 0.9);
}

.banks__extra {
  text-align: center;
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

@media (max-width: 960px) {
  .banks__grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 600px) {
  .banks { padding: 56px 0; }
  .banks__title { font-size: 26px; }
  .banks__grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
  .banks__card { padding: 20px 12px; }
  .banks__logo-wrap { width: 40px; height: 40px; }
  .banks__logo { width: 40px; height: 40px; }
  .banks__logo-placeholder { width: 40px; height: 40px; font-size: 14px; }
}
</style>
