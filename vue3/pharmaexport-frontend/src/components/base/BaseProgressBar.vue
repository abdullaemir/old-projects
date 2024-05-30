<!-- TODO: убрать transform -->
<template>
  <div class="progressbar">
    <svg
      width="100%"
      height="100%"
      :viewBox="`0 0 ${size * 2} ${size * 2}`"
    >
      <defs v-if="isGradient">
        <linearGradient
          id="gradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop
            offset="0%"
            :stop-color="startColor"
          />
          <stop
            offset="100%"
            :stop-color="stopColor"
          />
        </linearGradient>
      </defs>

      <circle
        v-if="!isProgressbarVisible"
        :cx="size"
        :cy="size"
        :r="radius"
        :stroke="progressbarColor"
        :stroke-width="strokeWidth"
        fill="none"
      />

      <circle
        class="progressbar__progress"
        :cx="size"
        :cy="size"
        :r="radius"
        :stroke="isGradient ? `url('#gradient')` : progressColor"
        :stroke-width="strokeWidth"
        fill="none"
        :stroke-linecap="strokeLinecap"
        :stroke-dasharray="strokeDasharray"
        :stroke-dashoffset="strokeDashoffset"
      />
    </svg>

    <div class="progressbar__description">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  isGradient: {
    type: Boolean,
    default: false,
  },
  startColor: {
    default: "#ffffff",
    type: String,
  },
  stopColor: {
    default: "#000000",
    type: String,
  },
  size: {
    type: Number,
    default: 200,
  },
  isProgressbarVisible: {
    type: Boolean,
  },
  percentage: {
    default: 0,
    type: Number,
  },
  progressColor: {
    default: "#67c23a",
    type: String,
  },
  progressbarColor: {
    default: "#ebeef5",
    type: String,
  },
  strokeLinecap: {
    default: "round",
    type: String,
  },
  strokeWidth: {
    type: Number,
    default: 20,
  },
});

const radius = computed(() => (props.size - props.strokeWidth) / 2);
const strokeDasharray = computed(() => 2 * Math.PI * radius.value);

const strokeDashoffset = computed(() => {
  let percentage = props.percentage;

  if (String(percentage) > 100) {
    percentage = Number(String(percentage).substring(String(percentage).length, 2));
  }

  return strokeDasharray.value - (strokeDasharray.value / 100 * percentage);
});
</script>

<style scoped>
.progressbar {
  position: relative;
  width: 100%;
  height: 100%;
}

.progressbar__description {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
