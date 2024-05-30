<template>
  <div class="tenders__table">
    <table class="tenders">
      <thead class="tenders__header">
        <tr class="tenders__row">
          <th class="tenders__cell">
            INN
          </th>
          <th class="tenders__cell tenders__cell--tablet">
            Form
          </th>
          <th class="tenders__cell tenders__cell--tablet">
            Full Name
          </th>
        </tr>
      </thead>

      <tbody class="tenders__body">
        <tr
          v-for="(item, index) in items"
          :key="index"
          class="tenders__row"
        >
          <td class="tenders__cell tenders__cell--inn">
            № {{ item.inn }}
          </td>
          <td
            class="tenders__cell tenders__cell--form"
            data-title="Form"
          >
            {{ item.form }}
          </td>
          <td
            class="tenders__cell tenders__cell--name"
            data-title="Full Name"
          >
            {{ item.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  items: {
    required: true,
    type: Array,
  },
});
</script>

<style scoped>
.tenders__table {
  position: relative;
  margin: 0 -16px;
  border-top: 1px solid var(--border-color-primary);
  border-bottom: 1px solid var(--border-color-primary);
  font-size: 12px;
}

@media (min-width: 768px) {
  .tenders__table {
    max-width: 943px;
    width: 100%;
    margin: 0;
    border: 1px solid var(--border-color-primary);
    border-radius: 8px;
  }
}

.tenders {
  width: 100%;
  border-collapse: collapse;
}

.tenders__header {
  position: sticky;
  top: 81px;
  z-index: 1;
}

@media (min-width: 1170px) {
  .tenders__header {
    top: 65px;
  }
}

.tenders__row {
  display: grid;
  padding: 8px 16px;
  background-color: #f6f7fb;
}

@media (min-width: 768px) {
  .tenders__row {
    grid-template-columns:
      minmax(230px, 1fr)
      minmax(82px, 1fr)
      1fr;
  }
}

@media (min-width: 1170px) {
  .tenders__row {
    grid-template-columns:
      218px
      134px
      1fr;
  }
}

.tenders__row:not(:last-child) {
  border-bottom: 1px solid var(--border-color-primary);
}

.tenders__header .tenders__cell {
  display: flex;
  align-items: center;
  text-align: left;
}

.tenders__header .tenders__cell--tablet {
  display: none;
}

@media (min-width: 768px) {
  .tenders__header .tenders__cell--tablet {
    display: block;
  }
}

.tenders__body .tenders__row {
  position: relative;
  padding: 20px 16px;
  background-color: transparent;
}

@media (max-width: 767px) {
  .tenders__body .tenders__cell--inn {
    margin-bottom: 24px;
    font-weight: 600;
  }
}

@media (max-width: 767px) {
  .tenders__body .tenders__cell--form {
    margin-bottom: 16px;
  }
}

@media (max-width: 767px) {
  .tenders__body .tenders__cell--form::before,
  .tenders__body .tenders__cell--name::before {
    content: attr(data-title);
    display: block;
    margin-bottom: 4px;
    line-height: 1.8;
    color: var(--text-color-two);
  }
}
</style>
