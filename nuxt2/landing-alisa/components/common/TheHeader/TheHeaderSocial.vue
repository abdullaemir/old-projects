<template>
  <ul class="header-social__list">
    <li
      class="header-social__item"
      v-for="(socialNetwork, index) in socialNetworks"
      :key="index"
    >
      <a
        class="header-social__link"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          class="header-social__icon"
          :src="require(`~/assets/icons/social/${socialNetwork.toLowerCase()}--gold.svg`)"
          :alt="socialNetwork"
        />
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TheHeaderSocial",
  data() {
    return {
      socialNetworks: [
        "Instagram",
        "WhatsApp",
        "Telegram",
        "Mail",
      ],
    }
  },
};
</script>

<style scoped>
.header-social__list {
  display: none;
}

@media (min-width: 1024px) {
  .header-social__list {
    display: grid;
    grid-template-columns: repeat(4, 20px);
    grid-template-rows: 20px;
    grid-column-gap: 25px;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0;
    padding-left: 0;
  }
}

.header-social__icon {
  filter: grayscale(100%);
  opacity: 0.75;
  transition-property: filter, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

@media (any-pointer: fine) {
  .header-social__link:hover .header-social__icon,
  .header-social__link:active .header-social__icon {
    filter: grayscale(0);
    opacity: 1;
  }
}
</style>
