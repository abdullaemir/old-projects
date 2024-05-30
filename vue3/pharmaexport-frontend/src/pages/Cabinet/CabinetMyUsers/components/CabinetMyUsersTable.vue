<template>
  <CabinetMyUsersTitle> Users </CabinetMyUsersTitle>

  <div
    ref="usersTable"
    class="scrollbar users"
  >
    <table class="users__table">
      <thead class="users__header">
        <tr class="users__row">
          <th class="users__cell">
            User email
          </th>
          <th class="users__cell users__cell--status">
            Status
            <BaseTableButtonSort
              class="users__sort"
              @sort-by="sortByField({ status: $event })"
            />
          </th>
          <th class="users__cell users__cell--tablet">
            Position in the company
          </th>
          <th class="users__cell users__cell--tablet">
            Rights
          </th>
        </tr>
      </thead>

      <tbody class="users__body">
        <tr
          v-for="user in users"
          :key="user.id"
          class="users__row"
        >
          <td class="users__cell users__cell--email">
            {{ user.email }}
            <span
              v-if="user.is_admin_account"
              class="users__administrator"
            >
              administrator
            </span>
          </td>
          <td class="users__cell users__cell--status">
            {{ user.status }}
          </td>
          <td
            class="users__cell users__cell--position"
            data-title="Position in the company"
          >
            {{ user?.company_position || "-" }}
          </td>
          <td
            class="users__cell users__cell--rights"
            data-title="Rights"
          >
            <BaseSelect
              v-if="user.can_change_right"
              :id="`rights-user-${user.id}`"
              class="users__select"
              label="Select rights"
              :model-value="user.rights"
              multiple
              :name="`rights-user-${user.id}`"
              :options="rights"
              :show-clear-tag="false"
              size="medium"
              @clear-select="updateUserRights(user, [], true)"
              @close-dropdown="updateUserRights(user, $event)"
            />
          </td>
          <td class="users__cell users__cell--actions">
            <BaseButton
              v-if="user.can_change_right"
              :aria-controls="`menu-action-${user.id}`"
              :aria-expanded="useDropdown.isDropdownOpen(`action-${user.id}`)"
              :aria-label="useDropdown.isDropdownOpen(`action-${user.id}`) ? 'Close action menu' : 'Open action menu'"
              class="user__button--action"
              @click="openMenu($event, user.id)"
            >
              <img
                alt=""
                aria-hidden="true"
                height="13"
                loading="lazy"
                src="/src/assets/icons/action-menu.svg"
                width="3"
              />
            </BaseButton>

            <CabinetMyUsersMenuUserActions
              :menu-options="itemsActions"
              :user="user"
              @select-action="selectAction($event, user.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useMutation } from "@vue/apollo-composable";
import { useInfiniteScroll } from "@vueuse/core";
import { ref, watch } from "vue";

import BaseButton from "~/components/base/BaseButton.vue";
import { useDropdown } from "~/components/base/BaseDropdown/BaseDropdown.vue";
import { useNotification } from "~/components/base/BaseNotification.vue";
import BaseSelect from "~/components/base/BaseSelectBox/BaseSelect.vue";
import { useTable } from "~/components/base/BaseTable/BaseTable.js";
import BaseTableButtonSort from "~/components/base/BaseTable/BaseTableButtonSort.vue";

import userBlockSchema from "../api/graphql/mutations/userBlock.graphql";
import userDeleteSchema from "../api/graphql/mutations/userDelete.graphql";
import userRightsChangeSchema from "../api/graphql/mutations/userRightsChange.graphql";

import CabinetMyUsersMenuUserActions from "./CabinetMyUsersMenuActions.vue";
import CabinetMyUsersTitle from "./CabinetMyUsersTitle.vue";

defineProps({
  rights: {
    required: true,
    type: Array,
  },
  users: {
    required: true,
    type: Array,
  },
});

const emits = defineEmits({
  deleteUser: () => true,
  loadMore: () => true,
  sort: (orderBy) => orderBy,
});

const { sorts, sortByField } = useTable();

const itemsActions = [
  {
    action: "block",
    icon: "user-block.svg",
    name: "Block",
    userStatus: "Blocked",
  },
  {
    action: "delete",
    icon: "basket-trash.svg",
    name: "Delete",
    userStatus: "Deleted",
  },
];

const usersTable = ref(null);

const openMenu = (event, userId) => {
  useDropdown.openDropdown(`action-${userId}`, event, {
    offsetX: -12,
    offsetY: 4,
    width: 171,
  });
};

/* TODO: Вынести логику сортировки в BaseTableButtonSort */
watch(
  () => sorts.value,
  () => emits(
    "sort",
    Object.keys(sorts.value).length
      ? sorts.value
      : {
        orderBy: [],
      },
  ),
  {
    deep: true,
  },
);

const { mutate: userRightsChangeMutate, onDone: userRightsChangeOnDone } = useMutation(userRightsChangeSchema);

const updateUserRights = (user, rights, isClear = false) => {
  if (!user?.rights?.length && !rights?.length) {
    return;
  }

  if (user.rights !== rights || isClear) {
    userRightsChangeMutate({
      rights,
      user_id: user.id,
    });
  }
};

userRightsChangeOnDone((data) => {
  useNotification.openNotification(data?.extensions?.userRightsChange?.message);
});

const { mutate: userDeleteMutate, onDone: userDeleteOnDone } = useMutation(userDeleteSchema);

const { mutate: userBlockMutate, onDone: userBlockOnDone } = useMutation(userBlockSchema);

const selectAction = async (actionType, userId) => {
  switch (actionType) {
    case "delete": {
      await userDeleteMutate({
        user_id: userId,
      });

      break;
    }

    case "block": {
      await userBlockMutate({
        user_id: userId,
      });

      break;
    }

    default:
      break;
  }
};

userDeleteOnDone((data) => {
  emits("deleteUser");
  useNotification.openNotification(data?.extensions?.userDelete?.message);
});

userBlockOnDone((data) => {
  useNotification.openNotification(data?.extensions?.userBlock?.message);
});

/* TODO: Вынести в helpers */
useInfiniteScroll(
  usersTable,
  () => {
    emits("loadMore");
  },
  {
    distance: 300,
  },
);
</script>

<style scoped>
.users {
  position: relative;
  max-height: 450px;
  margin: 0 -16px 28px;
  border-top: 1px solid var(--border-color-primary);
  border-bottom: 1px solid var(--border-color-primary);
  font-size: 12px;
  overflow-y: auto;
}

@media (min-width: 768px) {
  .users {
    margin: 0 0 28px;
    border: 1px solid var(--border-color-primary);
    border-radius: 8px;
  }
}

.users__table::-webkit-scrollbar-track {
  margin: 16px;
}

@media (min-width: 768px) {
  .users::-webkit-scrollbar-track {
    margin: 0;
  }
}

.users__table {
  width: 100%;
  border-collapse: collapse;
}

.users__header {
  position: sticky;
  top: 0;
  z-index: 1;
}

.users__row {
  display: grid;
  grid-template-columns:
    1fr
    100px
    18px;
}

@media (min-width: 850px) {
  .users__row {
    grid-template-columns:
      2fr
      100px
      minmax(170px, 1fr)
      minmax(179px, 1fr)
      18px;
    align-items: center;
  }
}

.users__row:not(:last-child) {
  border-bottom: 1px solid var(--border-color-primary);
}

.users__cell:not(:last-of-type) {
  padding-right: 15px;
}

.users__header .users__row {
  padding: 8px 16px;
  background-color: #f6f7fb;
}

.users__header .users__cell {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: left;
}

.users__header .users__cell--status {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 12px;
  justify-content: start;
}

.users__header .users__cell--tablet {
  display: none;
}

@media (min-width: 850px) {
  .users__header .users__cell--tablet {
    display: flex;
  }
}

.users__body .users__row {
  padding: 20px 16px;
}

@media (max-width: 850px) {
  .users__body .users__cell--email,
  .users__body .users__cell--position,
  .users__body .users__cell--actions {
    grid-column: 1 / 2;
  }
}

.users__body .users__cell--email {
  word-break: break-all;
}

@media (max-width: 850px) {
  .users__body .users__cell--status {
    grid-column: 2 / 3;
    margin-bottom: 24px;
  }
}

@media (max-width: 850px) {
  .users__body .users__cell--position {
    margin-bottom: 16px;
  }
}

@media (max-width: 850px) {
  .users__body .users__cell--rights {
    grid-column: 1 / -1;
    padding: 0;
  }
}

.users__body .users__cell--actions {
  position: relative;
}

@media (max-width: 850px) {
  .users__body .users__cell--actions {
    grid-row: 1 / 2;
    grid-column: 3 / 4;
  }
}

@media (max-width: 850px) {
  .users__body .users__cell--position::before,
  .users__body .users__cell--rights::before {
    content: attr(data-title);
    display: block;
    margin-bottom: 4px;
    line-height: 1.8;
    color: var(--text-color-two);
  }
}

.users__body .users__select {
  --select-background-color: #ffffff;
}

@media (min-width: 450px) {
  .users__body .users__select {
    max-width: 300px;
  }
}

.users__administrator {
  display: block;
  font-size: 12px;
  color: var(--text-color-five);
}

.user__button--action {
  width: 40px;
  height: 40px;
  margin: -8px -12px;
  padding: 0;
}
</style>
