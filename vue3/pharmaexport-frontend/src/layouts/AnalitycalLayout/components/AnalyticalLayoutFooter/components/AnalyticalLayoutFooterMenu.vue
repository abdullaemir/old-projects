<template>
  <dl class="menu">
    <dt>
      <span class="menu__title">Yalla Rx</span>
    </dt>
    <dd class="menu__list">
      <ul class="menu__list">
        <li
          v-for="(product, productIndex) in products"
          :key="productIndex"
          class="menu__item"
        >
          <BaseLink
            class="menu__link"
            :href="product.href"
            @click.prevent="useScrollIntoView"
          >
            {{ product.name }}
          </BaseLink>
        </li>
      </ul>
    </dd>

    <dt class="break">
      <span class="menu__title">Legal</span>
    </dt>
    <dd class="menu__list">
      <ul class="menu__list">
        <li
          v-for="(document, documentIndex) in documents"
          :key="documentIndex"
          class="menu__item"
        >
          <BaseLink
            class="menu__link"
            download
            :href="document.href"
          >
            {{ document.name }}
          </BaseLink>
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script setup>
import { useScrollIntoView } from "@pg/helpers";

import BaseLink from "~/components/base/BaseLink.vue";

const products = [
  {
    href: "#about-us",
    name: "About us",
  },
  {
    href: "#unique-approach",
    name: "Unique approach",
  },
  {
    href: "#for-whom",
    name: "For whom?",
  },
  {
    href: "#methodology-and-types-of-report",
    name: "Methodology and types of report",
  },
  {
    href: "#report-structure",
    name: "Report structure",
  },
  {
    href: "#procedure",
    name: "Procedure",
  },
  {
    href: "#our-partners",
    name: "Our partners",
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
}

@media (min-width: 768px) {
  .menu {
    columns: 2;
    column-gap: 25px;
    margin-left: 110px;
  }
}

@media (min-width: 1170px) {
  .menu {
    column-gap: 155px;
    margin-left: 255px;
  }
}

.menu__title {
  display: inline-block;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
  text-transform: uppercase;
}

.break {
  break-before: column;
}

.menu__list {
  margin: 0;
  padding-left: 0;
}

.menu__list:not(:last-child) {
  margin-bottom: 40px;
}

@media (min-width: 768px) {
  .menu__list:not(:last-child) {
    margin-bottom: 0;
  }
}

.menu__item:not(:last-child) {
  margin-bottom: 16px;
}

.menu__link {
  color: rgba(255, 255, 255, 0.5);
}

@media (any-pointer: fine) {
  .menu__link:hover {
    text-decoration: underline;
  }
}
</style>
