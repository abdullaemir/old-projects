<template>
  <header class="header container--wide">
    <div
      class="header__wrapper--image"
      :class="{ vip: isVip }"
    >
      <img
        class="header__image"
        src="https://sa1s3optim.patientpop.com/assets/images/provider/photos/2353184.jpg"
        alt=""
      />
    </div>

    <span class="header__name"> Anna Meyin </span>

    <span class="header__email"> harleevgmail.com </span>

    <div class="header__wrapper--links">
      <RouterLink
        class="header__link"
        :to="{ name: 'index' }"
      >
        My profile
      </RouterLink>

      <RouterLink
        class="header__link settings"
        :to="{ name: 'index' }"
      >
        <img
          width="17"
          height="16"
          class=""
          src="/src/assets/icons/settings.svg"
          alt=""
        />
      </RouterLink>
    </div>

    <BaseTabs
      ref="tabs"
      default="Courses"
      @switch="scrollToActiveTab"
    >
      <BaseTabItem name="Feed" />

      <BaseTabItem name="Webinars" />

      <BaseTabItem name="Courses" />

      <BaseTabItem name="Vacancies" />

      <BaseTabItem name="FAQ" />
    </BaseTabs>
  </header>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

import BaseTabs from "~/components/base/BaseTabs.vue";
import BaseTabItem from "~/components/base/BaseTabItem.vue";

const isVip = ref(true);

const tabs = ref(null);

const scrollToActiveTab = (selectedTab) => {
  tabs.value.items.forEach((item) => {
    if (item.textContent === selectedTab) {
      item.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  });
};
</script>

<style scoped>
.header {
  margin-top: -20px;
  margin-bottom: 20px;
  padding-top: 24px;
  background-color: #f6f7fa;
  background-image: linear-gradient(#e7f0fe, #e7f0fe);
  background-position: center bottom;
  background-size: 100% 2px;
  background-repeat: no-repeat;
}

@media (min-width: 768px) {
  .header {
    padding-top: 30px;
  }
}

.header__wrapper--image {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  border-radius: 50%;
}

@media (min-width: 768px) {
  .header__wrapper--image {
    width: 84px;
    height: 84px;
    margin-bottom: 16px;
  }
}

.header__wrapper--image.vip {
  position: relative;
  border: 2px solid #ffbd00;
}

.header__wrapper--image.vip::after {
  content: "VIP";
  position: absolute;
  bottom: -12px;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 4px;
  border: 2px solid #ffffff;
  border-radius: 3px;
  font-weight: 700;
  font-size: 10px;
  line-height: 1;
  color: #755100;
  letter-spacing: 0.05em;
  text-align: center;
  background-color: #ffbd00;
  transform: translateX(-50%);
}

.header__image {
  width: 100%;
  height: 100%;
  border: 2px solid #ffffff;
  border-radius: 50%;
  object-fit: cover;
}

.header__name {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
  text-align: center;
}

.header__email {
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 12px;
  color: #647c9f;
  text-align: center;
}

.header__wrapper--links {
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
}

.header__link {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid #d9e6fb;
  border-radius: 6px;
  font-weight: 700;
  font-size: 12px;
  color: #647c9f;
  background-color: #ffffff;
}

.header__link:not(:first-child) {
  margin-left: 10px;
}

.header__link.settings {
  padding: 7px 10px;
}

:deep(.tabs__list) {
  display: flex;
  margin: 0 -16px;
  padding: 0 16px;
  overflow-x: auto;
  scrollbar-width: none;
}

@media (min-width: 768px) {
  :deep(.tabs__list) {
    margin: 0 -32px;
    padding: 0 32px;
  }
}

@media (min-width: 1170px) {
  :deep(.tabs__list) {
    margin: 0;
    padding: 0;
  }
}

:deep(.tabs__list::-webkit-scrollbar) {
  display: none;
}

:deep(.tabs__item:first-child) {
  margin-left: auto;
}

:deep(.tabs__item:last-child) {
  margin-right: auto;
}

:deep(.tabs__button) {
  position: relative;
  padding: 0 10px 20px;
}

:deep(.tabs__button.active) {
  font-weight: 600;
}

:deep(.tabs__button)::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background-color: #ffbd00;
  transform: scale(0);
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

:deep(.tabs__button.active)::after {
  transform: scale(1);
}
</style>
