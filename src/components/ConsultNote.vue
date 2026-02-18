<template>
  <section class="note">
    <div class="note__container container">
      <div class="note__inner">
        <div class="note__icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div class="note__body">
          <p class="note__text">
            Если вы понимаете, что есть потребность в&nbsp;консультации
            <strong>корпоративного юриста</strong> или <strong>финансиста</strong> —
            отметьте это галочкой в&nbsp;форме заявки ниже.
          </p>
          <p class="note__sub">
            Наши специалисты взаимодействуют между собой и&nbsp;доносят
            до&nbsp;вас полную картину возникшей проблемы.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.note {
  background-color: var(--color-bg-alt);
  padding: 0 0 0 0;
}

.note__container {
  padding-top: 0;
  padding-bottom: 0;
}

.note__inner {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 32px 36px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-accent);
  border-radius: 0 10px 10px 0;
}

.note__icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(192, 57, 43, 0.06);
  color: var(--color-accent);
  flex-shrink: 0;
}

.note__body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.note__text {
  font-size: 15px;
  line-height: 1.65;
  color: var(--color-text);
}

.note__text strong {
  font-weight: 600;
}

.note__sub {
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-text-muted);
}

@media (max-width: 600px) {
  .note__inner {
    flex-direction: column;
    gap: 14px;
    padding: 24px 20px;
  }
}
</style>
