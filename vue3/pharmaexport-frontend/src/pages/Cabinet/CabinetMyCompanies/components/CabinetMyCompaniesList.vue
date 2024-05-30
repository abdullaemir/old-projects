<template>
  <BaseSlider
    :active-index="activeIndex"
    class="companies__slider"
    :slides-data="companies"
    :space-between="12"
  >
    <template #wrapper-start>
      <div class="companies__item create">
        <RouterLink
          class="companies__link"
          :to="{ name: 'cabinetCompanyCreate' }"
        >
          <img
            alt=""
            aria-hidden="true"
            height="20"
            loading="lazy"
            src="/src/assets/icons/plus.svg"
            width="20"
          />
          Add company
        </RouterLink>
      </div>
    </template>

    <template #base-slide="{ slotProps }">
      <div
        class="companies__item"
        :class="[{ active: slotProps.isActive }]"
      >
        <RouterLink
          :id="slotProps.slide.id"
          class="companies__link"
          :to="{ name: 'cabinetCompany', params: { id: slotProps.slide.id } }"
        >
          <span
            class="companies__status"
            :class="classStatus(slotProps.slide.verification_status)"
          />
          <span class="companies__name">{{ slotProps.slide.name }}</span>
          {{ slotProps.slide.verification_status }}
        </RouterLink>
      </div>
    </template>
  </BaseSlider>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";

import BaseSlider from "~/components/base/BaseSlider.vue";

const props = defineProps({
  companies: {
    required: true,
    type: [
      Array,
      null,
    ],
  },
  currentCompany: {
    default: null,
    required: true,
    type: [
      Object,
      null,
    ],
  },
});

const classStatus = computed(() => (status) => {
  switch (status) {
    case "On verification": {
      return "companies__status--orange";
    }

    case "Unverified company": {
      return "companies__status--red";
    }

    case "Verified company": {
      return "companies__status--green";
    }

    default: {
      return "";
    }
  }
});

const activeIndex = ref(0);

const setActiveIndex = (activeCompanyId) => {
  const companyIndex = props.companies.findIndex((company) => String(company.id) === String(activeCompanyId));

  if (companyIndex > -1) {
    activeIndex.value = companyIndex;
  }
};

onMounted(() => setActiveIndex(props.currentCompany?.id));

watch(
  () => props.currentCompany?.id,
  (companyId) => setActiveIndex(companyId),
);
</script>

<style scoped>
.companies__slider {
  margin: 0 -16px 20px;
  padding: 0 16px 20px;
}

@media (min-width: 768px) {
  .companies__slider {
    margin: 0 0 20px;
    padding: 0 0 20px;
  }
}

:deep(.swiper-slide) {
  width: auto;
}

:deep(.swiper-scrollbar-drag) {
  height: 8px;
  background-color: #647c9f;
}

@media (any-pointer: fine) {
  :deep(.swiper-scrollbar-drag:hover) {
    background-color: #2b4c6a;
  }
}

.companies__slider > :deep(.swiper-scrollbar) {
  bottom: 0;
  left: 16px;
  display: flex;
  align-items: center;
  width: calc(100% - 32px);
  height: 20px;
  background-color: transparent;
  cursor: pointer;
}

@media (min-width: 768px) {
  .companies__slider > :deep(.swiper-scrollbar) {
    left: 0;
    width: 100%;
  }
}

.companies__item {
  position: relative;
  width: 170px;
  height: 90px;
  padding: 16px;
  border: 2px solid var(--border-color-primary);
  border-radius: 8px;
  font-size: 12px;
  color: var(--text-color-five);
}

.companies__item.active {
  border: 2px solid var(--border-color-secondary);
}

.companies__item.create {
  display: flex;
  justify-content: center;
  background-color: #f6f7fb;
}

.companies__link,
.companies__name {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.companies__link {
  font-size: 14px;
}

.companies__item.create .companies__link {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 10px;
  align-items: center;
}

.companies__link::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.companies__name {
  margin-bottom: 2px;
  font-weight: 600;
  color: var(--text-color-five);
}

.companies__status {
  display: inline-block;
  width: 28px;
  height: 6px;
  margin-bottom: 8px;
  border-radius: 40px;
}

.companies__status--green {
  background-color: #34a853;
}

.companies__status--orange {
  background-color: #f29900;
}

.companies__status--red {
  background-color: #f14d43;
}
</style>
