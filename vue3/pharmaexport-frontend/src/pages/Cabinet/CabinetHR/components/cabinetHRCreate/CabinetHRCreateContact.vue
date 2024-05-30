<template>
  <div class="logo-download">
    <div class="logo-download__image">
      LOGO
    </div>
    <!--   /TODO: Вставить изображение загруженное с сервера -->
    <img
      class="logo-download__image"
      src="https://pharmcourse.com/img/logo/logo.svg"
    />
    <div class="logo-download__block">
      <p class="logo-download__text">
        Format JPEG, JPG, PNG (max. 10 MB)
      </p>
      <BaseButton
        class="button logo-download__button"
        :modifiers="['square']"
        type="button"
      >
        <img
          alt=""
          src="../../assets/icons/download-icon.svg"
        />
        Attach file
        <input
          accept=".jpeg,.jpg,.png"
          class="logo-download__input"
          type="file"
        />
      </BaseButton>
    </div>
  </div>

  <BaseFormRow>
    <BaseInput
      id="company_name"
      label="Company name"
      name="company_name"
      rules="required"
    />
  </BaseFormRow>
  <BaseFormRow>
    <BaseInput
      id="first_name"
      label="First name"
      name="first_name"
      rules="required"
    />
  </BaseFormRow>

  <BaseFormRow>
    <BaseInput
      id="surname"
      label="Surname"
      name="surname"
      rules="required"
    />
  </BaseFormRow>

  <BaseFormRow>
    <BaseInput
      id="email"
      label="Email"
      name="email"
      rules="required|email"
      type="email"
    />
  </BaseFormRow>

  <BaseFormRow>
    <BaseInputTel
      id="phone"
      label="Phone"
      name="phone"
      rules="required"
      type="tel"
    />
  </BaseFormRow>

  <CabinetDivider />

  <BaseCheckbox
    id="is_distant"
    checked
    name="is_distant"
  >
    <span>Save as template after publishing</span>
  </BaseCheckbox>

  <p class="text__information">
    If you often create the same type of vacancies, save as a template
  </p>

  <BaseFormRow>
    <BaseInput
      id="surname"
      label="Name your template"
      name="surname"
      rules="required"
    />
  </BaseFormRow>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";
import BaseCheckbox from "~/components/base/BaseCheckbox.vue";
import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseInputTel from "~/components/base/BaseInputTel/BaseInputTel.vue";

import CabinetDivider from "../../../components/CabinetDivider.vue";
</script>

<style scoped>
.text__information {
  margin-top: 8px;
  margin-bottom: 16px;
  margin-left: 28px;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;
  color: #647c9f;
}

.button.logo-download__button {
  position: relative;
  width: fit-content;
  padding: 11px 20px;
  border-radius: 8px;
  background: #142269;
}

.logo-download__input {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  opacity: 0;
}

.logo-download {
  display: flex;
  flex-direction: column;
  margin-bottom: 32px;
}

@media (min-width: 768px) {
  .logo-download {
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
  }
}

.logo-download__image {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin-right: 32px;
  margin-bottom: 16px;
  padding: 5px;
  border: 1px solid #e7f0fe;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  color: #647c9f;
}

@media (min-width: 768px) {
  .logo-download__image {
    margin-bottom: 0;
  }
}

.logo-download__block {
  display: flex;
  flex-direction: column;
}

.logo-download__text {
  margin-bottom: 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;
  color: #647c9f;
}
</style>
