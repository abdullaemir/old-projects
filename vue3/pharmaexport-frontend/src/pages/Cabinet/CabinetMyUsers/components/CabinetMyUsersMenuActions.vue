<template>
  <BaseDropdown :id="`action-${user.id}`">
    <ul
      :id="`menu-action-${user.id}`"
      class="actions"
    >
      <template
        v-for="(menuItem, menuItemIndex) in menuOptions"
        :key="menuItemIndex"
      >
        <li
          v-if="user.status !== menuItem.userStatus"
          class="actions__item"
        >
          <BaseButton
            class="actions__button"
            @click="emits('selectAction', menuItem.action)"
          >
            <img
              alt=""
              aria-hidden="true"
              height="18"
              loading="lazy"
              :src="getImg(menuItem.icon)"
              width="18"
            />
            {{ menuItem.name }}
          </BaseButton>
        </li>
      </template>
    </ul>
  </BaseDropdown>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";
import BaseDropdown from "~/components/base/BaseDropdown/BaseDropdown.vue";

defineProps({
  menuOptions: {
    required: true,
    type: Array,
  },
  user: {
    required: true,
    type: Object,
  },
});

const emits = defineEmits({
  selectAction: (actionType) => actionType,
});

/* TODO: Убрать */
const getImg = (name) => {
  const path = `../../../../assets/icons/${name}`;
  const modules = import.meta.globEager("~/assets/icons/*");

  return modules[path].default;
};
</script>

<style scoped>
.actions {
  margin: 0;
  padding: 8px 0;
  border: 1px solid var(--border-color-primary);
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 1px 16px rgb(0 42 81 / 0.06);
}

.actions__item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 16px;
  font-size: 12px;
  transition-property: background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  cursor: pointer;
}

@media (any-pointer: fine) {
  .actions__item:hover,
  .actions__item:focus {
    background-color: var(--blue-lightest);
  }
}

.actions__button {
  justify-content: flex-start;
  padding: 0;
  font-weight: 500;
  color: var(--text-color-one);
}
</style>
