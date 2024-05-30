<template>
  <BaseModal
    id="analytics-registration"
    class="analytics-registration"
  >
    <form
      class="analytics-registration__form"
      novalidate
      @submit.prevent
    >
      <h2 class="analytics-registration__title">Registration</h2>

      <BaseFormRow>
        <BaseInput
          id="surname"
          label="Surname"
          name="surname"
          rules="required"
        />

        <BaseInput
          id="password"
          label="Enter password"
          name="password"
          rules="required"
          type="password"
        />
      </BaseFormRow>

      <p
        class="analytics-registration__subtitle"
        :class="{ 'error': errorMessage }"
      >
        Choose your sphere of business
      </p>

      <BaseError
        :error-message="errorMessage ?? ''"
        :is-focus="false"
        :meta="meta"
      />

      <ul
        ref="sphereBusiness"
        class="analytics-registration__list"
      >
        <li
          v-for="item in dataSphere"
          :key="item.id"
          class="analytics-registration__item"
        >
          <fieldset
            class="analytics-registration__group"
            :disabled="Boolean(formData?.type_company)"
          >
            <button
              class="analytics-registration__tag"
              :class="{ active: sphereBusinessActive === item.id }"
              type="button"
              @click="changeSphereBusiness(item.id)"
            >
              {{ item.title }}
            </button>

            <ul
              v-show="sphereBusinessActive === item.id"
              class="scrollbar analytics-registration__sphere"
            >
              <li
                v-for="sphere in item.items"
                :key="sphere.value"
              >
                <label
                  class="analytics-registration__business"
                  :class="{ active: activeSphere === sphere.value }"
                >
                  <input
                    :checked="activeSphere === sphere.value"
                    class="visually-hidden"
                    name="type_company"
                    type="radio"
                    :value="sphere.value"
                    @change.prevent="changeSphere(sphere.value)"
                  />
                  {{ sphere.title }}
                </label>
              </li>
            </ul>
          </fieldset>
        </li>
      </ul>

      <BaseButton
        class="steps__button--registration"
        :modifiers="['large', 'round', 'purple']"
        @click.stop.prevent="registration"
      >
        Yalla
      </BaseButton>
    </form>
  </BaseModal>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { useField, useForm } from "vee-validate";
import { ref, onMounted } from "vue";

import BaseButton from "~/components/base/BaseButton.vue";
import BaseError from "~/components/base/BaseError.vue";
import BaseFormRow from "~/components/base/BaseFormRow.vue";
import BaseInput from "~/components/base/BaseInput.vue";
import BaseModal from "~/components/base/BaseModal.vue";

const props = defineProps({
  formData: {
    default: null,
    type: Object,
  },
});

const emits = defineEmits({
  changeStep: () => true,
  completeRegistration: () => true,
});

const { handleSubmit, resetForm, values, setErrors, setValues } = useForm();
const { errorMessage, handleChange, handleReset, meta } = useField("type_company", "required", {
  type: "radio",
  uncheckedValue: false,
});

const activeSphere = ref("");
const sphereBusiness = ref("");
const sphereBusinessActive = ref("");

const dataSphere = [
  {
    id: "group_1",
    items: [
      {
        title: "Hospital",
        value: "hospital",
      },
      {
        title: "Clinic",
        value: "clinic",
      },
      {
        title: "Institution",
        value: "institution",
      },
    ],
    title: "Hospital / Clinic / Institution",
  },
  {
    id: "group_2",
    items: [
      {
        title: "Distributor",
        value: "distributor",
      },
      {
        title: "Trader",
        value: "trader",
      },
      {
        title: "Scientific Office",
        value: "scientific_office",
      },
    ],
    title: "Distributor / Trader / Scientific Office",
  },
  {
    id: "group_3",
    items: [
      {
        title: "Pharmaceutical Manufacturer",
        value: "pharmaceutical_manufacturer",
      },
      {
        title: "API Manufacturer",
        value: "api_manufacturer",
      },
    ],
    title: "Pharmaceutical Manufacturer / API Manufacturer",
  },
  {
    id: "group_4",
    items: [
      {
        title: "Retail Pharmacy",
        value: "retail_pharmacy",
      },
      {
        title: "Chain pharmacy",
        value: "chain_pharmacy",
      },
    ],
    title: "Retail Pharmacy / Chain pharmacy",
  },
];

const changeSphere = (value) => {
  activeSphere.value = value;
  handleChange(value);
};

const changeSphereBusiness = (id) => {
  if (sphereBusinessActive.value !== id) {
    sphereBusinessActive.value = id;
    activeSphere.value = "";
    handleReset();
  }
};

const getDataForm = handleSubmit((data) => data);
const registration = handleSubmit(() => emits("completeRegistration"));

defineExpose({
  getDataForm,
  resetForm,
  setErrors,
  values,
});

onMounted(() => {
  setValues({
    company_name: props.formData?.name_company || null,
  });

  /**
   * Если входной параметр type_company не пустой, то для каждой группы в dataSphere перебирается массив items.
   * Соответствующая группа становится активной в случае,
   * если в ней был найден элемент со значением равным входному параметру type_company.
   * В таком случае сначала прерывается перебор по массиву items,
   * затем на своём следующем вхождении прерывается перебор групп.
   */
  if (props.formData?.type_company) {
    for (const group in dataSphere) {
      if (Object.prototype.hasOwnProperty.call(dataSphere, group)) {
        const spheres = dataSphere[group].items;

        if (sphereBusinessActive.value) {
          break;
        }

        for (const sphere in spheres) {
          if (
            Object.prototype.hasOwnProperty.call(spheres, sphere) &&
            spheres[sphere].value === props.formData.type_company
          ) {
            sphereBusinessActive.value = dataSphere[group].id;

            break;
          }
        }
      }
    }

    changeSphere(props.formData.type_company);
  } else {
    onClickOutside(sphereBusiness, () => {
      if (!activeSphere.value) {
        sphereBusinessActive.value = "";
      }
    });
  }
});
</script>

<style scoped>
@media (min-width: 768px) and (max-width: 1169px) {
  :global(.modal-overlay) {
    padding: 0 !important;
  }
}

@media (min-width: 768px) and (max-width: 1169px) {
  :global(.modal.analytics-registration) {
    max-width: none;
    height: 100%;
    padding: 0 32px 100px;
    border-radius: 0;
  }
}

@media (min-width: 1170px) {
  :global(.modal.analytics-registration) {
    max-width: 948px;
    padding: 48px 96px;
  }
}

@media (max-width: 768px) {
  :global(.modal.analytics-registration .modal__header) {
    margin-bottom: 20px;
  }
}

@media (min-width: 768px) and (max-width: 1169px) {
  :global(.modal.analytics-registration .modal__header) {
    height: 72px;
    display: flex;
    align-items: center;
    margin: 0 -32px 40px;
    padding: 0 32px;
    box-shadow: var(--modal-header-box-shadow);
  }
}

@media (min-width: 768px) and (max-width: 1169px) {
  :global(.modal.analytics-registration .modal__button) {
    top: 16px;
    right: 16px;
  }
}

@media (max-width: 1169px) {
  .analytics-registration__form {
    width: 100%;
    max-width: 368px;
    margin: 0 auto;
  }
}

@media (min-width: 768px) and (max-width: 1169px) {
  :deep(.form__row) {
    grid-auto-flow: row;
  }
}

.analytics-registration__title {
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 24px;
}

.analytics-registration__subtitle {
  margin: 32px 0 16px;
  font-weight: 500;
  font-size: 14px;
  color: #8292a1;

}

.analytics-registration__subtitle.error {
  color: var(--pink);
}

.analytics-registration__list {
  display: grid;
  grid-row-gap: 16px;
  align-items: start;
  margin: 0 0 32px;
  padding-left: 0;
}

@media (min-width: 1170px) {
  .analytics-registration__list {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 56px 20px;
  }
}

.analytics-registration__item {
  display: inline-grid;
}

@media (min-width: 1170px) {
  .analytics-registration__item {
    position: relative;
  }

  .analytics-registration__item:nth-child(2n+4)::after {
    content: "";
    position: absolute;
    top: -28px;
    right: 0;
    width: calc(100% * 2 + 20px);
    height: 1px;
    background-color: #e7f0fe;
  }
}

.analytics-registration__group {
  display: grid;
  padding: 0;
  border: none;
}

.analytics-registration__tag {
  padding: 22px 20px;
  border: 2px solid var(--border-color-primary);
  border-radius: 8px;
  color: var(--text-color-two);
  white-space: nowrap;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  transition-property: color, border-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 768px) {
  .analytics-registration__tag {
    color: rgba(130, 146, 161, 0.5);
  }
}

.analytics-registration__tag:disabled {
  pointer-events: none;
}

.analytics-registration__tag.active {
  border-color: #f2003d;
  color: var(--text-color-one);
}

.analytics-registration__sphere {
  display: grid;
  grid-auto-flow: column;
  column-gap: 16px;
  height: max-content;
  margin: 20px 0 12px;
  padding: 0 0 28px;
  border-bottom: 1px solid #e7f0fe;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}

@media (min-width: 420px) {
  .analytics-registration__sphere {
    justify-content: start;
  }
}

@media (min-width: 1170px) {
  .analytics-registration__sphere {
    padding-bottom: 0;
    border-bottom: none;
  }
}

.analytics-registration__sphere::-webkit-scrollbar {
  display: none;
}

.analytics-registration__business {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  border: 1px solid var(--border-color-primary);
  border-radius: 30px;
  white-space: nowrap;
  transition-property: color, border-color, background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  cursor: pointer;
}

.analytics-registration__business.active {
  border: 2px solid #f2003d;
}

@media (min-width: 1170px) {
  .steps__button--registration {
    max-width: 368px;
  }
}
</style>
