<template>
  <ClientOnly>
    <Teleport to="body">
      <TransitionGroup
        tag="ul"
        class="notification__container"
        :appear="true"
        name="fade"
      >
        <li
          v-for="notification in notificationList"
          :key="notification.id"
          :id="notification.id"
          v-show="notification.isOpen"
          class="notification"
          @mouseleave="setTimeOutNotification(notification.id, notification.duration)"
          @mouseenter="clearTimeOutNotification()"
          @touchmove="closeNotification(notification.id)"
        >
          {{ notification.message }}

          <a
            v-if="notification.href"
            class="notification__link"
            :href="notification.href"
          >
            {{ notification.link }}
          </a>

          <RouterLink
            v-if="notification.to"
            class="notification__link"
            :to="notification.to"
          >
            {{ notification.link }}
          </RouterLink>

          <button
            aria-label="Close notification"
            :aria-controls="notification.id"
            class="notification__button"
            type="button"
            @click="closeNotification(notification.id)"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke-width="2"
              stroke="var(--notification-color)"
            >
              <path
                transform="matrix(0.718037 -0.696004 0.718037 0.696004 6.07812 18.5264)"
                d="M0-1h17.997"
              />
              <path
                transform="matrix(0.718638 0.695384 -0.718638 0.695384 5 6)"
                d="M0-1h17.998"
              />
            </svg>
          </button>
        </li>
      </TransitionGroup>
    </Teleport>
  </ClientOnly>
</template>

<script>
import { ClientOnly } from "vite-ssr";
import { computed, nextTick, reactive, ref, watchEffect } from "vue";

import { useUniqId } from "@pg/helpers";

export const useNotification = reactive({
  /**
   * @param {string} message - Текст уведомления
   * @param {{}} options - Настройки уведомления
   * @param {number|string} options.duration=3500 - Длительность открытия уведомления
   * @param {string} options.href - Ссылка для <a>
   * @param {string} options.link - Текст ссылки
   * @param {string} options.to - Ссылка для <RouterLink>
   */
  openNotification(message, options = {}) {
    if (message) {
      const notification = {
        duration: options.duration || 3500,
        href: options.href || "",
        id: useUniqId(),
        isOpen: false,
        link: options.link || "",
        message,
        to: options.to || "",
      };

      this.state.notifications.push(notification);
    }
  },
  state: {
    notifications: [],
  },
});

export default {
  name: "BaseNotification",
  expose: [],
  components: {
    ClientOnly,
  },
  setup() {
    const notificationStore = useNotification;

    const timeOutNotification = ref([]);

    const notificationList = computed(() => {
      return notificationStore.state.notifications.slice().reverse();
    });

    const closeNotification = (id) => {
      const currentNotificationIndex = notificationStore.state.notifications.findIndex((notification) => {
        return notification.id === id;
      });

      if (currentNotificationIndex !== -1) {
        const currentNotification = notificationStore.state.notifications.find((notification) => {
          return notification.id === id;
        });

        currentNotification.isOpen = false;

        setTimeout(() => {
          notificationStore.state.notifications.splice(currentNotificationIndex, 1);
        }, 400);
      }
    };

    const setTimeOutNotification = (id, duration) => {
      if (duration !== "Infinity") {
        timeOutNotification.value.push({ [id]: setTimeout(() => closeNotification(id), duration) });
      }
    };

    const clearTimeOutNotification = () => {
      timeOutNotification.value.forEach((timeout) => clearTimeout(timeout[Object.keys(timeout)[0]]));
    };

    watchEffect(() => {
      const lastNotification = notificationStore.state.notifications[notificationStore.state.notifications.length - 1];

      if (lastNotification) {
        nextTick(() => {
          notificationStore.state.notifications.forEach((notification, index) => {
            if (index < 3) {
              notification.isOpen = true;

              setTimeOutNotification(notification.id, notification.duration);
            }
          });
        });
      }
    });

    return {
      clearTimeOutNotification,
      closeNotification,
      notificationList,
      setTimeOutNotification,
    };
  },
};
</script>

<style scoped>
.notification__container {
  position: fixed;
  right: 8px;
  bottom: 8px;
  left: 8px;
  z-index: var(--notification-z-index);
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 8px;
  margin: 0;
  padding-left: 0;
}

@media (min-width: 500px) {
  .notification__container {
    left: auto;
  }
}

@media (min-width: 768px) {
  .notification__container {
    right: 20px;
    bottom: 20px;
  }
}

.notification {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: var(--notification-border-width) solid var(--notification-border-color);
  border-radius: var(--notification-border-radius);
  font-weight: var(--notification-font-weight);
  font-size: var(--notification-font-size);
  line-height: 1.5;
  font-family: inherit;
  color: var(--notification-color);
  background-color: var(--notification-background-color);
  opacity: var(--notification-opacity);
  box-shadow: var(--notification-box-shadow);
}

@media (min-width: 768px) {
  .notification {
    padding: 21px 16px 22px;
  }
}

.notification__link {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 40px;
  margin: -8px 0 -8px 32px;
  font: inherit;
  text-decoration: none;
  transition-property: background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

@media (any-pointer: fine) {
  .notification__link:focus::after,
  .notification__link:hover::after,
  .notification__link:active::after {
    content: "";
    position: absolute;
    left: -9px;
    display: inline-block;
    width: calc(100% + 18px);
    height: 100%;
    border-radius: 8px;
    background-color: var(--notification-background-color-hover);
  }
}

@media (any-pointer: fine) and (min-width: 768px) {
  .notification__link:focus::after,
  .notification__link:hover::after,
  .notification__link:active::after {
    top: -3px;
    height: calc(100% + 6px);
  }
}

.notification__button {
  display: none;
}

@media (min-width: 500px) {
  .notification__button {
    position: relative;
    right: -8px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin: -8px 0 -8px 12px;
    padding: 0;
    border: none;
    font: inherit;
    background-color: transparent;
    transition-property: background-color;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
  }
}

@media (any-pointer: fine) {
  .notification__button:focus::after,
  .notification__button:hover::after,
  .notification__button:active::after {
    content: "";
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--notification-background-color-hover);
  }
}

@media (any-pointer: fine) and (min-width: 768px) {
  .notification__button:focus::after,
  .notification__button:hover::after,
  .notification__button:active::after {
    top: -3px;
    left: -3px;
    width: calc(100% + 6px);
    height: calc(100% + 6px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition-property: transform, opacity;
}

.fade-enter-active {
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

.fade-leave-active {
  transition-duration: 0.4s;
  transition-timing-function: linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-leave-to {
  transform: translateY(200%);
}
</style>
