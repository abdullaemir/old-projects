<template>
  <div
    id="contact-us"
    class="contacts"
  >
    <TheFooterInformationTitle>Contacts</TheFooterInformationTitle>

    <address class="contacts__item">
      Pharma Global HQ Pte. Ltd.<br />
      68 Circular Road #02-01, 049422,<br />
      Singapore.
    </address>

    <address class="contacts__item">
      Pharma.Global MENA Ltd.<br />
      2426 ResCo-work09, 24th Floor, Al Sila Tower Abu Dhabi Global Market Square,<br />
      Al Maryah Island Abu Dhabi, United Arab Emirates.
    </address>

    <TheFooterInformationLink
      class="contacts__item"
      href="tel:+9710585005214"
    >
      +971(0)585005214
    </TheFooterInformationLink>

    <BaseLink
      class="contacts__icon contacts__item"
      href="https://www.facebook.com/pharmaglobalMENA/"
      rel="noopener noreferrer"
      target="_blank"
    >
      <img
        alt=""
        aria-hidden="true"
        height="36"
        loading="lazy"
        src="/src/assets/logo/facebook.svg"
        width="36"
      />
    </BaseLink>

    <TheFooterInformationLink
      class="contacts__item"
      href="mailto:hi@pharma.global"
    >
      hi@pharma.global
    </TheFooterInformationLink>
  </div>
</template>

<script setup>
import BaseLink from "~/components/base/BaseLink.vue";

import TheFooterInformationLink from "./DefaultLayoutFooterInformationLink.vue";
import TheFooterInformationTitle from "./DefaultLayoutFooterInformationTitle.vue";
</script>

<style scoped>
.contacts {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 50px;
}

@media (min-width: 1000px) {
  .contacts {
    padding-top: 0;
  }
}

.contacts__item {
  display: inline-block;
  font-style: normal;
}

.contacts__item:not(:last-child) {
  margin-bottom: 16px;
}

.contacts__icon {
  display: flex;
}
</style>
