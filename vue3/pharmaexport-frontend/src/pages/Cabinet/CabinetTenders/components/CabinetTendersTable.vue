<template>
  <div class="tenders__table">
    <table class="tenders">
      <thead class="tenders__header">
        <tr class="tenders__row">
          <th class="tenders__cell">
            Tender number
          </th>
          <th class="tenders__cell tenders__cell--tablet">
            Date
          </th>
          <th class="tenders__cell tenders__cell--tablet">
            Items amount
          </th>
          <th class="tenders__cell tenders__cell--tablet">
            Status
          </th>
          <th class="tenders__cell tenders__cell--tablet">
            Delivery status
          </th>
          <th class="tenders__cell tenders__cell--sum">
            Total sum
          </th>
        </tr>
      </thead>

      <tbody class="tenders__body">
        <tr
          v-for="(tender, index) in tenders"
          :key="index"
          class="tenders__row"
        >
          <td class="tenders__cell tenders__cell--number">
            <RouterLink
              class="tenders__link"
              :to="{
                name: `cabinetTender`,
                params: { number: tender.number },
              }"
            >
              № {{ tender.number }}
            </RouterLink>
          </td>
          <td
            class="tenders__cell tenders__cell--date"
            data-title="Date"
          >
            {{ tender.date }}
          </td>
          <td
            class="tenders__cell tenders__cell--amount"
            data-title="Items amount"
          >
            {{ tender.amount }}
          </td>
          <td
            class="tenders__cell tenders__cell--status"
            data-title="Status"
          >
            {{ tender.status }}
          </td>
          <td
            class="tenders__cell tenders__cell--delivery-status"
            data-title="Delivery status"
          >
            {{ tender.deliveryStatus }}
          </td>
          <td class="tenders__cell tenders__cell--sum">
            {{ tender.sum }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";

defineProps({
  tenders: {
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
  grid-template-columns:
    1fr
    95px;
  padding: 8px 16px;
  background-color: #f6f7fb;
}

@media (min-width: 768px) {
  .tenders__row {
    grid-template-columns:
      minmax(138px, 1fr)
      minmax(92px, 1fr)
      minmax(121px, 1fr)
      minmax(122px, 1fr)
      minmax(133px, 1fr)
      minmax(62px, 1fr);
  }
}

@media (min-width: 1340px) {
  .tenders__row {
    grid-template-columns:
      156px
      144px
      177px
      169px
      183px
      70px;
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
  .tenders__body .tenders__cell--number,
  .tenders__body .tenders__cell--date,
  .tenders__body .tenders__cell--status {
    grid-column: 1 / 2;
  }
}

@media (max-width: 767px) {
  .tenders__body .tenders__cell--sum,
  .tenders__body .tenders__cell--amount,
  .tenders__body .tenders__cell--delivery-status {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    text-align: right;
  }

  .tenders__body .tenders__cell--amount {
    grid-row: 2 / 3;
  }

  .tenders__body .tenders__cell--delivery-status {
    grid-row: 3 / 4;
  }
}

@media (max-width: 767px) {
  .tenders__body .tenders__cell--number,
  .tenders__body .tenders__cell--sum {
    margin-bottom: 24px;
    font-weight: 600;
  }
}

@media (max-width: 767px) {
  .tenders__body .tenders__cell--date,
  .tenders__body .tenders__cell--amount {
    margin-bottom: 16px;
  }
}

@media (max-width: 767px) {
  .tenders__body .tenders__cell--date::before,
  .tenders__body .tenders__cell--status::before,
  .tenders__body .tenders__cell--amount::before,
  .tenders__body .tenders__cell--delivery-status::before {
    content: attr(data-title);
    display: block;
    margin-bottom: 4px;
    line-height: 1.8;
    color: var(--text-color-two);
  }
}

.tenders__cell--sum {
  margin-left: auto;
}

.tenders__link::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
