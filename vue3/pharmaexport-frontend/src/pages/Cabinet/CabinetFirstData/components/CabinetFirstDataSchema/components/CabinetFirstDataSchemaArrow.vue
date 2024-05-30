<template>
  <span
    class="arrow"
    :class="{ reverse, double }"
  >
    <span class="arrow__text"><slot /></span>
  </span>
</template>

<script setup>
defineProps({
  double: {
    require: false,
    type: Boolean,
  },
  reverse: {
    require: false,
    type: Boolean,
  },
});
</script>

<style scoped>
.arrow {
  position: relative;
  z-index: 1;
  width: 2px;
  background-image: url("../../../assets/icons/arrow-line.svg");
}

.arrow::before,
.arrow::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgb(0 89 193 / 0.1);
}

.arrow::before,
.arrow.double::after {
  top: -13px;
  left: -13px;
  width: 28px;
  height: 28px;
  background-image: url("~/assets/icons/caret.svg");
  background-position: center;
  background-size: 8px auto;
  background-repeat: no-repeat;
  transform: rotate(180deg);
}

.arrow::after {
  bottom: -5px;
  left: -5px;
  width: 10px;
  height: 10px;
}

.arrow.reverse {
  transform: rotate(180deg);
}

.arrow.double::after {
  top: auto;
  bottom: -13px;
  transform: none;
}

.arrow__text {
  position: absolute;
  top: 50%;
  width: min-content;
  background-color: var(--white);
  transform: translate(-50%, -50%);
}

.reverse .arrow__text {
  transform: translate(-50%, -50%) rotate(180deg);
}
</style>
