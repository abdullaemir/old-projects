<template>
  <CabinetPurchasesFiltersGoods
    ref="filtersGoods"
    :product-name="filterByName.product_name"
    @filters="filtersSelected = $event"
  />

  <hr class="purchases__divider" />

  <p
    v-if="!dataTable.length"
    class="purchases__text"
  >
    No matches found
  </p>

  <div
    v-else
    ref="goodsTable"
    class="purchases-table__wrapper scrollbar"
  >
    <table class="purchases-table">
      <thead class="purchases-table__header">
        <tr class="purchases-table__row">
          <th class="purchases-table__cell">
            INN / Tradename
            <BaseTableButtonSortCustom
              :curr-sorts="sortsByFieldTable"
              :data-sort="sortsTable.product_name"
              @update-sorts="sortsByFieldTable = $event"
            />
          </th>
          <th class="purchases-table__cell purchases-table__cell--tablet">
            Dosage
            <BaseTableButtonSortCustom
              :curr-sorts="sortsByFieldTable"
              :data-sort="sortsTable.dosage_form"
              @update-sorts="sortsByFieldTable = $event"
            />
          </th>
          <th class="purchases-table__cell purchases-table__cell--tablet">
            Drug form
            <BaseTableButtonSortCustom
              :curr-sorts="sortsByFieldTable"
              :data-sort="sortsTable.drug_form"
              @update-sorts="sortsByFieldTable = $event"
            />
          </th>
          <th class="purchases-table__cell purchases-table__cell--mobile">
            Therapy area
          </th>
          <th class="purchases-table__cell purchases-table__cell--mobile">
            Estimated Price
            <BaseTableButtonSortCustom
              :curr-sorts="sortsByFieldTable"
              :data-sort="sortsTable.estimated_price"
              @update-sorts="sortsByFieldTable = $event"
            />
          </th>
          <th class="purchases-table__cell">
            Delivery period
            <BaseTableButtonSortCustom
              :curr-sorts="sortsByFieldTable"
              :data-sort="sortsTable.delivery_period"
              @update-sorts="sortsByFieldTable = $event"
            />
          </th>
          <th class="purchases-table__cell" />
        </tr>
      </thead>

      <tbody class="purchases-table__body">
        <tr
          v-for="good in dataTable"
          :key="good.id"
          class="purchases-table__row"
        >
          <td class="purchases-table__cell purchases-table__cell--inn">
            {{ good.product_name || "-" }}
          </td>
          <td
            class="purchases-table__cell purchases-table__cell--dosage"
            data-title="Dosage"
          >
            {{ good.dosage_form || "-" }}
          </td>
          <td
            class="purchases-table__cell purchases-table__cell--form"
            data-title="Drug form"
          >
            {{ good.drug_form || "-" }}
          </td>
          <td
            class="purchases-table__cell purchases-table__cell--area"
            data-title="Therapy area"
          >
            {{ getTherapyArea(good.therapy_area) }}
          </td>
          <td
            class="purchases-table__cell purchases-table__cell--price"
            data-title="Estimated Price"
          >
            {{ good.estimated_price || "on request" }}
          </td>
          <td
            class="purchases-table__cell purchases-table__cell--period"
            data-title="Delivery period"
          >
            {{ good.delivery_period || "-" }}
          </td>
          <td class="purchases-table__cell purchases-table__cell--action">
            <button
              aria-label="Add to basket"
              class="button-add-basket"
              title="Add to basket"
              type="button"
              @click.stop.prevent="addGoodToBasket(good)"
            >
              <svg
                fill="none"
                height="12"
                width="12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M7 1a1 1 0 0 0-2 0v4H1a1 1 0 0 0 0 2h4v4a1 1 0 1 0 2 0V7h4a1 1 0 1 0 0-2H7V1Z"
                  fill="#647C9F"
                  fill-opacity=".8"
                  fill-rule="evenodd"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import { useInfiniteScroll, watchDebounced } from "@vueuse/core";
import { computed, onBeforeUnmount, ref } from "vue";

import BaseTableButtonSortCustom from "~/components/base/BaseTable/BaseTableButtonSortCustom.vue";

import { useBasket } from "../components/CabinetPurchasesBasket.vue";
import CabinetPurchasesFiltersGoods from "../components/CabinetPurchasesFiltersGoods.vue";

import goodSchema from "../api/graphql/queries/good.graphql";

const props = defineProps({
  filterByName: {
    default() {
      return {};
    },
    type: [
      Object,
      String,
    ],
  },
});

const filtersGoods = ref(null);
const goodsTable = ref(null);
const filtersSelected = ref(null);
const GOODS_LIMIT = 30;
const sortsByFieldTable = ref(null);

const sortsTable = {
  delivery_period: {
    field: "delivery_period",
    sorts: [
      "ASC",
      "DESC",
      "",
    ],
  },
  dosage_form: {
    field: "dosage_form",
    sorts: [
      "ASC",
      "DESC",
      "",
    ],
  },
  drug_form: {
    field: "drug_form",
    sorts: [
      "ASC",
      "DESC",
      "",
    ],
  },
  estimated_price: {
    field: "estimated_price",
    sorts: [
      "ASC",
      "DESC",
      "",
    ],
  },
  product_name: {
    field: "product_name",
    sorts: [
      "ASC",
      "DESC",
      "",
    ],
  },
};

const {
  result: resultDataTable,
  refetch: refetchDataTable,
  fetchMore: fetchMoreDataTable,
} = useQuery(
  goodSchema,
  () => ({
    filter: {},
    limit: GOODS_LIMIT,
    offset: 0,
  }),
  {
    enabled: true,
  },
);

const dataTable = computed(() => resultDataTable?.value?.good ?? []);

const filtersTable = computed(() => {
  const newFilters = {
    ...props.filterByName,
    ...filtersSelected.value,
  };

  if (!props.filterByName.product_name && newFilters.therapy_areas && newFilters.therapy_areas.length) {
    newFilters.therapy_areas = "";
  }

  return newFilters;
});

const tableParamsRequest = computed(() => ({
  filter: filtersTable.value,
  ...sortsByFieldTable.value,
}));

watchDebounced(
  tableParamsRequest,
  async () => {
    await refetchDataTable({
      ...tableParamsRequest.value,
      limit: GOODS_LIMIT,
      offset: 0,
    });
  },
  {
    debounce: 500,
  },
);

onBeforeUnmount(() => {
  filtersGoods.value.resetFilters();

  sortsByFieldTable.value = {
    orderBy: [],
  };
});

const loadMoreGoods = async () => {
  await fetchMoreDataTable({
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (fetchMoreResult) {
        return {
          good: [
            ...previousResult.good,
            ...fetchMoreResult.good,
          ],
        };
      }

      return previousResult;
    },
    variables: {
      offset: dataTable.value.length,
    },
  });
};

const getTherapyArea = (area) => {
  if (!area) {
    return "-";
  }

  return Array.isArray(area) ? area.join(", ") : area;
};

const addGoodToBasket = ({ id, product_name: productName }) => {
  useBasket.addGoodToBasket(id, "good", productName);
};

useInfiniteScroll(
  goodsTable,
  () => {
    loadMoreGoods();
  },
  {
    distance: 300,
  },
);
</script>

<style scoped>
.purchases-table__wrapper {
  max-height: 600px;
  height: 100%;
  overflow-y: scroll;
}

.purchases-table__row {
  display: grid;
  grid-template-columns:
    minmax(auto, 1fr)
    minmax(auto, 1fr)
    40px;
  padding: 8px 16px;
  background-color: #f6f7fb;
}

@media (min-width: 570px) {
  .purchases-table__row {
    display: grid;
    grid-template-columns:
      minmax(auto, 1fr)
      minmax(auto, 1fr)
      minmax(auto, 1fr)
      minmax(auto, 1fr)
      40px;
    padding: 8px 16px;
    background-color: #f6f7fb;
  }
}

@media (min-width: 768px) {
  .purchases-table__row {
    grid-template-columns:
      minmax(100px, 1fr)
      minmax(auto, 1fr)
      minmax(auto, 1fr)
      minmax(auto, 1fr)
      minmax(120px, 1fr)
      minmax(120px, 1fr)
      40px;
  }
}

@media (min-width: 1340px) {
  .purchases-table__row {
    grid-template-columns:
      minmax(200px, 1fr)
      minmax(100px, 1fr)
      minmax(100px, 1fr)
      minmax(120px, 1fr)
      minmax(120px, 1fr)
      minmax(120px, 1fr)
      40px;
  }
}

@media (max-width: 767px) {
  .purchases-table__header .purchases-table__cell:last-child {
    margin-left: auto;
  }
}

@media (max-width: 767px) {
  .purchases-table__body .purchases-table__cell--inn,
  .purchases-table__body .purchases-table__cell--dosage {
    grid-column: 1;
  }
}

@media (max-width: 767px) {
  .purchases-table__body .purchases-table__cell--dosage,
  .purchases-table__body .purchases-table__cell--form {
    grid-row: 2;
  }
}

@media (max-width: 767px) {
  .purchases-table__body .purchases-table__cell--area {
    grid-row: 1;
    grid-column: 2;
  }
}

@media (max-width: 767px) {
  .purchases-table__body .purchases-table__cell--price {
    grid-row: 1;
    grid-column: 3;
  }
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--inn,
  .purchases-table__body .purchases-table__cell--area {
    grid-column: 1;
  }
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--period,
  .purchases-table__body .purchases-table__cell--price {
    grid-column: 2;
  }
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--inn,
  .purchases-table__body .purchases-table__cell--period,
  .purchases-table__body .purchases-table__cell--action {
    grid-row: 1;
  }
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--price,
  .purchases-table__body .purchases-table__cell--area {
    grid-row: 2;
  }
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--form,
  .purchases-table__body .purchases-table__cell--area {
    grid-row: 3;
  }
}

@media (max-width: 767px) {
  .purchases-table__body .purchases-table__cell {
    padding-bottom: 20px;
  }
}

.purchases-table__body .purchases-table__cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (min-width: 767px) {
  .purchases-table__body .purchases-table__cell {
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 767px) {
  .purchases-table__body .purchases-table__cell--dosage::before,
  .purchases-table__body .purchases-table__cell--form::before {
    content: attr(data-title);
    display: block;
    margin-bottom: 4px;
    line-height: 1.8;
    color: var(--text-color-two);
  }
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--price::before,
  .purchases-table__body .purchases-table__cell--area::before {
    content: attr(data-title);
    display: block;
    margin-bottom: 4px;
    line-height: 1.8;
    color: var(--text-color-two);
  }
}
</style>
