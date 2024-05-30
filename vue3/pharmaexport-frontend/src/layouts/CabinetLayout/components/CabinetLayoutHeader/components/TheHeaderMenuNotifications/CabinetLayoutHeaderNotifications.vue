<template>
  <Transition name="slide">
    <div
      v-if="isNotificationVisible"
      class="notifications__overlay"
      @click.self="emits('close-notifications')"
    >
      <div class="notifications__wrapper">
        <div class="notifications__header">
          <h2 class="notifications__header--title">
            Notification
          </h2>
          <span class="notifications__header--count">(4)</span>
          <BaseButton
            class="notifications__header--close"
            @click="emits('close-notifications')"
          />
        </div>
        <ul class="notifications scrollbar">
          <CabinetLayoutHeaderNotificationsItem />
        </ul>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";
import CabinetLayoutHeaderNotificationsItem from "./CabinetLayoutHeaderNotificationsItem.vue";

defineProps({
  isNotificationVisible: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits({
  "close-notifications": () => true,
});

</script>

<style scoped>
.notifications__overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-header);
  display: flex;
  justify-content: flex-end;
  background-color: rgb(4 32 47 / 0.4);
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}

.notifications__overlay.slide-enter-from,
.notifications__overlay.slide-leave-to {
  background-color: transparent;
}

.notifications__wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--white);
  transition-property: transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

@media (min-width: 768px) {
  .notifications__wrapper {
    max-width: 400px;
  }
}

.notifications__overlay.slide-enter-from .notifications__wrapper,
.notifications__overlay.slide-leave-to .notifications__wrapper {
  transform: translateX(100%);
}

.notifications__header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--blue-lightest);
}

@media (min-width: 768px) {
  .notifications__header {
    padding: 32px;
  }
}

.notifications__header--close {
  width: 40px;
  height: 40px;
  margin: -22px -22px -22px auto;
  padding: 0;
  background-image: url("/src/assets/icons/cross.svg");
  background-size: 18px;
  background-position: center;
  background-repeat: no-repeat;
}

.notifications__header--title {
  font-weight: 500;
  font-size: 16px;
  color: var(--blue-darkest);
}

.notifications__header--count {
  margin-left: 8px;
  color: var(--blue-light);
}

.notifications {
  margin: 0;
  padding: 0;
  overflow-y: auto;
}
</style>
