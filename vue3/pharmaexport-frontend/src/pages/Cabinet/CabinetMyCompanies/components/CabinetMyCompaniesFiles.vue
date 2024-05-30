<template>
  <template v-if="currentCompanyFiles && currentCompanyFiles?.length">
    <CabinetDivider />

    <p class="files__description">
      Attached files
    </p>

    <ul class="files__list">
      <li
        v-for="(file, index) in currentCompanyFiles"
        :key="index"
        class="files__file"
      >
        <BaseLink
          class="files__link"
          download
          :href="file.url"
        >
          {{ file.name }}
        </BaseLink>
      </li>
    </ul>
  </template>
</template>

<script setup>
import BaseLink from "~/components/base/BaseLink.vue";

import CabinetDivider from "../../components/CabinetDivider.vue";

defineProps({
  currentCompanyFiles: {
    default: null,
    type: Array,
  },
});
</script>

<style scoped>
.files__description {
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;
  color: #647c9f;
}

.files__list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0;
  margin-bottom: 24px;
  margin-left: 0;
  padding: 0;
}

.files__file {
  margin-bottom: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.files__file:not(:last-child) {
  margin-right: 16px;
}

.files__link {
  font-size: 12px;
  color: #168acd;
  text-decoration: underline;
}
</style>
