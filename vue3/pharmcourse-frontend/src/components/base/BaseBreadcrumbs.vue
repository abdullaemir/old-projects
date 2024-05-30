<template>
  <div class="breadcrumb">
    <div
      v-for="(breadcrumb, index) in breadcrumbs"
      :key="index"
      class="breadcrumb__item"
    >
      <RouterLink
        v-if="breadcrumb.to"
        class="breadcrumb__link"
        :to="breadcrumb.to"
      >
        <svg
          class="breadcrumb__arrow"
          width="12"
          height="12"
        >
          <path
            fill="var(--breadcrumb-fill)"
            d="M11.3 5.3v1.4h-8l3.6 3.7-.9 1L.7 6 6 .7l1 .9-3.8 3.7h8.1Z"
          />
        </svg>

        {{ breadcrumb.name }}

        <svg
          class="breadcrumb__separator"
          width="5"
          height="8"
          fill="none"
        >
          <path
            stroke="var(--breadcrumb-fill)"
            stroke-linecap="round"
            d="m1 1 3 3-3 3"
          />
        </svg>
      </RouterLink>
      <a v-if="breadcrumb.href" :href="breadcrumb.href" class="breadcrumb__link">
        <svg
          class="breadcrumb__arrow"
          width="12"
          height="12"
        >
          <path
            fill="var(--breadcrumb-fill)"
            d="M11.3 5.3v1.4h-8l3.6 3.7-.9 1L.7 6 6 .7l1 .9-3.8 3.7h8.1Z"
          />
        </svg>

        {{ breadcrumb.name }}

        <svg
          class="breadcrumb__separator"
          width="5"
          height="8"
          fill="none"
        >
          <path
            stroke="var(--breadcrumb-fill)"
            stroke-linecap="round"
            d="m1 1 3 3-3 3"
          />
        </svg>
      </a>
    </div>
  </div>

</template>

<script setup>
defineProps({
  breadcrumbs: {
    required: true,
    type: Array,
  },
});
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: var(--breadcrumb-margin-bottom-mobile);
}

@media (min-width: 1024px) {
  .breadcrumb {
    margin-bottom: var(--breadcrumb-margin-bottom-desktop);
  }
}

.breadcrumb__item {
  display: flex;
  align-items: center;
}

.breadcrumb__item:not(:last-child) {
  display: none;
}

@media (min-width: 1024px) {
  .breadcrumb__item:not(:last-child) {
    display: flex;
  }
}

.breadcrumb__link {
  display: flex;
  align-items: center;
  font-weight: var(--breadcrumb-font-weight);
  font-size: var(--breadcrumb-font-size);
  color: var(--breadcrumb-color);
  transition-property: color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 1024px) {
  .breadcrumb__item:not(:first-child) .breadcrumb__link {
    padding-left: 10px;
  }
}

@media (any-pointer: fine) {
  .breadcrumb__link:hover,
  .breadcrumb__link:focus {
    color: var(--breadcrumb-color-hover);
  }

  .breadcrumb__link:active {
    color: var(--breadcrumb-color-active);
  }
}

.breadcrumb__separator {
  margin-left: 10px;
}

.breadcrumb__item:last-child .breadcrumb__separator {
  display: none;
}

.breadcrumb__arrow {
  margin-right: 8px;
}

@media (min-width: 1024px) {
  .breadcrumb__arrow {
    display: none;
  }
}
</style>
