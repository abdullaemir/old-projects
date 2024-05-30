<template>
  <button
    class="go__btn"
    @click="useScrollIntoView('app', $event)"
  >
    <span class="go__description">go up</span>
  </button>
</template>

<script setup>
import useScrollIntoView from "~/assets/scripts/useScrollIntoView.js";
</script>

<style scoped>
.go__btn {
  display: block;
  max-width: 287px;
  width: 100%;
  height: 56px;
  margin: 0 auto 30px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.5;
  color: #ffffff;
  text-transform: uppercase;
  background: var(--blue);
}

@media (min-width: 1170px) {
  .go__btn {
    margin-bottom: 80px;
  }
}

.go__description {
  position: relative;
}

.go__description::before {
  content: "";
  position: absolute;
  left: -12px;
  width: 9px;
  height: 20px;
  background-image: url("../../assets/icons/arrow.svg");
  background-position: center;
  background-repeat: no-repeat;
}
</style>
