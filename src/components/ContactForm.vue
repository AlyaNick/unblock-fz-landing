<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useReveal } from '../composables/useReveal'

const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)

const submitted = ref(false)
const errors = reactive<Record<string, string>>({})

const form = reactive({
  name: '',
  phone: '',
  problem: '',
})

function validate(): boolean {
  errors.name = form.name.trim() ? '' : 'Укажите имя'
  errors.phone = form.phone.trim() ? '' : 'Укажите телефон'
  return !errors.name && !errors.phone
}

function onSubmit() {
  if (!validate()) return
  submitted.value = true
}
</script>

<template>
  <section id="contact" class="cta" ref="sectionRef">
    <div class="deco-gradient cta__deco-1"></div>
    <div class="deco-gradient cta__deco-2"></div>

    <div class="cta__container container">
      <div class="cta__banner reveal-left">
        <span class="section-label section-label--light">Обратная связь</span>
        <h2 class="cta__banner-title">
          Каждый день промедления<br />увеличивает риски
        </h2>
        <p class="cta__banner-desc">
          Получите правовую оценку ситуации уже сегодня.
        </p>

        <div class="cta__trust">
          <div class="cta__trust-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 4L6 12l-3.5-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Конфиденциально</span>
          </div>
          <div class="cta__trust-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 4L6 12l-3.5-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>По договору</span>
          </div>
          <div class="cta__trust-item">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M13.5 4L6 12l-3.5-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Ответ в течение часа</span>
          </div>
        </div>
      </div>

      <div class="cta__form-card reveal-right">
        <div v-if="!submitted">
          <h3 class="cta__form-title">Оставить заявку</h3>

          <form class="cta__form" @submit.prevent="onSubmit" novalidate>
            <div class="cta__row">
              <div class="cta__field">
                <label class="cta__label" for="f-name">Имя</label>
                <input
                  id="f-name"
                  v-model="form.name"
                  class="cta__input"
                  :class="{ 'cta__input--error': errors.name }"
                  type="text"
                  placeholder="Иван Петров"
                  @blur="validate"
                />
                <span v-if="errors.name" class="cta__error">{{ errors.name }}</span>
              </div>
              <div class="cta__field">
                <label class="cta__label" for="f-phone">Телефон</label>
                <input
                  id="f-phone"
                  v-model="form.phone"
                  class="cta__input"
                  :class="{ 'cta__input--error': errors.phone }"
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  @blur="validate"
                />
                <span v-if="errors.phone" class="cta__error">{{ errors.phone }}</span>
              </div>
            </div>

            <div class="cta__field">
              <label class="cta__label" for="f-problem">Краткое описание ситуации</label>
              <textarea
                id="f-problem"
                v-model="form.problem"
                class="cta__textarea"
                rows="3"
                placeholder="Опишите проблему, с которой столкнулись"
              ></textarea>
            </div>

            <button type="submit" class="btn btn--primary cta__submit">
              Отправить заявку
            </button>
          </form>
        </div>

        <div v-else class="cta__success">
          <div class="cta__success-icon">&#10003;</div>
          <h3 class="cta__success-title">Заявка отправлена</h3>
          <p class="cta__success-desc">
            Мы свяжемся с&nbsp;вами в&nbsp;ближайшее время.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  background: var(--gradient-dark);
  padding: 96px 0;
  position: relative;
  overflow: hidden;
  color: #fff;
}

.cta__deco-1 {
  width: 500px;
  height: 500px;
  background: var(--color-accent);
  top: -200px;
  left: -150px;
  opacity: 0.06;
}

.cta__deco-2 {
  width: 400px;
  height: 400px;
  background: var(--color-navy);
  bottom: -150px;
  right: -100px;
  opacity: 0.1;
}

.cta__container {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}

.cta__banner-title {
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.15;
  color: #fff;
  margin-bottom: 16px;
}

.cta__banner-desc {
  font-size: 18px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 32px;
}

.cta__trust {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.cta__trust-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
}

.cta__trust-item svg {
  color: var(--color-green);
}

.cta__form-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-xl);
  padding: 40px 36px;
  backdrop-filter: blur(16px);
}

.cta__form-title {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 28px;
}

.cta__form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.cta__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.cta__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cta__label {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
}

.cta__input,
.cta__textarea {
  padding: 14px 16px;
  font-size: 14px;
  font-family: inherit;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s;
  width: 100%;
}

.cta__input::placeholder,
.cta__textarea::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.cta__input:focus,
.cta__textarea:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px var(--color-accent-glow);
}

.cta__input--error {
  border-color: var(--color-accent);
}

.cta__textarea {
  resize: vertical;
  min-height: 80px;
}

.cta__error {
  font-size: 12px;
  color: #e74c3c;
}

.cta__submit {
  width: 100%;
  height: 52px;
  font-size: 16px;
  margin-top: 4px;
}

.cta__success {
  text-align: center;
  padding: 40px 16px;
}

.cta__success-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  background: rgba(39, 174, 96, 0.15);
  color: var(--color-green);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 700;
}

.cta__success-title {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
}

.cta__success-desc {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 860px) {
  .cta { padding: 72px 0; }
  .cta__container { grid-template-columns: 1fr; gap: 36px; }
  .cta__banner-title { font-size: 32px; text-align: center; }
  .cta__banner-desc { text-align: center; }
  .cta__trust { align-items: center; }
}

@media (max-width: 600px) {
  .cta { padding: 48px 0; }
  .cta__banner-title { font-size: 26px; }
  .cta__form-card { padding: 28px 20px; }
  .cta__row { grid-template-columns: 1fr; }
}
</style>
