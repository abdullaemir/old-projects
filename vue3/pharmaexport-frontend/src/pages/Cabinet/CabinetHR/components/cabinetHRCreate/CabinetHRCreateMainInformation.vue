<template>
  <BaseFormRow>
    <BaseSelect
      id="more-service"
      class="vacancies__select-service"
      label="Use a template"
      name="more-service"
      rules="required"
      tag="title"
      value-key="id"
    />
  </BaseFormRow>

  <p class="information">
    You don't have templates yet
  </p>
  <CabinetDivider />

  <BaseFormRow>
    <BaseInput
      id="name"
      label="Name"
      name="name"
      rules="required"
    />
  </BaseFormRow>

  <BaseFormRow>
    <BaseTextarea
      id="description"
      label="Brief job description"
      name="description"
      rules="required|max:200"
      type="textarea"
    />
  </BaseFormRow>
</template>

<script setup>
import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseSelect from "~/components/base/BaseSelectBox/BaseSelect.vue";
import BaseTextarea from "~/components/base/BaseTextarea.vue";

import CabinetDivider from "../../../components/CabinetDivider.vue";
</script>

<style scoped>
.information {
  margin-bottom: 24px;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;
  color: #647c9f;
}
</style>
