<template>
  <app-checkbox
    class="policy-agreement"
    :size="checkboxSize"
  >
    Согласен с&nbsp;
    <a href="">политикой обработки персональных данных</a>
    &nbsp;
    <span v-if="hasRules">
      и с
      <a href="">правилами работы сайта</a>
    </span>
  </app-checkbox>
</template>

<script setup>
defineProps({
  hasRules: {
    type: Boolean,
    default: false,
  },
  checkboxSize: {
    type: String,
    default: "S",
  },
});
</script>

<style lang="scss">
.policy-agreement {
  color: #808080;
  font-size: 18px;
  letter-spacing: -0.36px;
  line-height: 130px;
  a {
    color: #0154e2;
  }
}
</style>
