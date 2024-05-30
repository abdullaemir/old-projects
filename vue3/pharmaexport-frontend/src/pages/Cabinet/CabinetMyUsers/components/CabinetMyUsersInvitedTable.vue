<template>
  <CabinetMyUsersTitle> Invited Users </CabinetMyUsersTitle>
  <div
    ref="usersInvitedTable"
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
          v-for="userInvite in usersInvite"
          :key="userInvite.id"
          class="users__row"
        >
          <td class="users__cell users__cell--email">
            {{ userInvite.email }}<br />
            <p class="users__date-invite">
              This invitation is valid for {{ getDayValidInvite(userInvite.date_end) }}
            </p>
          </td>
          <td class="users__cell users__cell--status">
            {{ userInvite.status }}
          </td>
          <td
            class="users__cell users__cell--position"
            data-title="Position in the company"
          >
            {{ userInvite?.company_position || "-" }}
          </td>
          <td
            class="users__cell users__cell--rights"
            data-title="Rights"
          >
            <BaseSelect
              v-if="userInvite.can_change_right"
              :id="`rights-user-invite-${userInvite.id}`"
              class="users__select"
              label="Select rights"
              :model-value="userInvite.rights ?? []"
              multiple
              :name="`rights-user-invite-${userInvite.id}`"
              :options="rights"
              :show-clear-tag="false"
              size="medium"
              @clear-select="updateUserInvitedRights(userInvite, [], true)"
              @close-dropdown="updateUserInvitedRights(userInvite, $event)"
            />
          </td>
          <td class="users__cell users__cell--actions">
            <BaseButton
              v-if="userInvite.can_change_right"
              :aria-controls="`menu-action-${userInvite.id}`"
              :aria-expanded="useDropdown.isDropdownOpen(`action-${userInvite.id}`)"
              :aria-label="
                useDropdown.isDropdownOpen(`action-${userInvite.id}`) ? 'Close action menu' : 'Open action menu'
              "
              class="user__button--action"
              @click="openMenu($event, userInvite.id)"
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
              :user="userInvite"
              @select-action="selectAction($event, userInvite.id)"
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

import userInviteDeleteSchema from "../api/graphql/mutations/userInviteDelete.graphql";
import userInviteRightsChangeSchema from "../api/graphql/mutations/userInviteRightsChange.graphql";

import CabinetMyUsersMenuUserActions from "./CabinetMyUsersMenuActions.vue";
import CabinetMyUsersTitle from "./CabinetMyUsersTitle.vue";

defineProps({
  rights: {
    required: true,
    type: Array,
  },
  usersInvite: {
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
    action: "delete",
    icon: "basket-trash.svg",
    name: "Delete",
    userStatus: "Deleted",
  },
];

const usersInvitedTable = ref(null);

const openMenu = (event, userInviteId) => {
  useDropdown.openDropdown(`action-${userInviteId}`, event, {
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

const getDayValidInvite = (date) => {
  const dateNow = Date.now() + 50;
  const dateEnd = date * 1000;
  const timeDiff = Math.abs(dateEnd - dateNow);
  const daysFull = timeDiff / (1000 * 3600 * 24);

  if (daysFull < 1) {
    return `${Math.ceil(daysFull * 24)} hours`;
  }

  return `${Math.ceil(timeDiff / (1000 * 3600 * 24))} days`;
};

const { mutate: userInviteRightsChangeMutate, onDone: userInviteRightsChangeOnDone } =
  useMutation(userInviteRightsChangeSchema);

const updateUserInvitedRights = (userInvite, rights, isClear = false) => {
  if (!userInvite?.rights?.length && !rights?.length) {
    return;
  }

  if (userInvite.rights !== rights || isClear) {
    userInviteRightsChangeMutate({
      rights,
      user_invite_id: userInvite.id,
    });
  }
};

userInviteRightsChangeOnDone((data) => {
  useNotification.openNotification(data?.extensions?.userInviteRightsChange?.message);
});

const { mutate: userInviteDeleteMutate, onDone: userInviteDeleteOnDone } = useMutation(userInviteDeleteSchema);

const selectAction = async (actionType, userInviteId) => {
  switch (actionType) {
    case "delete": {
      await userInviteDeleteMutate({
        invite_id: userInviteId,
      });

      break;
    }

    default:
      break;
  }
};

userInviteDeleteOnDone((data) => {
  emits("deleteUser");
  useNotification.openNotification(data?.extensions?.userInviteDelete?.message);
});

/* TODO: Вынести в helpers */
useInfiniteScroll(
  usersInvitedTable,
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

.users__date-invite {
  margin-top: 5px;
  font-style: italic;
  font-size: 11px;
  color: var(--blue-light);
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

.user__button--action {
  width: 40px;
  height: 40px;
  margin: -8px -12px;
  padding: 0;
}
</style>
