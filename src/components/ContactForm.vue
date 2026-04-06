<script setup lang="ts">
import { reactive, ref, computed, nextTick } from 'vue'
import { useReveal } from '../composables/useReveal'
import DocumentModals from './DocumentModals.vue'

const sectionRef = ref<HTMLElement | null>(null)
useReveal(sectionRef)

const docModalsRef = ref<InstanceType<typeof DocumentModals> | null>(null)
const submitted = ref(false)
const isSubmitting = ref(false)
const submitError = ref('')
const phoneTouched = ref(false)
const emailTouched = ref(false)
const errors = reactive<Record<string, string>>({})

const form = reactive({
  name: '',
  phone: '',
  email: '',
  problem: '',
  agreeConsent: false,
  consentMarketing: false,
})

function normalizePhoneDigits(raw: string): string {
  let d = raw.replace(/\D/g, '')
  if (d.startsWith('8')) d = '7' + d.slice(1)
  else if (d.length > 0 && d[0] !== '7') d = '7' + d
  return d.slice(0, 11)
}

function formatPhoneMask(digits: string): string {
  if (digits.length === 0) return ''
  if (digits.length <= 1) return '+7'
  if (digits.length <= 4) return `+7 (${digits.slice(1)}`
  if (digits.length <= 7) return `+7 (${digits.slice(1, 4)}) ${digits.slice(4)}`
  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`
}

function positionAfterDigits(str: string, digitCount: number): number {
  let count = 0
  for (let i = 0; i < str.length; i++) {
    if (/\d/.test(str.charAt(i))) count++
    if (count >= digitCount) return i + 1
  }
  return str.length
}

function onPhoneInput(e: Event) {
  const el = e.target as HTMLInputElement
  const digits = normalizePhoneDigits(el.value || '')
  form.phone = formatPhoneMask(digits)
  const cursorAfter = digits.length
  nextTick(() => {
    const pos = positionAfterDigits(form.phone, cursorAfter)
    el.setSelectionRange(pos, pos)
  })
}

function isRussianPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 11) return digits[0] === '7' || digits[0] === '8'
  if (digits.length === 10) return true
  return false
}

const phoneError = computed(() => {
  const v = form.phone.trim()
  if (!v) return ''
  if (!isRussianPhone(v)) return 'Введите корректный российский номер (+7 …)'
  return ''
})

const showPhoneError = computed(() => phoneTouched.value && phoneError.value)

function isValidEmail(value: string): boolean {
  const v = value.trim()
  if (!v) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

const emailError = computed(() => {
  const v = form.email.trim()
  if (!v) return ''
  if (!isValidEmail(v)) return 'Введите корректный email'
  return ''
})

const showEmailError = computed(() => emailTouched.value && emailError.value)

const contactError = computed(() => {
  const hasPhone = Boolean(form.phone.trim())
  const hasEmail = Boolean(form.email.trim())
  if (hasPhone || hasEmail) return ''
  if (!phoneTouched.value && !emailTouched.value) return ''
  return 'Укажите телефон или email'
})

const canSubmit = computed(() => {
  if (!form.name.trim() || !form.agreeConsent) return false
  const hasPhone = Boolean(form.phone.trim())
  const hasEmail = Boolean(form.email.trim())
  if (!hasPhone && !hasEmail) return false
  if (hasPhone && phoneError.value) return false
  if (hasEmail && emailError.value) return false
  return true
})

function validate(): boolean {
  errors.name = form.name.trim() ? '' : 'Укажите имя'
  errors.phone = phoneError.value
  return (
    !errors.name &&
    !errors.phone &&
    !emailError.value &&
    !contactError.value
  )
}

function openDoc(doc: 'policy' | 'consent') {
  docModalsRef.value?.open(doc)
}

function closeSuccess() {
  submitted.value = false
}

async function onSubmit() {
  phoneTouched.value = true
  emailTouched.value = true
  if (!canSubmit.value || !validate()) return
  submitError.value = ''
  isSubmitting.value = true
  try {
    const res = await fetch('/api/send.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        problem: form.problem.trim(),
        consentMarketing: form.consentMarketing,
      }),
    })
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; detail?: string }
    if (!res.ok) {
      const msg = [data.error, data.detail].filter(Boolean).join(' ') || `Ошибка ${res.status}`
      throw new Error(msg)
    }
    submitted.value = true
    form.name = ''
    form.phone = ''
    form.email = ''
    form.problem = ''
    form.agreeConsent = false
    form.consentMarketing = false
    phoneTouched.value = false
    emailTouched.value = false
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Не удалось отправить. Попробуйте позже.'
    submitError.value = msg
  } finally {
    isSubmitting.value = false
  }
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
        <h3 class="cta__form-title">Оставить заявку</h3>

        <form class="cta__form" @submit.prevent="onSubmit" novalidate>
            <div class="cta__row">
              <div class="cta__field">
                <label class="cta__label" for="f-name">Имя <span class="cta__label-required">*</span></label>
                <input
                  id="f-name"
                  v-model="form.name"
                  class="cta__input"
                  :class="{ 'cta__input--error': errors.name }"
                  type="text"
                  placeholder="Иван Петров"
                  required
                  @blur="validate"
                />
                <span v-if="errors.name" class="cta__error">{{ errors.name }}</span>
              </div>
              <div class="cta__field">
                <label class="cta__label" for="f-phone">Телефон</label>
                <input
                  id="f-phone"
                  :value="form.phone"
                  class="cta__input"
                  :class="{ 'cta__input--error': showPhoneError }"
                  type="tel"
                  inputmode="numeric"
                  autocomplete="tel"
                  maxlength="18"
                  placeholder="+7 (___) ___-__-__"
                  @input="onPhoneInput"
                  @blur="phoneTouched = true; validate()"
                />
                <span v-if="showPhoneError" class="cta__error">{{ phoneError }}</span>
              </div>
            </div>

            <div class="cta__field">
              <label class="cta__label" for="f-email">Email</label>
              <input
                id="f-email"
                v-model="form.email"
                class="cta__input"
                :class="{ 'cta__input--error': showEmailError }"
                type="email"
                inputmode="email"
                autocomplete="email"
                placeholder="name@example.com"
                @blur="emailTouched = true; validate()"
              />
              <span v-if="showEmailError" class="cta__error">{{ emailError }}</span>
            </div>

            <p v-if="contactError" class="cta__error cta__error--block">{{ contactError }}</p>

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

            <div class="cta__consents">
              <label class="cta__checkbox">
                <input v-model="form.agreeConsent" type="checkbox" required>
                <span>
                  Я даю
                  <button type="button" class="cta__doc-link" @click.prevent="openDoc('consent')">согласие</button>
                  на обработку персональных данных в связи с
                  <button type="button" class="cta__doc-link" @click.prevent="openDoc('policy')">политикой</button>
                </span>
              </label>
              <label class="cta__checkbox cta__checkbox--spaced">
                <input v-model="form.consentMarketing" type="checkbox">
                <span>Согласие на рекламные рассылки (получение рекламы и т.д.)</span>
              </label>
            </div>

            <p v-if="submitError" class="cta__submit-error">{{ submitError }}</p>

            <button
              type="submit"
              class="btn btn--primary cta__submit"
              :disabled="!canSubmit || isSubmitting"
            >
              {{ isSubmitting ? 'Отправка...' : 'Отправить заявку' }}
            </button>
        </form>
      </div>
    </div>

    <DocumentModals ref="docModalsRef" />

    <Teleport to="body">
      <Transition name="success-popup">
        <div
          v-if="submitted"
          class="success-popup__backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
          @click.self="closeSuccess"
        >
          <div class="success-popup__box">
            <div class="success-popup__icon">&#10003;</div>
            <h3 id="success-title" class="success-popup__title">Заявка отправлена</h3>
            <p class="success-popup__text">
              Мы свяжемся с&nbsp;вами в&nbsp;ближайшее время.
            </p>
            <button
              type="button"
              class="success-popup__btn"
              @click="closeSuccess"
            >
              Закрыть
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
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

.cta__label-required {
  color: var(--color-accent);
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

.cta__error--block {
  margin: 0;
}

.cta__consents {
  margin-top: 4px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.cta__checkbox {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.75);
}

.cta__checkbox + .cta__checkbox--spaced {
  margin-top: 14px;
}

.cta__checkbox input {
  width: 18px;
  height: 18px;
  margin-top: 2px;
  flex-shrink: 0;
  accent-color: var(--color-accent);
  cursor: pointer;
}

.cta__doc-link {
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  color: var(--color-accent);
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.2s;
}

.cta__doc-link:hover {
  color: var(--color-accent-hover);
}

.cta__submit {
  width: 100%;
  height: 52px;
  font-size: 16px;
  margin-top: 4px;
}

.cta__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cta__submit-error {
  margin: 0;
  font-size: 13px;
  color: #e74c3c;
}

/* Маленькое модальное окно после отправки (как в bookkeep-landing) */
.success-popup__backdrop {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.success-popup__box {
  text-align: center;
  padding: 1.5rem 2rem;
  background: var(--color-bg-dark, #0c1220);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
  max-width: 400px;
}

.success-popup__icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(39, 174, 96, 0.2);
  color: var(--color-green);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 auto 1rem;
}

.success-popup__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem;
}

.success-popup__text {
  font-size: 0.9375rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 1.5rem;
  line-height: 1.5;
}

.success-popup__btn {
  padding: 0.625rem 1.5rem;
  background: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.success-popup__btn:hover {
  opacity: 0.9;
}

.success-popup-enter-active,
.success-popup-leave-active {
  transition: opacity 0.25s ease;
}

.success-popup-enter-from,
.success-popup-leave-to {
  opacity: 0;
}

.success-popup-enter-active .success-popup__box,
.success-popup-leave-active .success-popup__box {
  transition: transform 0.25s ease;
}

.success-popup-enter-from .success-popup__box,
.success-popup-leave-to .success-popup__box {
  transform: scale(0.96);
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
