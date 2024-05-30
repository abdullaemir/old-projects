<template>
  <div class="tenders__table">
    <table class="tenders">
      <thead class="tenders__header">
        <tr class="tenders__row">
          <th class="tenders__cell">
            Item Description
          </th>
          <th class="tenders__cell tenders__cell--desktop">
            Dosage form
          </th>
          <th class="tenders__cell tenders__cell--desktop">
            Pack size / Unit
          </th>
          <th class="tenders__cell tenders__cell--desktop">
            Quantity
          </th>
          <th class="tenders__cell tenders__cell--tablet">
            Reference brand
          </th>
          <th class="tenders__cell tenders__cell--tablet">
            Benchmark unit price
          </th>
          <th class="tenders__cell tenders__cell--time">
            Delivery time
          </th>
          <th class="tenders__cell tenders__cell--desktop tenders__cell--sum">
            Special remark (if any)
          </th>
        </tr>
      </thead>

      <tbody class="tenders__body">
        <tr
          v-for="(item, index) in items"
          :key="index"
          class="tenders__row"
        >
          <td class="tenders__cell tenders__cell--description">
            № {{ item.description }}
          </td>
          <td
            class="tenders__cell tenders__cell--form"
            data-title="Dosage form"
          >
            {{ item.form }}
          </td>
          <td
            class="tenders__cell tenders__cell--size"
            data-title="Pack size / Unit"
          >
            {{ item.size }}
          </td>
          <td
            class="tenders__cell tenders__cell--quantity"
            data-title="Quantity"
          >
            {{ item.quantity }}
          </td>
          <td
            class="tenders__cell tenders__cell--reference"
            data-title="Reference brand"
          >
            {{ item.reference }}
          </td>
          <td
            class="tenders__cell tenders__cell--price"
            data-title="Benchmark unit price"
          >
            {{ item.price }}
          </td>
          <td class="tenders__cell tenders__cell--time">
            {{ item.time }}
          </td>
          <td
            class="tenders__cell tenders__cell--remark"
            data-title="Special remark (if any)"
          >
            {{ item.remark }}
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
  grid-template-columns:
    1fr
    105px;
  padding: 8px 16px;
  background-color: #f6f7fb;
}

@media (min-width: 768px) {
  .tenders__row {
    grid-template-columns:
      minmax(228px, 1fr)
      minmax(145px, 1fr)
      minmax(210px, 1fr)
      minmax(85px, 1fr);
  }
}

@media (min-width: 1340px) {
  .tenders__row {
    grid-template-columns:
      164px
      84px
      84px
      80px
      94px
      104px
      139px
      1fr;
  }
}

.tenders__row:not(:last-child) {
  border-bottom: 1px solid var(--border-color-primary);
}

.tenders__header .tenders__row {
  align-items: center;
}

.tenders__body .tenders__row {
  position: relative;
  padding: 20px 16px;
  background-color: transparent;
}

@media (min-width: 1340px) {
  .tenders__cell {
    padding-right: 24px;
  }
}

@media (max-width: 1339px) {
  .tenders__cell--time {
    margin-left: auto;
    text-align: right;
  }
}

.tenders__header .tenders__cell {
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

.tenders__header .tenders__cell--desktop {
  display: none;
}

@media (min-width: 1339px) {
  .tenders__header .tenders__cell--desktop {
    display: block;
  }
}

@media (max-width: 1339px) {
  .tenders__body .tenders__cell--form,
  .tenders__body .tenders__cell--quantity,
  .tenders__body .tenders__cell--price,
  .tenders__body .tenders__cell--remark {
    grid-column: 1 / 2;
  }

  .tenders__body .tenders__cell--price,
  .tenders__body .tenders__cell--remark {
    grid-column: 1 / 3;
  }

  .tenders__body .tenders__cell--time,
  .tenders__body .tenders__cell--size,
  .tenders__body .tenders__cell--reference {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    text-align: right;
  }

  .tenders__body .tenders__cell--size {
    grid-row: 2 / 3;
  }

  .tenders__body .tenders__cell--reference {
    grid-row: 3 / 4;
  }

  @media (min-width: 768px) {
    .tenders__body .tenders__cell--reference,
    .tenders__body .tenders__cell--price {
      grid-row: 1 / 2;
      text-align: left;
    }

    .tenders__body .tenders__cell--time {
      grid-column: 4 / 5;
    }

    .tenders__body .tenders__cell--price,
    .tenders__body .tenders__cell--quantity {
      grid-column: 3 / 4;
    }

    .tenders__body .tenders__cell--size {
      text-align: left;
    }
  }
}

@media (max-width: 1339px) {
  .tenders__body .tenders__cell--description,
  .tenders__body .tenders__cell--time {
    margin-bottom: 24px;
    font-weight: 600;
  }

  .tenders__body .tenders__cell--quantity,
  .tenders__body .tenders__cell--price,
  .tenders__body .tenders__cell--size {
    margin-bottom: 16px;
  }

  @media (min-width: 768px) {
    .tenders__body .tenders__cell--reference,
    .tenders__body .tenders__cell--price {
      margin-bottom: 24px;
      font-weight: 600;
    }
  }
}

@media (max-width: 1339px) {
  .tenders__body .tenders__cell--form::before,
  .tenders__body .tenders__cell--quantity::before,
  .tenders__body .tenders__cell--price::before,
  .tenders__body .tenders__cell--remark::before,
  .tenders__body .tenders__cell--size::before,
  .tenders__body .tenders__cell--reference::before {
    content: attr(data-title);
    display: block;
    margin-bottom: 4px;
    line-height: 1.8;
    color: var(--text-color-two);
  }

  @media (min-width: 768px) {
    .tenders__body .tenders__cell--price::before,
    .tenders__body .tenders__cell--reference::before {
      display: none;
    }
  }
}
</style>
