<template>
  <ClientOnly>
    <aside
      v-if="isCookieVisible"
      class="cookie"
    >
      <p class="cookie__text">
        We use cookies and similar technologies to run this website.
        <BaseLink
          class="cookie__link"
          download
          href="/docs/cookies.pdf"
          rel="noopener norefferer"
        >
          See Terms and Conditions
        </BaseLink>
      </p>

      <div class="cookie__buttons-block">
        <BaseButton
          class="cookie__button--cancel"
          @click="createCookieUsedNotification"
        >
          Cancel
        </BaseButton>

        <BaseButton
          :modifiers="['round', 'blue']"
          @click="createCookieUsedNotification"
        >
          Accept
        </BaseButton>
      </div>
    </aside>
  </ClientOnly>
</template>

<script setup>
import { useCookies } from "@vueuse/integrations/useCookies";
import { ClientOnly, useContext } from "vite-ssr";
import { ref } from "vue";

import BaseButton from "~/components/base/BaseButton.vue";
import BaseLink from "~/components/base/BaseLink.vue";

const cookies = useCookies();
const { isClient } = useContext();

const isCookieVisible = ref(false);
const htmlMargin = ref("0px");

if (!cookies.get("isCookieAccepted")) {
  isCookieVisible.value = true;
}

const createCookieUsedNotification = () => {
  const date = new Date("Fri, 31 Dec 9999 23:59:59 GMT");

  isCookieVisible.value = false;

  cookies.set("isCookieAccepted", true, {
    expires: date,
    path: "/",
  });
};

if (isClient) {
  const { documentElement } = document;
  const observer = new MutationObserver(() => {
    htmlMargin.value = documentElement.style.marginRight || "0px";
  });

  observer.observe(documentElement, {
    attributeFilter: ["style"],
  });
}
</script>

<style scoped>
.cookie {
  position: fixed;
  right: calc(16px + v-bind(htmlMargin));
  bottom: 20px;
  z-index: var(--z-index-modal);
  width: calc(100% - 32px);
  padding: 24px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 -1px 46px rgb(0 0 0 / 0.15);
}

@media (min-width: 768px) {
  .cookie {
    right: calc(20px + v-bind(htmlMargin));
    width: 320px;
  }
}

.cookie__text {
  margin-bottom: 12px;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;
  color: #04202f;
  text-align: center;
}

@media (min-width: 768px) {
  .cookie__text {
    text-align: left;
  }
}

.cookie__buttons-block {
  display: flex;
  justify-content: center;
}

.cookie__button--cancel {
  color: #647c9f;
}

.cookie__link {
  color: var(--button-background-color-blue);
}
</style>
