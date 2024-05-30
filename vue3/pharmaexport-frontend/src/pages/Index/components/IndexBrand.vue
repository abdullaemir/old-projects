<template>
  <section class="brand container--wide">
    <h2 class="brand__title">
      Expand Your Pharmaceutical Brand or buy new Brands for Your Healthcare Business
    </h2>
    <ul class="brand__list">
      <li
        v-for="(item, index) in list"
        :key="index"
        class="brand-item brand__item"
      >
        <img
          alt=""
          aria-hidden="true"
          class="brand-item__icon"
          height="52"
          loading="lazy"
          :src="getImg(item.icon)"
          width="52"
        />
        <div>
          <h3 class="brand-item__title">
            {{ item.title }}
          </h3>
          <p class="brand-item__description">
            {{ item.description }}
          </p>
        </div>
      </li>
    </ul>
    <img
      alt=""
      aria-hidden="true"
      class="brand__image"
      height="340"
      loading="lazy"
      src="../assets/images/brand-background-image.png"
      width="355"
    />
  </section>
</template>

<script setup>
const list = [
  {
    description: "Sell to Buyers anytime, anywhere",
    icon: "schedule",
    title: "Grow Your Healthcare Retail or Distribution Business",
  },
  {
    description:
      "Business Analysis of Your Case for Free \n Dealing with Finished Products (Medications, Food " +
      "Supplements, Medical Devices, Pharmacy Cosmetics) as well as Raw Materials (API, etc.)",
    icon: "presentation",
    title: "Zero Cost for Applications",
  },
  {
    description: "World Wide Opportunities for Your Company",
    icon: "world-wide",
    title: "Manage Your Business Better",
  },
];

const getImg = (name) => {
  const path = `../assets/icons/${name}.svg`;
  const modules = import.meta.globEager("../assets/icons/*");

  return modules[path].default;
};
</script>

<style scoped>
.brand {
  position: relative;
  margin-bottom: 32px;
  padding: 324px 16px 24px;
  background-image: radial-gradient(256% 3443% at 95% 146%, #fef3fa 0%, #eef0ff 45%, #e5e6fd 100%);
}

@media (min-width: 768px) {
  .brand {
    margin-bottom: 40px;
    padding: 32px;
  }
}

@media (min-width: 1170px) {
  .brand {
    max-width: 1136px;
    min-height: 420px;
    margin: 0 auto 80px;
    padding: 36px 36px 36px 625px;
    border-radius: 8px;
    background-image: url("../assets/images/brand-background.jpg");
    background-size: contain;
    background-repeat: no-repeat;
  }
}

@media (max-width: 767px) {
  .brand::after {
    content: "";
    position: absolute;
    bottom: calc(100% - 300px);
    left: 0;
    width: 100%;
    height: 28px;
    background-image: linear-gradient(180deg, rgb(0 0 0 / 0) 0%, rgb(0 0 0 / 0.25) 100%);
    opacity: 0.2;
  }
}

.brand__title {
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 18px;
}

.brand__list {
  display: grid;
  grid-row-gap: 28px;
  margin: 0;
  padding-left: 0;
}

@media (min-width: 768px) {
  .brand__list {
    grid-row-gap: 24px;
  }
}

.brand-item {
  display: flex;
}

.brand-item__icon {
  margin-right: 20px;
}

@media (min-width: 768px) {
  .brand-item__icon {
    width: 68px;
    height: 68px;
    margin-right: 32px;
  }
}

.brand-item__title {
  margin-bottom: 6px;
  font-weight: 600;
  font-size: 14px;
}

@media (min-width: 768px) {
  .brand-item__title {
    margin-bottom: 8px;
  }
}

.brand-item__description {
  margin-bottom: 0;
  font-size: 14px;
  white-space: pre-line;
}

.brand__image {
  position: absolute;
  top: -40px;
  left: 50%;
  display: block;
  max-width: 100%;
  height: 340px;
  object-fit: cover;
  transform: translateX(-50%);
}

@media (min-width: 768px) {
  .brand__image {
    display: none;
  }
}

@media (min-width: 1170px) {
  .brand__image {
    top: auto;
    bottom: 0;
    left: 0;
    display: block;
    width: 498px;
    height: 476px;
    transform: none;
  }
}
</style>
