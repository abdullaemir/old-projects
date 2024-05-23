<template>
  <label :class="['label', `check-${size}`]">
    <input
      type="checkbox"
      class="checkbox"
    />
    <slot />
  </label>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: "S",
  },
});
</script>

<style lang="scss" scoped>
// Общие стили //
.checkbox {
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.checkbox::before {
  background: #f5f5f5;
}

.checkbox::before,
.checkbox::after {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  color: transparent;
  content: "\00D7";
}

.checkbox::after {
  background: center / 65% no-repeat url("~/assets/images/icons/checkbox-tick-white.svg"),
    linear-gradient(144deg, #005eff 0%, #0044b8 27%, #005de8 62%, #003fa9 100%);
  opacity: 0;
}

.checkbox:checked::after {
  opacity: 1;
}

.label {
  display: flex;
  align-items: center;

  // &-grey {
  //     color: #808080;

  //     a {
  //         color: #0154E2;
  //     }
  // }

  // &-black {
  //     color: #000
  // }
}

// Стили размеров //

.check-L {
  // font-size: 32px;
  // line-height: 140%;
  // letter-spacing: -1.28px;

  .checkbox {
    width: 56px;
    height: 56px;
    margin-right: 24px;

    &::after,
    &::before {
      width: 56px;
      height: 56px;
      border-radius: 16px;
    }
  }

  @include mobile {
    // font-size: 14px;
    // line-height: 120%;
    // letter-spacing: -0.56px;

    .checkbox {
      width: 24px;
      height: 24px;
      margin-right: 16px;

      &::after,
      &::before {
        width: 24px;
        height: 24px;
        border-radius: 6px;
      }
    }
  }
}

.check-M {
  .checkbox {
    width: 32px;
    height: 32px;
    margin-right: 16px;

    &::after,
    &::before {
      width: 32px;
      height: 32px;
      border-radius: 8px;
    }
  }

  @include mobile {
    .checkbox {
      width: 24px;
      height: 24px;
      margin-right: 16px;

      &::after,
      &::before {
        width: 24px;
        height: 24px;
        border-radius: 6px;
      }
    }
  }
}

.check-S {
  .checkbox {
    width: 24px;
    height: 24px;
    margin-right: 12px;

    &::after,
    &::before {
      width: 24px;
      height: 24px;
      border-radius: 6px;
    }
  }

  @include mobile {
    .checkbox {
      margin-right: 8px;
    }
  }
}
</style>
