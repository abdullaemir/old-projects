<template>
  <BaseDropdown id="cabinet-menu-user-wrapper">
    <ul
      v-show="useDropdown.isDropdownOpen('cabinet-menu-user-wrapper')"
      id="cabinet-menu-user"
      class="menu-user"
    >
      <template
        v-for="(menuItem, menuItemIndex) in menuUser"
        :key="menuItemIndex"
      >
        <li v-if="useCheckAccess(menuItem.access)">
          <RouterLink
            active-class="active"
            class="menu-user__link"
            :to="{ name: menuItem.to }"
            @click.prevent.capture="$emit('openPage', menuItem, 'menuUser')"
          >
            {{ menuItem.name }}
          </RouterLink>
        </li>
      </template>

      <li>
        <BaseButton
          class="menu-user__link"
          :modifiers="['text']"
          @click="logout"
        >
          Sign out
        </BaseButton>
      </li>
    </ul>
  </BaseDropdown>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";

import Auth from "~/api/rest/Auth.js";
import useCheckAccess from "~/assets/scripts/functions/useCheckAccess.js";
import BaseButton from "~/components/base/BaseButton.vue";
import BaseDropdown, {useDropdown} from "~/components/base/BaseDropdown/BaseDropdown.vue";
import { useNotification } from "~/components/base/BaseNotification.vue";

defineEmits({
  openPage: (menuItem, menuType) => [
    menuItem,
    menuType,
  ],
});

const router = useRouter();

const menuUser = [
  {
    access: "MY_PROFILE_VIEW",
    name: "My profile",
    to: "cabinetProfile",
  },
  {
    access: "MY_PAYMENTS_VIEW",
    name: "My payment methods",
    to: "cabinetMyPaymentsMethods",
  },
  {
    access: "MY_USERS_VIEW",
    name: "My users",
    to: "cabinetMyUsers",
  },
];

const logout = async () => {
  await router.push({
    name: "index",
  });

  const result = await Auth.logout();

  useNotification.openNotification(result.extensions ? result.extensions.message : "Successfully logged out");
};
</script>

<style scoped>
.menu-user {
  position: absolute;
  top: calc(100% - 14px);
  right: 16px;
  margin: 0;
  padding: 8px 0;
  border: 1px solid var(--border-color-primary);
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 1px 16px rgb(0 42 81 / 0.06);
}

@media (min-width: 768px) {
  .menu-user {
    right: 24px;
  }
}

.menu-user::before {
  content: "";
  position: absolute;
  bottom: 100%;
  width: 100%;
  height: 14px;
}

.menu-user__link {
  display: inline-block;
  width: 100%;
  padding: 8px 16px;
  font-size: 12px;
  line-height: 1.5;
  text-align: left;
}

.menu-user__link.active {
  font-weight: 600;
}
</style>
