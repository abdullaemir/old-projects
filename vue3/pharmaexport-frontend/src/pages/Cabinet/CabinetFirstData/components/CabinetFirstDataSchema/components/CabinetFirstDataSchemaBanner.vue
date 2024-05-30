<template>
  <div class="banner">
    <p class="banner__title">
      FirstData
    </p>
    <p class="banner__text">
      Work up predictive algorithms and data models for purchase prediction
    </p>
  </div>
</template>

<style scoped>
.banner {
  margin: 0 -16px;
  padding: 52px 16px;
  color: var(--white);
  text-align: center;
  background-image: url("../../../assets/images/schema-banner-mobile.svg");
  background-size: cover;
}

@media (min-width: 768px) {
  .banner {
    margin: 0;
    padding: 37px;
    border-radius: 8px;
    background-image: url("../../../assets/images/schema-banner-tablet.svg");
  }
}

@media (min-width: 1340px) {
  .banner {
    padding: 60px 37px 68px;
  }
}

.banner__title {
  margin-bottom: 8px;
  font-weight: 800;
  font-size: 24px;
  line-height: 1.67;
}

@media (min-width: 768px) {
  .banner__title {
    font-size: 28px;
    line-height: 1.43;
  }
}

.banner__text {
  font-size: 16px;
}

@media (min-width: 768px) {
  .banner__text {
    max-width: 342px;
    margin: 0 auto;
  }
}
</style>
