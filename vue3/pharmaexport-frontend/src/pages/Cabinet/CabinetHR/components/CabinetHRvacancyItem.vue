<template>
  <div class="card-vacancy">
    <p class="card-vacancy__title">
      {{ dataVacancy.title }}
    </p>
    <hr class="divider" />
    <div class="card-vacancy__actions">
      <div class="card-vacancy__box-status">
        <p class="card-vacancy__status-title">
          Status
        </p>
        <p
          class="card-vacancy__status"
          :class="[getColorStatus(dataVacancy.status)]"
        >
          {{ getStatus(dataVacancy.status) }}
        </p>
      </div>
      <BaseButton
        class="card-vacancy__button-edit"
        :modifiers="['round', 'blue', 'small', 'plain']"
        type="submit"
        @click.prevent=""
      >
        Edit
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";

defineProps({
  dataVacancy: {
    // eslint-disable-next-line no-empty-function
    default: () => {},
    type: Object,
  },
});

const getColorStatus = (status) => {
  if (!status) {
    return "";
  }

  let stringStatus = status.replace(/\s/giu, "-");

  stringStatus = stringStatus[0].toLowerCase() + stringStatus.slice(1);

  return `card-vacancy__status--${stringStatus}`;
};

const getStatus = (status) => status ?? "Not status";
</script>

<style scoped>
.card-vacancy {
  padding: 16px 32px;
  border: 1px solid #e7f0fe;
  border-radius: 8px;
}

.card-vacancy__title {
  font-weight: 600;
  line-height: 1.8;
}

.divider {
  width: 100%;
  height: 1px;
  margin: 16px 0;
  border: none;
  background-color: #e7f0fe;
}

.card-vacancy__actions {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
}

.card-vacancy__status-title {
  font-size: 12px;
  line-height: 1.8;
  color: #aebed6;
}

.card-vacancy__status {
  color: #04202f;
}

.card-vacancy__status--published {
  color: #34a853;
}

.card-vacancy__status--moderation {
  color: #ff4f13;
}

.card-vacancy__status--show-stopped {
  color: #04202f;
}

.card-vacancy__status--archived {
  color: #142269;
}

.card-vacancy__button-edit {
  width: auto;
}
</style>
