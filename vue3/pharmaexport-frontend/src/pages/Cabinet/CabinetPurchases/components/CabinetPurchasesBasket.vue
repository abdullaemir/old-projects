<template>
  <ClientOnly>
    <Transition name="fade-widget-lg">
      <button
        v-if="!isOpenBasket"
        :aria-expanded="!isOpenBasket"
        aria-label="Open basket"
        class="basket-widget--lg"
        title="Open basket"
        type="button"
        @click.stop.prevent="openBasket"
      />
    </Transition>
    <Transition name="fade-widget-sm">
      <div
        v-if="!isOpenBasket"
        class="basket-widget--sm"
        @click.stop.prevent="openBasket"
      >
        <span class="basket-widget__title">
          Send request about goods:
          <span class="basket-widget__count">{{ backedData.length }}</span>
        </span>
        <button
          aria-label="Open basket"
          class="basket-widget__button"
          title="Open basket"
          type="button"
        >
          <svg
            fill="none"
            height="5"
            width="8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m1 4 3-3 3 3"
              stroke="#647C9F"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-opacity=".8"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>
    </Transition>
    <Transition
      name="fade"
      @after-leave="showPageScroll"
      @before-enter="hidePageScroll"
    >
      <div
        v-show="isOpenBasket"
        id="basket"
        ref="basket"
        class="basket"
      >
        <div class="basket__header">
          <button
            :aria-controls="id"
            :aria-expanded="isOpenBasket"
            aria-label="Close basket"
            class="basket__button"
            type="button"
            @click="closeBasket"
          >
            <svg
              fill="none"
              height="24"
              stroke="var(--modal-cross-stroke)"
              stroke-width="2"
              width="24"
            >
              <path
                d="M0-1h17.997"
                transform="matrix(0.718037 -0.696004 0.718037 0.696004 6.07812 18.5264)"
              />
              <path
                d="M0-1h17.998"
                transform="matrix(0.718638 0.695384 -0.718638 0.695384 5 6)"
              />
            </svg>
          </button>
        </div>
        <p class="basket__title">
          Send request about goods:
          <span class="basket__count">{{ backedData.length }}</span>
        </p>

        <div class="basket-content scrollbar">
          <div
            v-for="good in backedData"
            :key="good.id"
            class="good"
          >
            <div>
              <p class="good__name">
                {{ good.product_name }}
              </p>
              <p class="good__option">
                {{ good.dosage_form || good.type_of_usages }}
              </p>
              <p class="good__option">
                {{
                  good.therapy_area
                    ? Array.isArray(good.therapy_area)
                      ? good.therapy_area.join(", ")
                      : good.therapy_area
                    : "" || good.therapeutic_category
                }}
              </p>
            </div>

            <button
              :aria-controls="good.id"
              aria-label="Close basket"
              class="good__button"
              type="button"
              @click="deleteGood(good)"
            >
              <svg
                fill="none"
                height="18"
                width="18"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="a"
                  height="18"
                  maskUnits="userSpaceOnUse"
                  width="18"
                  x="0"
                  y="0"
                >
                  <path
                    d="M0 0h18v18H0z"
                    fill="#C4C4C4"
                  />
                </mask>
                <g mask="url(#a)">
                  <path
                    d="M4 6h10v9c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1V6ZM1 6h16"
                    stroke="#AEBED6"
                    stroke-width="2"
                  />
                  <rect
                    fill="#AEBED6"
                    height="4"
                    rx="1"
                    width="2"
                    x="6"
                    y="9"
                  />
                  <rect
                    fill="#AEBED6"
                    height="4"
                    rx="1"
                    width="2"
                    x="10"
                    y="9"
                  />
                  <path
                    d="M5 3c0-.6.4-1 1-1h6c.6 0 1 .4 1 1v3H5V3Z"
                    stroke="#AEBED6"
                    stroke-width="2"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>

        <div class="basket__footer">
          <BaseButton
            class="basket__button-send"
            :modifiers="['round', 'medium', 'blue']"
            @click="sendRequestBasket"
          >
            Yalla
          </BaseButton>
          <p class="basket__description-send">
            Estimated price is approximate value and can be changed
          </p>
        </div>
      </div>
    </Transition>

    <TheModalRequestSendSuccess />
  </ClientOnly>
</template>

<script>
/* eslint-disable max-lines */
import { useMutation, useQuery } from "@vue/apollo-composable";
import { onClickOutside, useBreakpoints } from "@vueuse/core";
import { ClientOnly } from "vite-ssr";
import { ref, computed, reactive, watchEffect } from "vue";

import UseMetric from "~/assets/scripts/functions/UseMetric.js";
import BaseButton from "~/components/base/BaseButton.vue";
import { useModal } from "~/components/base/BaseModal.vue";
import { useNotification } from "~/components/base/BaseNotification.vue";
import TheModalRequestSendSuccess from "~/components/common/TheModalRequestSendSuccess.vue";

import addPurchaseToCartApiSchema from "../api/graphql/mutations/addPurchaseToCartApi.graphql";
import addPurchaseToCartCtdSchema from "../api/graphql/mutations/addPurchaseToCartCtd.graphql";
import addPurchaseToCartInnSchema from "../api/graphql/mutations/addPurchaseToCartInn.graphql";
import deletePurchaseFromCartApiSchema from "../api/graphql/mutations/deletePurchaseFromCartApi.graphql";
import deletePurchaseFromCartCtdSchema from "../api/graphql/mutations/deletePurchaseFromCartCtd.graphql";
import deletePurchaseFromCartInnSchema from "../api/graphql/mutations/deletePurchaseFromCartInn.graphql";
import sendPurchaseRequestApiSchema from "../api/graphql/mutations/sendPurchaseRequestApi.graphql";
import sendPurchaseRequestCtdSchema from "../api/graphql/mutations/sendPurchaseRequestCtd.graphql";
import sendPurchaseRequestInnSchema from "../api/graphql/mutations/sendPurchaseRequestInn.graphql";
import getPurchaseForCartApiSchema from "../api/graphql/queries/getPurchaseForCartApi.graphql";
import getPurchaseForCartCtdSchema from "../api/graphql/queries/getPurchaseForCartCtd.graphql";
import getPurchaseForCartInnSchema from "../api/graphql/queries/getPurchaseForCartInn.graphql";

export const useBasket = reactive({
  addGoodToBasket(id, type, productName) {
    this.store.newGoodBasket = {
      id,
      type,
      productName,
    };
  },

  store: {
    newGoodBasket: null,
  },
});

export default {
  name: "CabinetPurchasesBasket",
  components: {
    BaseButton,
    ClientOnly,
    TheModalRequestSendSuccess,
  },

  // eslint-disable-next-line vue/component-api-style
  expose: [],

  props: {
    currentTab: {
      default: "",
      type: String,
    },
    id: {
      default: "",
      type: [
        String,
        Number,
      ],
    },
  },

  setup(props) {
    const basketStore = useBasket;
    const basket = ref(null);

    const openedBasket = ref(false);
    const scrollPosition = ref(0);
    const scrollbarWidth = ref(0);

    const breakpoints = useBreakpoints({
      showWidget: 1650,
      tablet: 768,
    });

    const showWidgetBreakpoints = ref(breakpoints.greater("showWidget"));
    const tabletBreakpoints = ref(breakpoints.greater("tablet"));

    const isOpenBasket = computed(() => {
      if (showWidgetBreakpoints.value) {
        return true;
      }

      return openedBasket.value;
    });

    const hidePageScroll = () => {
      if (isOpenBasket.value && !tabletBreakpoints.value) {
        const { documentElement } = document;

        documentElement.style.cssText = `
          position: fixed;
          top: -${scrollPosition.value}px;
          right: 0;
          left: 0;
          margin-right: ${scrollbarWidth.value}px;
          overflow-y: hidden;
        `;
      }
    };

    const showPageScroll = () => {
      if (!isOpenBasket.value && !tabletBreakpoints.value) {
        const { documentElement } = document;

        documentElement.removeAttribute("style");
        window.scrollTo(0, scrollPosition.value);
      }
    };

    const openBasket = () => {
      const { documentElement } = document;

      openedBasket.value = true;
      scrollPosition.value = window.scrollY;
      scrollbarWidth.value = window.innerWidth - documentElement.clientWidth;
    };

    const { result: resultBasketInn } = useQuery(getPurchaseForCartInnSchema, () => ({
      type: "good",
    }));

    const { mutate: innAddMutate, onDone: innAddOnDone } = useMutation(addPurchaseToCartInnSchema, {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: getPurchaseForCartInnSchema,
          variables: {
            type: "good",
          },
        },
      ],
    });

    const { mutate: innDeleteMutate, onDone: innDeleteOnDone } = useMutation(deletePurchaseFromCartInnSchema, {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: getPurchaseForCartInnSchema,
          variables: {
            type: "good",
          },
        },
      ],
    });

    innAddOnDone((result) => {
      useNotification.openNotification(result.extensions.addPurchaseToCart.message);
    });

    innDeleteOnDone((result) => {
      useNotification.openNotification(result.extensions.deletePurchaseFromCart.message);
    });

    const { result: resultBasketCtd } = useQuery(getPurchaseForCartCtdSchema, () => ({
      type: "ctd_dossier",
    }));

    const { mutate: ctdAddMutate, onDone: ctdAddOnDone } = useMutation(addPurchaseToCartCtdSchema, {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: getPurchaseForCartCtdSchema,
          variables: {
            type: "ctd_dossier",
          },
        },
      ],
    });

    const { mutate: ctdDeleteMutate, onDone: ctdDeleteOnDone } = useMutation(deletePurchaseFromCartCtdSchema, {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: getPurchaseForCartCtdSchema,
          variables: {
            type: "ctd_dossier",
          },
        },
      ],
    });

    ctdAddOnDone((result) => {
      useNotification.openNotification(result.extensions.addPurchaseToCart.message);
    });

    const { result: resultBasketApi } = useQuery(getPurchaseForCartApiSchema, () => ({
      type: "api",
    }));

    const { mutate: apiAddMutate, onDone: apiAddOnDone } = useMutation(addPurchaseToCartApiSchema, {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: getPurchaseForCartApiSchema,
          variables: {
            type: "api",
          },
        },
      ],
    });

    const { mutate: apiDeleteMutate, onDone: apiDeleteOnDone } = useMutation(deletePurchaseFromCartApiSchema, {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: getPurchaseForCartApiSchema,
          variables: {
            type: "api",
          },
        },
      ],
    });

    apiAddOnDone((result) => {
      useNotification.openNotification(result.extensions.addPurchaseToCart.message);
    });

    const sendMetricAddGood = (productName) => {
      UseMetric.sendGoogle("add_to_cart", {
        params: {
          items: [{
            item_name: productName,
          }]
        }
      });
      UseMetric.sendYandexEcommerce({
        "add": {
          "products": [
            {
              "name" : productName,
            }
          ]
        }
      });
    }

    watchEffect(async () => {
      if (!basketStore.store.newGoodBasket) {
        return;
      }

      let result = null
      const currentGood = basketStore.store.newGoodBasket
      basketStore.store.newGoodBasket = null;

      switch (currentGood.type) {
        case "ctd_dossier": {
          result = await ctdAddMutate({
            id: currentGood.id,
            type: "ctd_dossier",
          });

          break;
        }

        case "api": {
          result = await apiAddMutate({
            id: currentGood.id,
            type: "api",
          });

          break;
        }
        default: {
          result = await innAddMutate({
            id: currentGood.id,
            type: "good",
          });
        }
      }

      if (result?.data) {
        sendMetricAddGood(currentGood.productName)
      }
    });

    const basketInn = computed(() => resultBasketInn.value?.getPurchaseForCart || []);
    const basketCtd = computed(() => resultBasketCtd.value?.getPurchaseForCart || []);
    const basketApi = computed(() => resultBasketApi.value?.getPurchaseForCart || []);

    const backedData = computed(() => {
      switch (props.currentTab) {
        case "CTD-Dossier": {
          return basketCtd.value.map((item) => item.ctdDossier);
        }

        case "API": {
          return basketApi.value.map((item) => item.api);
        }

        default:
          return basketInn.value.map((item) => item.good);
      }
    });

    const closeBasket = () => {
      openedBasket.value = false;
    };

    const sendMetricDeleteGood = (productName) => {
      UseMetric.sendGoogle("remove_from_cart", {
        params: {
          items: [{
            item_name: productName,
          }]
        }
      });
      UseMetric.sendYandexEcommerce({
        "remove": {
          "products": [
            {
              "name" : productName,
            }
          ]
        }
      });
    }

    const deleteGood = async ({id, product_name: productName}) => {
      let result = null;

      switch (props.currentTab) {
        case "CTD-Dossier": {
          result = await ctdDeleteMutate({
            id,
            type: "ctd_dossier",
          });

          break;
        }

        case "API": {
          result = await apiDeleteMutate({
            id,
            type: "api",
          });

          break;
        }

        default:
          result = await innDeleteMutate({
            id,
            type: "good",
          });
      }

      if (result?.data) {
        sendMetricDeleteGood(productName)
      }
    };

    ctdDeleteOnDone((result) => {
      useNotification.openNotification(result.extensions.deletePurchaseFromCart.message);
    });

    apiDeleteOnDone((result) => {
      useNotification.openNotification(result.extensions.deletePurchaseFromCart.message);
    });

    const { mutate: innSendMutate, onDone: innSendOnDone } = useMutation(sendPurchaseRequestInnSchema, {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: getPurchaseForCartInnSchema,
          variables: {
            type: "good",
          },
        },
      ],
    });

    innSendOnDone(() => {
      useModal.openModal("request-send-success");
    });

    const { mutate: ctdSendMutate, onDone: ctdSendOnDone } = useMutation(sendPurchaseRequestCtdSchema, {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: getPurchaseForCartCtdSchema,
          variables: {
            type: "ctd_dossier",
          },
        },
      ],
    });

    ctdSendOnDone(() => {
      useModal.openModal("request-send-success");
    });

    const { mutate: apiSendMutate, onDone: apiSendOnDone } = useMutation(sendPurchaseRequestApiSchema, {
      awaitRefetchQueries: true,
      refetchQueries: [
        {
          query: getPurchaseForCartApiSchema,
          variables: {
            type: "api",
          },
        },
      ],
    });

    apiSendOnDone(() => {
      useModal.openModal("request-send-success");
    });

    const sendMetricSendGoods = (goods) => {
      UseMetric.sendGoogle("purchase", {
        params: {
          items: goods.map(({product_name: productName}) => ({item_name: productName}))
        }
      });
      UseMetric.sendYandexEcommerce({
        "purchase": {
          "products": goods.map(({product_name: productName}) => ({"name": productName}))
        }
      });
    }

    const sendRequestBasket = async () => {
      let result = null;
      const dataGoodsFromMetric = backedData.value

      switch (props.currentTab) {
        case "CTD-Dossier": {
          result = await ctdSendMutate({
            type: "ctd_dossier",
          });

          break;
        }

        case "API": {
          result = await apiSendMutate({
            type: "api",
          });

          break;
        }

        default:
          result = await innSendMutate({
            type: "good",
          });
      }

      if (result?.data) {
        sendMetricSendGoods(dataGoodsFromMetric)
      }
    };

    onClickOutside(basket, (event) => {
      if (
        event.target.id === "basket" ||
        event.target.closest("#basket")?.id === "basket" ||
        showWidgetBreakpoints.value
      ) {
        return;
      }

      openedBasket.value = false;
    });

    return {
      backedData,
      basket,
      closeBasket,
      deleteGood,
      hidePageScroll,
      isOpenBasket,
      openBasket,
      sendRequestBasket,
      showPageScroll,
    };
  },
};
</script>

<style scoped>
.basket {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  border: 1px solid #e7f0fe;
  background-color: #f8f9fb;
  overflow: hidden;
}

@media (min-width: 768px) {
  .basket {
    z-index: 1;
    width: 300px;
    height: calc(100% - 81px);
    box-shadow: -15px 0 40px -10px rgb(5 12 20 / 0.06);
  }
}

@media (min-width: 1170px) {
  .basket {
    height: calc(100% - 65px);
  }
}

.basket__header {
  height: 56px;
  margin: 0 -16px;
  padding: 0 16px;
  background-color: #ffffff;
  box-shadow: var(--modal-header-box-shadow);
}

@media (min-width: 768px) {
  .basket__header {
    display: none;
  }
}

.basket-content {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  height: calc(100% - 80px - 200px);
  padding: 0 16px 20px;
  overflow-x: hidden;
  overflow-y: auto;
}

@media (min-width: 570px) {
  .basket-content {
    height: calc(100% - 80px - 145px);
    padding: 12px 24px;
  }
}

.basket__button {
  position: absolute;
  top: 8px;
  right: 15px;
}

.basket__button,
.good__button {
  display: flex;
  justify-content: center;
  justify-self: flex-end;
  align-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
}

.good__button {
  margin-top: -10px;
}

.basket__title {
  width: 100%;
  padding: 28px 24px;
  border-bottom: 1px solid #e7f0fe;
  font-size: 15px;
  color: #011e41;
  background-color: #f8f9fb;
}

@media (min-width: 768px) {
  .basket__title {
    top: 0;
    padding: 28px 24px;
  }
}

.basket__count,
.basket-widget__count {
  color: #647c9f;
}

.good {
  display: grid;
  grid-template-columns: minmax(190px, 1fr) 60px;
  padding: 14px 0;
  border-bottom: 1px solid #e7f0fe;
  word-break: break-all;
}

.good__name,
.good__option {
  margin-bottom: 4px;
  font-size: 12px;
  color: #04202f;
}

.good__option {
  color: #647c9f;
}

.basket__footer {
  padding: 20px 16px;
  border-top: 1px solid #e7f0fe;
  background-color: #f8f9fb;
}

@media (min-width: 570px) {
  .basket__footer {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
  }
}

@media (min-width: 768px) {
  .basket__footer {
    display: block;
  }
}

.basket__button-send {
  width: 100%;
}

@media (min-width: 570px) {
  .basket__button-send {
    width: fit-content;
  }
}

@media (min-width: 768px) {
  .basket__button-send {
    width: 100%;
  }
}

.basket__description-send {
  margin-top: 16px;
  font-size: 12px;
  color: #647c9f;
  text-align: center;
}

@media (min-width: 570px) {
  .basket__description-send {
    margin-top: 0;
  }
}

@media (min-width: 768px) {
  .basket__description-send {
    margin-top: 16px;
  }
}

.basket-widget--lg {
  display: none;
}

@media (min-width: 768px) {
  .basket-widget--lg {
    position: fixed;
    top: 50%;
    right: 0;
    z-index: 20;
    display: flex;
    width: 70px;
    height: 70px;
    border: 1px solid #e7f0fe;
    border-radius: 50% 0 0 50%;
    background-color: #f8f9fb;
    background-image: url("../assets/icons/basket.svg");
    background-position: center center;
    background-size: 35px;
    background-repeat: no-repeat;
    box-shadow: -10px 0 40px -5px rgb(5 12 20 / 0.13);
    transform: translateY(-50%);
    cursor: pointer;
  }

  .basket-widget--lg:hover {
    background-color: #f4f4f4;
  }
}

.basket-widget--sm {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 24px;
  border: 1px solid #e7f0fe;
  background-color: #f8f9fb;
  cursor: pointer;
}

@media (min-width: 768px) {
  .basket-widget--sm {
    display: none;
  }
}

.basket-widget__title {
  font-size: 15px;
  color: #011e41;
}

.basket-widget__button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  max-height: 40px;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active,
.fade-widget-lg-enter-active,
.fade-widget-lg-leave-active,
.fade-widget-sm-enter-active,
.fade-widget-sm-leave-active {
  transition-property: opacity, transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

.fade-enter-active,
.fade-widget-lg-enter-active,
.fade-widget-sm-enter-active {
  transition-delay: 0.1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0.01;
  transform: translateY(30px);
}

@media (min-width: 768px) {
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0.01;
    transform: translateX(30px);
  }
}

.fade-widget-lg-enter-from,
.fade-widget-lg-leave-to {
  opacity: 0.01;
  transform: translate(30px, -50%);
}

.fade-widget-sm-enter-from,
.fade-widget-sm-leave-to {
  opacity: 0.01;
  transform: translateY(30px);
}
</style>
