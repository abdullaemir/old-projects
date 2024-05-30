<template>
  <div ref="tooltip" class="tooltip" @mouseover.stop="openTooltip" @mouseout.stop="closeTooltip">
    <slot></slot>
    <transition>
      <div
        v-if="showTooltip"
        ref="tooltipContent"
        class="tooltip__content"
        :class="[positionClass]"
        @mouseover.stop="closeTooltip"
      >
        <slot name="content"></slot>
        <div class="tooltip__decoration"></div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {computed, nextTick, ref} from "vue";

const tooltip = ref("");
const tooltipContent = ref("");
const showTooltip = ref(false);
const positionClass = ref("");

const props = defineProps({
  placement: {
    default: "bottom",
    description: "Один из вариантов: top/right/left/bottom",
    type: String,
  }
})

const closeTooltip = () => {
  showTooltip.value = false
  positionClass.value = ""
}

const placementTooltip = computed(() => {
  let classPlacement = props.placement
  const tooltipData = tooltip.value.getBoundingClientRect()
  const tooltipDataContent = tooltipContent.value.getBoundingClientRect()
  const documentWidth = document.documentElement.clientWidth
  const documentHeight = document.documentElement.clientHeight

  switch (props.placement) {
    case "top": {
      if (tooltipData.left + (tooltipData.width / 2) < (tooltipDataContent.width / 2) + 30) {
        classPlacement = "right"
        break
      }
      if ((documentWidth - tooltipData.right) + (tooltipData.width / 2) < (tooltipDataContent.width / 2) + 30) {
        classPlacement = "left"
        break
      }
      if (tooltipData.top < tooltipDataContent.height + 30) {
        classPlacement = "bottom"
        break
      }
      classPlacement = "top"
      break
    }
    case "right": {
      classPlacement = (documentWidth - tooltipData.right < tooltipDataContent.width + 30) ? "left" : "right"
      break
    }
    case "bottom": {
      if (tooltipData.left + (tooltipData.width / 2) < (tooltipDataContent.width / 2) + 30) {
        classPlacement = "right"
        break
      }
      if ((documentWidth - tooltipData.right) + (tooltipData.width / 2) < (tooltipDataContent.width / 2) + 30) {
        classPlacement = "left"
        break
      }
      if (documentHeight - tooltipData.bottom < tooltipDataContent.height + 30) {
        classPlacement = "top"
        break
      }
      classPlacement = "bottom"
      break
    }
    case "left": {
      classPlacement = (tooltipData.left < tooltipDataContent.width + 30) ? "right" : "left"
      break
    }
    default:
      classPlacement = "bottom"
  }
  return classPlacement
})

const openTooltip = () => {
  showTooltip.value = true
  nextTick(() => {
    positionClass.value = placementTooltip.value
  })
}
</script>

<style scoped>

.tooltip {
  position: relative;
  display: flex;
  width: fit-content;
}

.tooltip__content {
  display: block;
  position: absolute;
  background-color: var(--tooltip-background-color);
  border-radius: var(--tooltip-border-rafius);
  z-index: 100;
  padding: 8px;
  max-width: 250px;
  word-wrap: break-word;
}

.tooltip__decoration {
  position: absolute;
  z-index: 100000;
}

.tooltip__decoration:before {
  content: "";
  height: 0;
  position: absolute;
  width: 0;
}

.top {
  display: block;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 7px;
}

.top > .tooltip__decoration {
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
}

.top > .tooltip__decoration:before {
  border-top: var(--tooltip-border-decoration) solid var(--tooltip-background-color);
  border-left: var(--tooltip-border-decoration) solid transparent;
  border-right: var(--tooltip-border-decoration) solid transparent;
  transform: translateX(-50%);
}

.right {
  display: block;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 7px;
}

.right > .tooltip__decoration {
  left: 0;
  bottom: 50%;
  transform: translateY(-50%);
  transform: translateX(calc(-2 * var(--tooltip-border-decoration)));
}

.right > .tooltip__decoration:before {
  border-top: var(--tooltip-border-decoration) solid transparent;
  border-left: var(--tooltip-border-decoration) solid transparent;
  border-right: var(--tooltip-border-decoration) solid var(--tooltip-background-color);
  border-bottom: var(--tooltip-border-decoration) solid transparent;
  transform: translateY(-50%);
}

.bottom {
  display: block;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 7px;
}

.bottom > .tooltip__decoration {
  left: 50%;
  top: 0;
  transform: translateY(calc(-2 * var(--tooltip-border-decoration)));
}

.bottom > .tooltip__decoration:before {
  border-top: var(--tooltip-border-decoration) solid transparent;
  border-left: var(--tooltip-border-decoration) solid transparent;
  border-right: var(--tooltip-border-decoration) solid transparent;
  border-bottom: var(--tooltip-border-decoration) solid var(--tooltip-background-color);
  transform: translateX(-50%);
}

.left {
  display: block;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 7px;
}

.left > .tooltip__decoration {
  left: 100%;
  bottom: 50%;
  transform: translateY(-50%);
}

.left > .tooltip__decoration:before {
  border-top: var(--tooltip-border-decoration) solid transparent;
  border-left: var(--tooltip-border-decoration) solid var(--tooltip-background-color);
  border-right: var(--tooltip-border-decoration) solid transparent;
  border-bottom: var(--tooltip-border-decoration) solid transparent;
  transform: translateY(-50%);
}

.tooltip__content {
  color: var(--tooltip-text-color);
  font-size: 12px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
