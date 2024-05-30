<template>
  <div class="subscription-option">
    <div class="subscription-option__box-img">
      <img
        alt=""
        class="subscription-option__img"
        :src="getImg(optionData.img)"
      />
    </div>
    <p class="subscription-option__title">
      {{ optionData.title }}
    </p>
    <p
      class="subscription-option__price"
      :class="[`subscription-option__price--${optionData.priceColor}`]"
    >
      <sup
        v-if="optionData.price !== 'Free'"
        class="subscription-option__price-currency"
      >&#36;</sup>
      {{ optionData.price }}
    </p>
    <p class="subscription-option__amount-vacancy">
      {{ optionData.amountVacancy }}
    </p>
    <p class="subscription-option__amount-vacancy-desc">
      Number of vacancies
    </p>
    <p class="subscription-option__duration">
      {{ optionData.duration }}
    </p>
    <p class="subscription-option__duration-desc">
      Duration
    </p>
    <BaseButton
      class="subscription-option__button-send"
      :modifiers="['medium', 'round', 'purple']"
      type="submit"
    >
      Yalla!
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";

defineProps({
  optionData: {
    // eslint-disable-next-line no-empty-function
    default: () => {},
    type: Object,
  },
});

const getImg = (name) => {
  const path = `../assets/images/${name}`;
  const modules = import.meta.globEager("../assets/images/*");

  return modules[path].default;
};
</script>

<style scoped>
.subscription-option {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.subscription-option__box-img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
}

.subscription-option__img {
  height: 140%;
  object-fit: cover;
}

.subscription-option__title {
  margin-top: 12px;
  margin-bottom: 30px;
  font-weight: 600;
  text-transform: uppercase;
}

.subscription-option__price {
  margin-bottom: 30px;
  font-size: 24px;
  line-height: 1.88;
  text-transform: uppercase;
}

.subscription-option__price-currency {
  font-size: 16px;
  line-height: 1.5;
}

.subscription-option__price--orange {
  font-size: 32px;
  line-height: 1.4;
  color: #ff4f13;
}

.subscription-option__price--purple {
  font-size: 32px;
  line-height: 1.4;
  color: #e80061;
}

.subscription-option__amount-vacancy,
.subscription-option__duration {
  font-weight: 600;
}

.subscription-option__amount-vacancy-desc,
.subscription-option__duration-desc {
  font-size: 14px;
  color: #647c9f;
}

.subscription-option__amount-vacancy-desc {
  margin-bottom: 36px;
}

.subscription-option__duration-desc {
  margin-bottom: 60px;
}

.subscription-option__button-send {
  width: 100%;
}

@media (min-width: 768px) {
  .subscription-option__button-send {
    width: auto;
  }
}
</style>
