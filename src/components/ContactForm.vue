<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()
const submitted = ref(false)

const form = reactive({
  name: '',
  phone: '',
  problem: '',
  needLawyer: false,
  needFinancier: false,
})

const rules = {
  name: [{ required: true, message: 'Укажите имя', trigger: 'blur' }],
  phone: [{ required: true, message: 'Укажите телефон', trigger: 'blur' }],
}

async function onSubmit() {
  if (!formRef.value) return
  const valid = await formRef.value.validate().catch(() => false)
  if (!valid) return
  submitted.value = true
}
</script>

<template>
  <section id="contact" class="cta">
    <div class="cta__container container">

      <div class="cta__banner">
        <h2 class="cta__banner-title">
          Каждый день просрочки<br />увеличивает риски
        </h2>
        <p class="cta__banner-desc">
          Получите план действий уже сегодня.
        </p>
      </div>

      <div class="cta__form-card">

        <div v-if="!submitted">
          <h3 class="cta__form-title">Оставить заявку</h3>

          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-position="top"
            class="cta__form"
          >
            <div class="cta__row">
              <el-form-item label="Имя" prop="name" class="cta__field">
                <el-input v-model="form.name" placeholder="Иван Петров" />
              </el-form-item>
              <el-form-item label="Телефон" prop="phone" class="cta__field">
                <el-input v-model="form.phone" placeholder="+7 (___) ___-__-__" />
              </el-form-item>
            </div>

            <el-form-item label="Краткое описание ситуации" class="cta__field">
              <el-input
                v-model="form.problem"
                type="textarea"
                :rows="3"
                placeholder="Опишите проблему, с которой столкнулись"
              />
            </el-form-item>

            <div class="cta__checks">
              <el-checkbox v-model="form.needLawyer">
                Нужна консультация юриста
              </el-checkbox>
              <el-checkbox v-model="form.needFinancier">
                Нужна консультация финансиста
              </el-checkbox>
            </div>

            <el-button
              type="danger"
              size="large"
              class="cta__submit"
              @click="onSubmit"
            >
              Отправить заявку
            </el-button>
          </el-form>
        </div>

        <div v-else class="cta__success">
          <div class="cta__success-icon">&#10003;</div>
          <h3 class="cta__success-title">Заявка отправлена</h3>
          <p class="cta__success-desc">
            Мы свяжемся с&nbsp;вами в&nbsp;ближайшее время.
            Если ситуация срочная — напишите нам в&nbsp;мессенджер.
          </p>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
.cta {
  background-color: var(--color-bg);
  padding: 96px 0;
}

.cta__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

/* --- Banner --- */
.cta__banner {
  position: sticky;
  top: 48px;
  padding-top: 24px;
}

.cta__banner-title {
  font-size: 40px;
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1.2;
  color: var(--color-text);
  margin-bottom: 16px;
}

.cta__banner-desc {
  font-size: 18px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

/* --- Form card --- */
.cta__form-card {
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 36px 32px;
}

.cta__form-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 24px;
}

.cta__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.cta__field {
  margin-bottom: 4px;
}

.cta__checks {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0;
  border-top: 1px solid var(--color-border);
  margin-top: 8px;
  margin-bottom: 8px;
}

.cta__checks :deep(.el-checkbox__label) {
  font-size: 14px;
  color: var(--color-text);
}

.cta__submit {
  width: 100%;
  --el-button-bg-color: var(--color-accent);
  --el-button-border-color: var(--color-accent);
  --el-button-hover-bg-color: var(--color-accent-hover);
  --el-button-hover-border-color: var(--color-accent-hover);
  --el-button-active-bg-color: #922b21;
  --el-button-active-border-color: #922b21;
  --el-button-text-color: #fff;
  font-weight: 600;
  font-size: 15px;
  height: 48px;
  border-radius: 8px;
  margin-top: 4px;
}

/* --- Success --- */
.cta__success {
  text-align: center;
  padding: 40px 16px;
}

.cta__success-icon {
  width: 52px;
  height: 52px;
  margin: 0 auto 20px;
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}

.cta__success-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 10px;
}

.cta__success-desc {
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-text-secondary);
  max-width: 340px;
  margin: 0 auto;
}

/* --- Responsive --- */
@media (max-width: 860px) {
  .cta {
    padding: 72px 0;
  }

  .cta__container {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .cta__banner {
    position: static;
    padding-top: 0;
    text-align: center;
  }

  .cta__banner-title {
    font-size: 32px;
  }
}

@media (max-width: 600px) {
  .cta {
    padding: 48px 0;
  }

  .cta__banner-title {
    font-size: 26px;
  }

  .cta__banner-desc {
    font-size: 16px;
  }

  .cta__form-card {
    padding: 24px 20px;
  }

  .cta__row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
