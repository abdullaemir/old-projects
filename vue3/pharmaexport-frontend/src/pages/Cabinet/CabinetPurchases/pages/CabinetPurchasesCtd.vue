<template>
  <CabinetPurchasesFiltersCTDDossier
    ref="filtersCTD"
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
    ref="ctdTable"
    class="purchases-table__wrapper scrollbar"
  >
    <table class="purchases-table">
      <thead class="purchases-table__header">
        <tr class="purchases-table__row">
          <th class="purchases-table__cell">
            Product name
            <BaseTableButtonSortCustom
              :curr-sorts="sortsByFieldTable"
              :data-sort="sortsTable.product_name"
              @update-sorts="sortsByFieldTable = $event"
            />
          </th>
          <th class="purchases-table__cell purchases-table__cell--tablet">
            Dosage form
            <BaseTableButtonSortCustom
              :curr-sorts="sortsByFieldTable"
              :data-sort="sortsTable.dosage_forms"
              @update-sorts="sortsByFieldTable = $event"
            />
          </th>
          <th class="purchases-table__cell">
            Therapy area
            <BaseTableButtonSortCustom
              :curr-sorts="sortsByFieldTable"
              :data-sort="sortsTable.therapy_area"
              @update-sorts="sortsByFieldTable = $event"
            />
          </th>
          <th class="purchases-table__cell purchases-table__cell--mobile">
            Estimated Price
            <BaseTableButtonSortCustom
              :curr-sorts="sortsByFieldTable"
              :data-sort="sortsTable.estimated_price"
              @update-sorts="sortsByFieldTable = $event"
            />
          </th>
          <th class="purchases-table__cell purchases-table__cell--mobile" />
        </tr>
      </thead>

      <tbody class="purchases-table__body">
        <tr
          v-for="ctd in dataTable"
          :key="ctd.id"
          class="purchases-table__row"
        >
          <td class="purchases-table__cell purchases-table__cell--name">
            {{ ctd.product_name || "-" }}
          </td>
          <td
            class="purchases-table__cell purchases-table__cell--form"
            data-title="Dosage form"
          >
            {{ ctd.dosage_form || "-" }}
          </td>
          <td
            class="purchases-table__cell purchases-table__cell--area"
            data-title="Therapy area"
          >
            {{ getTherapyArea(ctd.therapy_area) }}
          </td>
          <td
            class="purchases-table__cell purchases-table__cell--price"
            data-title="Estimated Price"
          >
            {{ ctd.estimated_price || "on request" }}
          </td>
          <td class="purchases-table__cell purchases-table__cell--action">
            <button
              aria-label="Add to basket"
              class="button-add-basket"
              title="Add to basket"
              type="button"
              @click.stop.prevent="addGoodToBasket(ctd)"
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
import { ref, computed, onBeforeUnmount } from "vue";

import BaseTableButtonSortCustom from "~/components/base/BaseTable/BaseTableButtonSortCustom.vue";

import { useBasket } from "../components/CabinetPurchasesBasket.vue";
import CabinetPurchasesFiltersCTDDossier from "../components/CabinetPurchasesFiltersCTDDossier.vue";

import ctdDossierSchema from "../api/graphql/queries/ctdDossier.graphql";

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

const filtersCTD = ref(null);
const ctdTable = ref(null);
const filtersSelected = ref(null);
const CTD_LIMIT = 30;
const sortsByFieldTable = ref(null);

const sortsTable = {
  dosage_forms: {
    field: "dosage_form",
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
  therapy_area: {
    field: "therapy_area",
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
  ctdDossierSchema,
  () => ({
    filter: {},
    limit: CTD_LIMIT,
    offset: 0,
  }),
  {
    enabled: true,
  },
);

const dataTable = computed(() => resultDataTable?.value?.ctdDossier ?? []);

const tableParamsRequest = computed(() => ({
  filter: {
    ...props.filterByName,
    ...filtersSelected.value,
  },
  ...sortsByFieldTable.value,
}));

watchDebounced(
  tableParamsRequest,
  async () => {
    await refetchDataTable({
      ...tableParamsRequest.value,
      limit: CTD_LIMIT,
      offset: 0,
    });
  },
  {
    debounce: 500,
  },
);

onBeforeUnmount(() => {
  filtersCTD.value.resetFilters();

  sortsByFieldTable.value = {
    orderBy: [],
  };
});

const loadMoreCTD = async () => {
  await fetchMoreDataTable({
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (fetchMoreResult) {
        return {
          ctdDossier: [
            ...previousResult.ctdDossier,
            ...fetchMoreResult.ctdDossier,
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
  useBasket.addGoodToBasket(id, "ctd_dossier", productName);
};

useInfiniteScroll(
  ctdTable,
  () => {
    loadMoreCTD();
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
      minmax(100px, 1fr)
      40px;
  }
}

@media (min-width: 1340px) {
  .purchases-table__row {
    grid-template-columns:
      minmax(200px, 1fr)
      minmax(120px, 1fr)
      minmax(120px, 1fr)
      minmax(100px, 1fr)
      40px;
  }
}

@media (max-width: 767px) {
  .purchases-table__header .purchases-table__cell:last-child {
    margin-left: auto;
  }
}

@media (max-width: 767px) {
  .purchases-table__body .purchases-table__cell--name,
  .purchases-table__body .purchases-table__cell--form {
    grid-column: 1;
  }
}

@media (max-width: 767px) {
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
  .purchases-table__body .purchases-table__cell--form {
    grid-column: 1;
  }
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--price,
  .purchases-table__body .purchases-table__cell--area {
    grid-column: 2;
  }
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--action {
    grid-column: 3;
  }
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--name,
  .purchases-table__body .purchases-table__cell--area {
    grid-row: 1;
  }
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--price {
    grid-row: 2;
  }
}

.purchases-table__body .purchases-table__cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--name,
  .purchases-table__body .purchases-table__cell--area,
  .purchases-table__body .purchases-table__cell--price {
    justify-content: center;
  }
}

@media (max-width: 767px) {
  .purchases-table__body .purchases-table__cell {
    padding-bottom: 20px;
  }
}

@media (min-width: 767px) {
  .purchases-table__body .purchases-table__cell {
    display: flex;
    justify-content: center;
  }
}

@media (max-width: 767px) {
  .purchases-table__body .purchases-table__cell--form::before {
    content: attr(data-title);
    display: block;
    margin-bottom: 4px;
    line-height: 1.8;
    color: var(--text-color-two);
  }
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--price::before {
    content: attr(data-title);
    display: block;
    margin-bottom: 4px;
    line-height: 1.8;
    color: var(--text-color-two);
  }
}
</style>
