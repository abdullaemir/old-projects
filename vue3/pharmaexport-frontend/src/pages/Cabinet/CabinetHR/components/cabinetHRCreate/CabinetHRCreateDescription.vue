<template>
  <p class="description__title">
    Specialty
  </p>
  <BaseFormRow>
    <BaseSelect
      id="more-service"
      label="Sphere of vacancy"
      name="more-service"
      rules="required"
      tag="title"
      value-key="id"
    />
  </BaseFormRow>
  <BaseFormRow>
    <BaseSelect
      id="more-service"
      label="Specialty"
      name="more-service"
      rules="required"
      tag="title"
      value-key="id"
    />
  </BaseFormRow>
  <BaseFormRow>
    <BaseSelect
      id="more-service"
      label="For whom"
      name="more-service"
      rules="required"
      tag="title"
      value-key="id"
    />
  </BaseFormRow>
  <CabinetDivider />

  <p class="description__title">
    About vacancy
  </p>
  <p class="description__text">
    Where to look for employees?
  </p>
  <BaseFormRow>
    <BaseSelect
      id="country"
      label="Country"
      name="country"
      rules="required"
      tag="title"
      value-key="id"
    />
  </BaseFormRow>

  <BaseFormRow>
    <BaseCheckbox
      id="is_distant"
      checked
      name="is_distant"
    >
      <span>Distant work</span>
    </BaseCheckbox>
  </BaseFormRow>

  <BaseFormRow>
    <BaseSelect
      id="country"
      label="Experience"
      name="country"
      rules="required"
      tag="title"
      value-key="id"
    />
  </BaseFormRow>

  <BaseFormRow>
    <BaseSelect
      id="country"
      label="Employment type"
      name="country"
      rules="required"
      tag="title"
      value-key="id"
    />
  </BaseFormRow>

  <BaseFormRow>
    <BaseSelect
      id="country"
      label="Schedule"
      name="country"
      rules="required"
      tag="title"
      value-key="id"
    />
  </BaseFormRow>
  <p class="description__text">
    Estimated level of salary per month or for the amount of work
  </p>

  <BaseFormRow class="description__from-to">
    <BaseInput
      id="name"
      class="input__first"
      label="from"
      name="name"
      rules="required"
    />
    <BaseInput
      id="surname"
      class="input__second"
      label="to"
      name="surname"
      rules="required"
    />
    <BaseSelect
      id="country"
      label="AED"
      name="country"
      rules="required"
      tag="title"
      value-key="id"
    />
  </BaseFormRow>

  <BaseFormRow>
    <BaseCheckbox
      id="is_distant"
      checked
      name="is_distant"
    >
      <span>Amount range</span>
    </BaseCheckbox>
  </BaseFormRow>

  <CabinetDivider />

  <p class="description__title">
    Tell about the job
  </p>

  <p class="description__text">
    At least 150 characters. Do not write contact details in the description. Do not discriminate against candidates for
    reasons unrelated to the employee's business qualities.
  </p>
  <BaseFormRow>
    <BaseLink
      class="description__rules"
      href="#"
    >
      Rules for posting vacancies
    </BaseLink>
  </BaseFormRow>
  <BaseFormRow>
    <BaseTextarea
      id="comment"
      label="Key responsibilities"
      name="comment"
      rules="required|max:1000"
      type="textarea"
    />
  </BaseFormRow>

  <CabinetDivider />

  <BaseFormRow>
    <BaseSelect
      id="country"
      label="Key skills"
      name="skills"
      rules="required"
      tag="title"
      value-key="id"
    />
  </BaseFormRow>

  <template
    v-for="(language, index) in languages"
    :key="index"
  >
    <BaseFormRow class="description__language">
      <BaseSelect
        id="country"
        class="description__language-first"
        label="Language"
        name="Language"
        rules="required"
        tag="title"
        value-key="id"
      />

      <BaseSelect
        id="country"
        class="description__language-second"
        label="Proficiency level"
        name="level"
        rules="required"
        tag="title"
        value-key="id"
      />
    </BaseFormRow>
  </template>
  <BaseButton
    class="language-add-button"
    type="button"
    @click="addLanguage"
  >
    + Add language
  </BaseButton>
</template>

<script setup>
import { ref } from "vue";

import BaseButton from "~/components/base/BaseButton.vue";
import BaseCheckbox from "~/components/base/BaseCheckbox.vue";
import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseLink from "~/components/base/BaseLink.vue";
import BaseSelect from "~/components/base/BaseSelectBox/BaseSelect.vue";
import BaseTextarea from "~/components/base/BaseTextarea.vue";

import CabinetDivider from "../../../components/CabinetDivider.vue";

const clearLanguage = {
  language_id: null,
  level_id: null,
};

const languages = ref([clearLanguage]);

const addLanguage = () => {
  languages.value.push(clearLanguage);
};
</script>

<style scoped>
.description__title {
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.8;
}

.description__text {
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;
  color: #647c9f;
}

.description__rules {
  font-size: 12px;
  color: #168acd;
  text-decoration: underline;
}

.description__from-to {
  display: grid;
  grid-template-columns: 1fr 1fr 98px;
  grid-column-gap: 0;
}

.description__from-to :deep(.input__first) {
  border-radius: 8px 0 0 8px;
}

.description__from-to :deep(.input__second) {
  border-radius: 0;
}

.description__from-to :deep(.select__select-box) {
  border-radius: 0 8px 8px 0;
}

.description__from-to :deep(.select--open .select__select-box) {
  border-radius: 0 8px 0 0;
}

.description__language {
  grid-row-gap: 0;
}

@media (min-width: 768px) {
  .description__language {
    display: grid;
    grid-template-columns: 42% 58%;
    grid-column-gap: 0;
  }
}

.description__language .select__wrapper {
  margin-bottom: 0;
}

.description__language-first :deep(.select__select-box) {
  border-radius: 8px 8px 0 0;
}

@media (min-width: 768px) {
  .description__language-first :deep(.select__select-box) {
    border-radius: 8px 0 0 8px;
  }
}

@media (min-width: 768px) {
  .description__language-first :deep(.select--open .select__select-box) {
    border-radius: 8px 0 0;
  }
}

.description__language-second :deep(.select__select-box:first-child) {
  border-radius: 0 0 8px 8px;
}

.description__language-second :deep(.select--open .select__select-box) {
  border-radius: 0;
}

@media (min-width: 768px) {
  .description__language-second :deep(.select__select-box:first-child) {
    border-radius: 0 8px 8px 0;
  }
}

@media (min-width: 768px) {
  .description__language-second :deep(.select--open .select__select-box) {
    border-radius: 0 8px 0 0;
  }
}

.language-add-button {
  width: fit-content;
  margin-top: -16px;
  margin-bottom: 24px;
  padding: 12px 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  color: #142269;
}
</style>
