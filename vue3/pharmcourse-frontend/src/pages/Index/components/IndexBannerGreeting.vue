<template>
  <section class="banner-greeting">
    <h1 class="banner-greeting__title">
      Online Education for Healthcare Professionals
    </h1>

    <p class="banner-greeting__description">
      Register and get 3 manuals for healthcare professionals and 300 PharmaCoins bonuses
    </p>

    <button
      class="banner-greeting__button"
      type="button"
    >
      Register and get gifts
    </button>

    <span class="banner-greeting__tag">CPD</span>
  </section>
</template>

<style scoped>
.banner-greeting {
  position: relative;
  margin-bottom: 20px;
  padding: 20px 16px 24px;
  border-radius: 8px;
  background-color: #f4f6f8;
  background-image: url("../assets/images/IndexBannerGreeting/greeting.png");
  background-position: right -30px bottom;
  background-size: 320px;
  background-repeat: no-repeat;
}

@media (min-width: 768px) {
  .banner-greeting {
    padding: 20px 32px 24px;
    background-position: right bottom -23px;
  }
}

@media (min-width: 1170px) {
  .banner-greeting {
    padding: 30px 20px 35px;
  }
}

.banner-greeting__tag {
  position: absolute;
  top: 20px;
  right: 16px;
  padding: 2px 4px;
  border-radius: 3px;
  font-weight: 600;
  font-size: 10px;
  color: #ffffff;
  background-color: #c377e0;
}

.banner-greeting__title {
  max-width: 75%;
  width: 100%;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
}

.banner-greeting__description {
  max-width: 55%;
  width: 100%;
  margin-bottom: 14px;
}

@media (min-width: 768px) {
  .banner-greeting__description {
    max-width: 350px;
  }
}

@media (min-width: 1170px) {
  .banner-greeting__description {
    max-width: none;
  }
}

.banner-greeting__button {
  position: relative;
  max-width: 168px;
  width: 100%;
  padding: 6px 20px 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 12px;
  color: var(--button-color-primary);
  background-color: var(--button-background-primary);
  cursor: pointer;
}

@media (any-pointer: fine) {
  .banner-greeting__button:hover,
  .banner-greeting__button:focus {
    background-color: var(--button-background-primary-hover);
  }
}

.banner-greeting__button:active {
  background-color: var(--button-background-primary-active);
}

.banner-greeting__button::after {
  content: "";
  position: absolute;
  top: 50%;
  right: 10px;
  width: 5px;
  height: 8px;
  background-image: url("~/assets/icons/caret.svg");
  background-repeat: no-repeat;
  transform: translateY(-50%);
}
</style>
