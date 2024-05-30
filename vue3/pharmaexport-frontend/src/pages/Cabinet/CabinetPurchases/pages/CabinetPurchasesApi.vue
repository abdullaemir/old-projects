<template>
  <CabinetPurchasesFiltersAPI
    ref="filtersApi"
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
    ref="apiTable"
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
            Therapeutic category
            <BaseTableButtonSortCustom
              :curr-sorts="sortsByFieldTable"
              :data-sort="sortsTable.therapeutic_category"
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
          <th class="purchases-table__cell">
            Type of usage
            <BaseTableButtonSortCustom
              :curr-sorts="sortsByFieldTable"
              :data-sort="sortsTable.type_of_usage"
              @update-sorts="sortsByFieldTable = $event"
            />
          </th>
          <th class="purchases-table__cell" />
        </tr>
      </thead>

      <tbody class="purchases-table__body">
        <tr
          v-for="api in dataTable"
          :key="api.id"
          class="purchases-table__row"
        >
          <td class="purchases-table__cell purchases-table__cell--name">
            {{ api.product_name || "-" }}
          </td>
          <td
            class="purchases-table__cell purchases-table__cell--category"
            data-title="Therapeutic category"
          >
            {{ api.therapeutic_category || "-" }}
          </td>
          <td
            class="purchases-table__cell purchases-table__cell--price"
            data-title="Estimated Price"
          >
            {{ api.estimated_price || "on request" }}
          </td>
          <td
            class="purchases-table__cell purchases-table__cell--type-usage"
            data-title="Type of usage"
          >
            {{ api.type_of_usages || "-" }}
          </td>
          <td class="purchases-table__cell purchases-table__cell--action">
            <button
              aria-label="Add to basket"
              class="button-add-basket"
              title="Add to basket"
              type="button"
              @click.stop.prevent="addGoodToBasket(api)"
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
import CabinetPurchasesFiltersAPI from "../components/CabinetPurchasesFiltersAPI.vue";

import apriSchema from "../api/graphql/queries/apri.graphql";

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

const filtersApi = ref(null);
const apiTable = ref(null);
const filtersSelected = ref(null);
const APRI_LIMIT = 30;
const sortsByFieldTable = ref(null);

const sortsTable = {
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
  therapeutic_category: {
    field: "therapeutic_category",
    sorts: [
      "ASC",
      "DESC",
      "",
    ],
  },
  type_of_usage: {
    field: "type_of_usages",
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
  apriSchema,
  () => ({
    filter: {},
    limit: APRI_LIMIT,
    offset: 0,
  }),
  {
    enabled: true,
  },
);

const dataTable = computed(() => resultDataTable?.value?.apri ?? []);

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
      limit: APRI_LIMIT,
      offset: 0,
    });
  },
  {
    debounce: 500,
  },
);

onBeforeUnmount(() => {
  filtersApi.value.resetFilters();

  sortsByFieldTable.value = {
    orderBy: [],
  };
});

const loadMoreAPI = async () => {
  await fetchMoreDataTable({
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (fetchMoreResult) {
        return {
          apri: [
            ...previousResult.apri,
            ...fetchMoreResult.apri,
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

const addGoodToBasket = ({ id, product_name: productName }) => {
  useBasket.addGoodToBasket(id, "api", productName);
};

useInfiniteScroll(
  apiTable,
  () => {
    loadMoreAPI();
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
  .purchases-table__body .purchases-table__cell--category {
    grid-column: 1;
  }
}

@media (max-width: 767px) {
  .purchases-table__body .purchases-table__cell--category {
    grid-row: 2;
  }
}

@media (max-width: 767px) {
  .purchases-table__body .purchases-table__cell--price {
    grid-row: 1;
    grid-column: 2;
  }
}

@media (max-width: 767px) {
  .purchases-table__body .purchases-table__cell--type-usage {
    grid-row: 1;
    grid-column: 3;
  }
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--category {
    grid-column: 1;
  }
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--type-usage,
  .purchases-table__body .purchases-table__cell--price {
    grid-column: 2;
  }
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--name,
  .purchases-table__body .purchases-table__cell--action,
  .purchases-table__body .purchases-table__cell--type-usage {
    grid-row: 1;
  }
}

@media (max-width: 570px) {
  .purchases-table__body .purchases-table__cell--action {
    grid-column: 3;
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
  .purchases-table__body .purchases-table__cell--type-usage {
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
  .purchases-table__body .purchases-table__cell--category::before {
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
