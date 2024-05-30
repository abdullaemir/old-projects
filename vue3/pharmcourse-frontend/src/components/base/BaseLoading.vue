<template>
  <svg  :height="size==='auto'?'100%':size" :width="size==='auto'?'100%':size" class="spinner" viewBox="25 25 50 50">
    <circle class="circle" cx="50" cy="50" r="23" />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: '72',
    description: "auto | Number"
  }
})
</script>
<style scoped>

.spinner {
  display: block;
  animation: rotate 2s linear infinite;
}

.circle {
  stroke: #E7F0FE;
  stroke-width: 3px;
  fill: none;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 210;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 150, 210;
    stroke-dashoffset: -55;
  }
  100% {
    stroke-dasharray: 150, 210;
    stroke-dashoffset: -140;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
