<template>
  <div class="users__wrapper">
    <CabinetTitle class="users__title">
      My users
    </CabinetTitle>

    <!-- TODO: Убрать кнопку -->
    <RouterLink :to="{ name: 'cabinetMyUsersInvite' }">
      <BaseButton :modifiers="['small', 'half-round', 'blue']">
        Invite user
      </BaseButton>
    </RouterLink>
  </div>

  <!-- TODO: Добавить лоадинг для таблиц -->
  <CabinetMyUsersInvitedTable
    v-if="usersInvite?.length > 0 && rights"
    :rights="rights"
    :users-invite="usersInvite"
    @delete-user="usersInviteRefetch"
    @load-more="loadMore('usersInvite')"
    @sort="sorting('usersInvite', $event)"
  />

  <CabinetMyUsersTable
    v-if="users?.length > 0 && rights"
    :rights="rights"
    :users="users"
    @delete-user="usersRefetch"
    @load-more="loadMore('users')"
    @sort="sorting('users', $event)"
  />

  <p
    v-if="usersInvite?.length === 0 && !usersInviteLoading && users?.length === 0 && !usersLoading && !userRightsLoading"
  >
    You don't have invited users. Send invitations!
  </p>
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import { computed } from "vue";
import { RouterLink } from "vue-router";

import BaseButton from "~/components/base/BaseButton.vue";
import CabinetTitle from "~/pages/Cabinet/components/CabinetTitle.vue";

import CabinetMyUsersInvitedTable from "../components/CabinetMyUsersInvitedTable.vue";
import CabinetMyUsersTable from "../components/CabinetMyUsersTable.vue";

import userRightsSchema from "../api/graphql/queries/userRights.graphql";
import usersSchema from "../api/graphql/queries/users.graphql";
import usersInviteSchema from "../api/graphql/queries/usersInvite.graphql";

const USERS_INVITE_LIMIT = 10;
const USERS_LIMIT = 10;

const { loading: userRightsLoading, result: userRightsResult } = useQuery(userRightsSchema);

const {
  loading: usersInviteLoading,
  result: usersInviteResult,
  fetchMore: usersInviteFetchMore,
  refetch: usersInviteRefetch,
} = useQuery(usersInviteSchema, () => ({
  limit: USERS_INVITE_LIMIT,
}));

const {
  loading: usersLoading,
  result: usersResult,
  fetchMore: usersFetchMore,
  refetch: usersRefetch,
} = useQuery(usersSchema, () => ({
  limit: USERS_LIMIT,
}));

usersInviteRefetch();
usersRefetch();

const rights = computed(() => userRightsResult.value?.userRights);
const usersInvite = computed(() => usersInviteResult.value?.usersInvite);
const users = computed(() => usersResult.value?.users);

const sorting = (tableType, orderBy) => {
  switch (tableType) {
    case "usersInvite": {
      usersInviteRefetch({
        ...orderBy,
      });

      break;
    }

    case "users": {
      usersRefetch({
        ...orderBy,
      });

      break;
    }

    default: {
      break;
    }
  }
};

const loadMore = async (tableType) => {
  switch (tableType) {
    case "usersInvite": {
      await usersInviteFetchMore({
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            return {
              usersInvite: [
                ...previousResult.usersInvite,
                ...fetchMoreResult.usersInvite,
              ],
            };
          }

          return previousResult;
        },
        variables: {
          offset: usersInvite.value.length,
        },
      });

      break;
    }

    case "users": {
      await usersFetchMore({
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (fetchMoreResult) {
            return {
              users: [
                ...previousResult.users,
                ...fetchMoreResult.users,
              ],
            };
          }

          return previousResult;
        },
        variables: {
          offset: users.value.length,
        },
      });

      break;
    }

    default: {
      break;
    }
  }
};
</script>

<style scoped>
.users__wrapper {
  margin-bottom: 28px;
}

@media (min-width: 450px) {
  .users__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.users__title {
  margin-bottom: 16px;
}

@media (min-width: 768px) {
  .users__title {
    margin-bottom: 0;
  }
}
</style>
