<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__title-wrapper">
        <h3 class="footer__title">Алиса Сурикова</h3>
        <h4 class="footer__subtitle">Консультант по финансам и бизнес-процессам</h4>
      </div>
      <address class="footer__address">
        <p class="footer__address-location">
          г.Новосибирск <br />
          Работаю по&nbsp;всей России
        </p>
        <a
          class="footer__address-phone"
          href="tel:+79628379442"
        >
          +7&nbsp;(962)&nbsp;837-94-42
        </a>
      </address>
      <div class="footer__subwrapper">
        <ul class="footer__social-list">
          <li
            class="footer__social-item"
            v-for="(socialNetwork, index) in socialNetworks"
            :key="index"
          >
            <a
              class="footer__social-link"
              href="#"
            >
              <img
                class="footer__social-icon"
                :src="require(`~/assets/icons/social/${socialNetwork.toLowerCase()}--gold.svg`)"
                alt=""
              >
            </a>
          </li>
        </ul>
        <BaseButton
          bordered
          class="footer__button desktop"
          @click="$emit('openModal')"
        >
          Оставить заявку
        </BaseButton>
      </div>
    </div>
    <span class="footer__requisites">
      <b>ИП</b> Сурикова А.С.,
      <b>ОГРНИП</b> 322547600003720,
      <b>ИНН</b> 637771119084
    </span>
    <BaseButton
      bordered
      class="footer__button mobile"
      @click="$emit('openModal')"
    >
      Оставить заявку
    </BaseButton>
  </footer>
</template>

<script>
import BaseButton from "~/components/base/BaseButton.vue";

export default {
  name: "TheFooter",
  components: {
    BaseButton
  },
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
}
</script>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 33px 20px 13px;
  margin: 0 -20px;
  background-color: var(--background-color-secondary);
}

@media (min-width: 768px) {
  .footer {
    margin: 0 -34px;
    padding: 33px 34px 20px;
  }
}

@media (min-width: 1024px) {
  .footer {
    margin: auto 0 0;
    padding: 0;
    background-color: transparent;
  }
}

.footer__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 768px) {
  .footer__wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: flex-start;
    width: 100%;
    margin-bottom: 31px;
  }
}

@media (min-width: 1024px) {
  .footer__wrapper {
    display: none;
  }
}

.footer__subwrapper {
  order: 2;
}

@media (min-width: 768px) {
  .footer__subwrapper {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    grid-column: 3 / 4;
    order: initial;
  }
}

.footer__title-wrapper {
  order: 1;
}

@media (min-width: 768px) {
  .footer__title-wrapper {
    order: initial;
  }
}

.footer__title {
  margin: 0 0 10px;
  font-size: 25px;
  font-weight: 500;
  text-align: center;
}

@media (min-width: 768px) {
  .footer__title {
    margin-bottom: 5px;
    text-align: left;
  }
}

.footer__subtitle {
  width: 100%;
  max-width: 186px;
  margin: 0 0 27px;
  font-weight: 500;
  text-align: center;
  opacity: 0.6;
}

@media (min-width: 768px) {
  .footer__subtitle {
    margin-bottom: 0;
    text-align: left;
  }
}

.footer__social-list {
  display: grid;
  grid-template-columns: repeat(4, 20px);
  grid-template-rows: 20px;
  grid-column-gap: 25px;
  order: 2;
  margin: 0 0 43px;
  padding-left: 0;
}

@media (min-width: 768px) {
  .footer__social-list {
    margin-bottom: 0;
  }
}

.footer__social-icon {
  filter: grayscale(100%);
  opacity: 0.75;
  transition-property: filter, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

@media (any-pointer: fine) {
  .footer__social-link:hover .footer__social-icon,
  .footer__social-link:active .footer__social-icon {
    filter: grayscale(0);
    opacity: 1;
  }
}

.footer__address {
  order: 3;
  margin-bottom: 44px;
  font-style: normal;
}

@media (min-width: 768px) {
  .footer__address {
    grid-column: 2 / 3;
    margin-bottom: 0;
    order: initial;
  }
}

.footer__address-location {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 20px;
  font-size: 12px;
  font-weight: 300;
  text-align: center;
  letter-spacing: 0.05em;
}

@media (min-width: 768px) {
  .footer__address-location {
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 8px;
    text-align: left;
  }
}

.footer__address-location::before {
  content: "";
  width: 20px;
  height: 20px;
  margin-bottom: 5px;
  background-image: url("~/assets/icons/location--gold.svg");
}

@media (min-width: 768px) {
  .footer__address-location::before {
    margin: 0 13px 0 0;
  }
}

.footer__address-phone {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  font-weight: 300;
  text-align: center;
}

@media (min-width: 768px) {
  .footer__address-phone {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
  }
}

@media (min-width: 768px) {
  .footer__address-phone::before {
    margin: 0 13px 0 0;
  }
}

.footer__address-phone::before {
  content: "";
  width: 20px;
  height: 20px;
  margin-bottom: 8px;
  background-image: url("~/assets/icons/phone--gold.svg");
}

.footer__button {
  order: 3;
  max-width: 218px;
  margin-bottom: 27px;
}

@media (min-width: 768px) {
  .footer__button {
    margin-bottom: 21px;
  }
}

@media (max-width: 767px) {
  .footer__button.desktop {
    display: none;
  }
}

@media (min-width: 768px) {
  .footer__button.mobile {
    display: none;
  }
}

.footer__requisites {
  display: block;
  order: 4;
  text-align: center;
  letter-spacing: 0.04em;
}
</style>
