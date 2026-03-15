<script setup lang="ts">
import { ref } from 'vue'
import DocModal from '../DocModal.vue'
import {
  operatorAddress,
  operatorEmail,
  operatorFullName,
  operatorOgrn,
  operatorInn,
  operatorKpp,
} from '../../config'

const show = ref(false)
function open() {
  show.value = true
}
function close() {
  show.value = false
}
defineExpose({ open })
</script>

<template>
  <DocModal
    :show="show"
    title="Согласие на обработку персональных данных"
    @close="close"
  >
    <div class="doc-content consent-doc">
      <p>
        В соответствии со статьёй 9 Федерального закона от 27.07.2006 № 152-ФЗ
        «О персональных данных» даю своё согласие Оператору на обработку
        персональных данных с использованием настоящего сайта в указанных ниже
        целях.
      </p>

      <div class="consent-doc__table-wrap">
        <table class="consent-doc__table">
          <thead>
            <tr>
              <th>№</th>
              <th>Оператор</th>
              <th>Цель</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                {{ operatorFullName }}<br />
                ОГРН: {{ operatorOgrn }}<br />
                ИНН: {{ operatorInn }}<br />
                КПП: {{ operatorKpp }}<br />
                Адрес: {{ operatorAddress }}
              </td>
              <td>
                Обработка обращений и заявок, оставленных через формы на сайте,
                информирование о ходе их выполнения, оказание услуг.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <b>Перечень персональных данных:</b> фамилия, имя, отчество, номер
        телефона, адрес электронной почты.
      </p>
      <p>
        <b>Действия с персональными данными:</b> сбор, запись, систематизация,
        накопление, хранение, уточнение, использование, блокирование, удаление,
        уничтожение.
      </p>
      <p>
        <b>Срок обработки:</b> согласие действует до достижения целей обработки
        или до отзыва согласия субъектом персональных данных. Согласие может быть
        отозвано путём направления заявления по адресу: {{ operatorEmail }} или
        по почтовому адресу Оператора.
      </p>
      <p>
        С полным текстом Политики обработки персональных данных Оператора
        ознакомлен(а).
      </p>
    </div>
  </DocModal>
</template>

<style scoped>
.consent-doc__table-wrap {
  overflow-x: auto;
  margin: 1rem 0;
}

.consent-doc__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.consent-doc__table th,
.consent-doc__table td {
  border: 1px solid var(--color-border);
  padding: 0.75rem;
  text-align: left;
  vertical-align: top;
}

.consent-doc__table th {
  background: var(--color-bg-alt);
  font-weight: 600;
}

.consent-doc__table td:first-child {
  white-space: nowrap;
  width: 2rem;
}
</style>
