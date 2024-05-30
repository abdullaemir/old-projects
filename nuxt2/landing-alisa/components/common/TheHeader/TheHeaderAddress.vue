<template>
  <address class="header-address">
    <p class="header-address__location">
      <span class="header-address__city">г.Новосибирск</span>
      <span class="header-address__description">Работаю по&nbsp;всей России</span>
    </p>
    <a
      class="header-address__phone"
      href="tel:+79628379442"
    >
      +7&nbsp;(962)&nbsp;837-94-42
    </a>
  </address>
</template>

<script>
export default {
  name: "TheHeaderAddress",
};
</script>

<style scoped>
.header-address {
  display: none;
}

@media (min-width: 768px) {
  .header-address {
    display: block;
    font-style: normal;
  }
}

@media (min-width: 1024px) {
  .header-address {
    width: 100%;
    margin: auto 0 29px;
    padding-top: 20px;
    border-top: 1px solid var(--border-color-secondary);
  }
}

@media (min-width: 1920px) {
  .header-address {
    margin-bottom: 39px;
  }
}

@media (min-width: 768px) {
  .header-address__location {
    margin: 0 0 6px;
    padding-left: 33px;
    background-image: url("~/assets/icons/location--gold.svg");
    background-size: 20px;
    background-position: left top;
    background-repeat: no-repeat;
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0.05em;
  }
}

@media (min-width: 1024px) {
  .header-address__location {
    margin-bottom: 26px;
  }
}

@media (min-width: 1920px) {
  .header-address__location {
    font-size: 14px;
  }
}

@media (min-width: 768px) {
  .header-address__city,
  .header-address__description {
    display: block;
  }
}

@media (min-width: 1024px) {
  .header-address__city {
    margin-bottom: 6px;
  }
}

@media (min-width: 768px) {
  .header-address__phone {
    padding-left: 33px;
    background-image: url("~/assets/icons/phone--gold.svg");
    background-size: 20px;
    background-position: left center;
    background-repeat: no-repeat;
    font-size: 16px;
    font-weight: 300;
  }
}

@media (min-width: 1920px) {
  .header-address__phone {
    font-size: 18px;
  }
}
</style>
