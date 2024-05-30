<template>
  <li class="active item">
    <h3 class="item__title">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </h3>

    <span class="item__date"> 03.02.2022 </span>

    <p class="item__description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </p>

    <BaseLink class="item__link">
      Go to Page
    </BaseLink>
  </li>
  <li class="item">
    <h3 class="item__title">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </h3>

    <span class="item__date"> 03.02.2022 </span>

    <p class="item__description">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit
    </p>
    <img
      class="item__img"
      src="../../../../../../pages/Cabinet/CabinetFirstData/assets/images/promo-background-tablet.jpg"
      alt="">

    <BaseLink class="item__link">
      Go to Page
    </BaseLink>
  </li>
</template>

<script setup>
import BaseLink from "~/components/base/BaseLink.vue";
</script>

<style scoped>
.item {
  padding: 16px 24px;
  border-bottom: 1px solid var(--blue-lightest);
}

@media (min-width: 768px) {
  .item {
    padding: 24px 32px;
  }
}

.item.active {
  background-color: #f6f7fb;
}

.item__title {
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
  color: var(--blue-darkest);
}

.item__date {
  display: block;
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;
  color: var(--blue-light-3);
}

.item__description {
  color: var(--blue-darkest);
}

.item__link {
  display: inline-block;
  margin-top: 16px;
  padding: 12px 24px;
  border-radius: 40px;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
  background-color: var(--button-background-color-blue);
}

.item__img {
  width: 100%;
  margin-top: 16px;
  object-fit: cover;
}
</style>
