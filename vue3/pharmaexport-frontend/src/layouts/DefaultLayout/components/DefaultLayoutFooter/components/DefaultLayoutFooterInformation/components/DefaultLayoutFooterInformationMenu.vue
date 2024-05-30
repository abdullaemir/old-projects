<template>
  <dl class="menu">
    <dt>
      <TheFooterInformationTitle>Products</TheFooterInformationTitle>
    </dt>
    <dd class="menu__list">
      <ul class="menu__list">
        <li
          v-for="(product, productIndex) in products"
          :key="productIndex"
          class="menu__item menu__item--marker"
        >
          <TheFooterInformationLink
            class="navigation__link"
            :href="product.href"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ product.name }}
          </TheFooterInformationLink>
        </li>
      </ul>
    </dd>

    <dt>
      <TheFooterInformationTitle>Regions</TheFooterInformationTitle>
    </dt>
    <dd class="menu__list">
      <ul class="menu__list">
        <li
          v-for="(region, regionIndex) in regions"
          :key="regionIndex"
          class="menu__item menu__item--marker"
        >
          <TheFooterInformationLink
            class="navigation__link"
            :href="region.href"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{ region.name }}
          </TheFooterInformationLink>
        </li>
      </ul>
    </dd>

    <dt class="break">
      <TheFooterInformationTitle>
        <BaseLink
          href="https://pharma.global/partners"
          rel="noopener noreferrer"
          target="_blank"
        >
          Partners
        </BaseLink>
      </TheFooterInformationTitle>
    </dt>

    <dt>
      <TheFooterInformationTitle>Legal</TheFooterInformationTitle>
    </dt>
    <dd class="menu__list">
      <ul class="menu__list">
        <li
          v-for="(document, documentIndex) in documents"
          :key="documentIndex"
          class="menu__item"
        >
          <TheFooterInformationLink
            download
            :href="document.href"
          >
            {{ document.name }}
          </TheFooterInformationLink>
        </li>
      </ul>
    </dd>

    <dt>
      <TheFooterInformationTitle>Contact Us</TheFooterInformationTitle>
    </dt>
    <dd class="menu__list">
      Are there any inquiries or feedback? Do not hesitate to contact us!
    </dd>
  </dl>
</template>

<script setup>
import BaseLink from "~/components/base/BaseLink.vue";

import TheFooterInformationLink from "./DefaultLayoutFooterInformationLink.vue";
import TheFooterInformationTitle from "./DefaultLayoutFooterInformationTitle.vue";

const products = [
  {
    href: "https://pharma.global/products/market",
    name: "Market Access",
  },
  {
    href: "https://pharma.global/products/cashback",
    name: "Cash-back Service",
  },
  {
    href: "https://pharma.global/products/training",
    name: "Online Learning",
  },
];

const regions = [
  {
    href: "https://pharmcourse.com/eu",
    name: "Europe",
  },
  {
    href: "https://mena.pharma.global/",
    name: "MENAT",
  },
  {
    href: "https://pharma.global/regions/rus",
    name: "Russia & CIS",
  },
];

const documents = [
  {
    href: "/docs/certificate-of-incorporation.pdf",
    name: "Certificate of Incorporation",
  },
  {
    href: "/docs/pharma-global-hq-incorporation.pdf",
    name: "Certificate of Incorporation",
  },
  {
    href: "/docs/commercial-license.pdf",
    name: "Commercial License",
  },
  {
    href: "/docs/legal-disclaimer.pdf",
    name: "Legal Disclaimer",
  },
  {
    href: "/docs/terms-of-service.pdf",
    name: "Terms of service",
  },
  {
    href: "/docs/privacy-policy.pdf",
    name: "GDPR policy",
  },
  {
    href: "/docs/cookies.pdf",
    name: "Cookie Policy",
  },
];
</script>

<style scoped>
.menu {
  margin: 0;
  padding-bottom: 50px;
  border-bottom: 1px solid rgb(174 197 215 / 0.2);
}

@media (min-width: 450px) {
  .menu {
    columns: 2;
  }
}

@media (min-width: 1000px) {
  .menu {
    padding-bottom: 0;
    border-bottom: none;
  }
}

.break {
  break-before: column;
}

.menu__list {
  margin: 0;
  padding-left: 0;
}

.menu__list:not(:last-child) {
  margin-bottom: 24px;
}

.menu__item {
  display: flex;
  padding-right: 20px;
}

.menu__item:not(:last-child) {
  margin-bottom: 12px;
}

.menu__item--marker::before {
  content: "—";
}

.menu__item--marker .navigation__link {
  margin-left: 10px;
}
</style>
