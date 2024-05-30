<template>
  <div class="buttons__block">
    <!--    TODO: Когда появится раздел Look убрать 1 === 2 -->
    <BaseButton
      v-if="isLastBlock && 1 === 2"
      class="cabinet-hr-button look-button"
      :modifiers="['round']"
      type="button"
      @click="$emit('backStep')"
    >
      Look
    </BaseButton>

    <div class="cabinet-hr-buttons-right">
      <BaseButton
        v-if="!isFirstBlock"
        class="back-button cabinet-hr-button"
        :modifiers="['round']"
        type="button"
        @click="$emit('backStep')"
      >
        Back
      </BaseButton>

      <BaseButton
        class="cabinet-hr-button next-button"
        :modifiers="['round', 'blue']"
        type="submit"
        @click="$emit('nextStep')"
      >
        {{ nextButtonText }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseButton from "~/components/base/BaseButton.vue";

defineProps({
  isFirstBlock: {
    type: Boolean,
  },
  isLastBlock: {
    type: Boolean,
  },
  nextButtonText: {
    default: null,
    type: String,
  },
});

defineEmits({
  backStep: () => true,
  nextStep: () => true,
});
</script>

<style scoped>
.buttons__block {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .buttons__block {
    display: flex;
    flex-direction: row;
  }
}

.cabinet-hr-button {
  margin-bottom: 12px;
}

@media (min-width: 768px) {
  .cabinet-hr-button {
    width: fit-content;
    margin-bottom: 0;
  }
}

.back-button {
  order: 2;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.5;
  color: #647c9f;
}

@media (min-width: 768px) {
  .back-button {
    order: 1;
  }
}

.next-button {
  order: 1;
}

@media (min-width: 768px) {
  .next-button {
    order: 2;
  }
}

.look-button {
  border: 1px solid #142269;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
  color: #142269;
}

.cabinet-hr-buttons-right {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .cabinet-hr-buttons-right {
    flex-direction: row;
    margin-left: auto;
  }
}
</style>
