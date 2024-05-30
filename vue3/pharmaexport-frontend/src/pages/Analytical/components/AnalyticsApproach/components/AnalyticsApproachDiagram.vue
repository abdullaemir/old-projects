<template>
  <div
    ref="diagram"
    class="diagram"
  >
    <div class="diagram__progress">
      <BaseProgressBar
        :class="{ animation: isAnimation }"
        is-gradient
        :percentage="content[currentContent].percents"
        progress-color="#0066ff"
        progressbar-color="#ffffff"
        :size="isTablet ? 440 : 250"
        start-color="#152785"
        stop-color="#0066ff"
        stroke-linecap="butt"
        :stroke-width="isTablet ? 60 : 40"
      >
        {{ content[currentContent].percents }}
        <span class="diagram__percents">%</span>
      </BaseProgressBar>
    </div>

    <div class="container--wide diagram__wrapper">
      <span class="diagram__title">
        {{ content[currentContent].title }}
      </span>

      <p class="diagram__description">
        {{ content[currentContent].description }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useIntervalFn, useElementVisibility, useBreakpoints } from "@vueuse/core";
import { useContext } from "vite-ssr";
import { watch, ref } from "vue";

import BaseProgressBar from "~/components/base/BaseProgressBar.vue";

const { isClient } = useContext();
const diagram = ref(null);
const currentContent = ref(1);
const interval = ref(2000);
const isDiagramVisible = useElementVisibility(diagram);
const isAnimation = ref(true);
const isTablet = ref(true);

const breakpoints = useBreakpoints({
  tablet: 768,
});

if (isClient) {
  isTablet.value = breakpoints.greater("tablet");
}

const content = [
  {
    description: "Data collection from all-range valid sources",
    percents: 0,
    title: "Research",
  },
  {
    description: "Data collection from all-range valid sources",
    percents: 25,
    title: "Research",
  },
  {
    description: "Data conversion into insights by business intelligence and analytics tools",
    percents: 50,
    title: "Analyze",
  },
  {
    description: "Comprehensive insights and constructive advice",
    percents: 100,
    title: "Recommend",
  },
];

const { resume, isActive: isActiveAnimation } = useIntervalFn(
  () => {
    const isLastContent = currentContent.value === content.length - 1;

    isAnimation.value = !isLastContent;
    interval.value = isLastContent ? 10 : 2000;
    currentContent.value = isLastContent ? 0 : currentContent.value + 1;
  },
  interval,
  {
    immediate: false,
  },
);

watch(
  () => isDiagramVisible.value,
  (isVisible) => {
    if (isVisible && !isActiveAnimation.value) {
      resume();
    }
  },
);
</script>

<style scoped>
.diagram {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 278px;
  margin-bottom: 8px;
  overflow: hidden;
}

@media (min-width: 768px) {
  .diagram {
    height: 520px;
    margin-bottom: 0;
  }
}

@media (min-width: 1170px) {
  .diagram {
    grid-column: 2 / 3;
  }
}

.diagram__progress {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 500px;
  transform: translate(-50%, -50%);
}

@media (min-width: 768px) {
  .diagram__progress {
    width: 880px;
    height: 880px;
  }
}

.diagram__progress::before,
.diagram__progress::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  box-shadow: 0 0 50px rgb(0 89 193 / 0.1);
  transform: translate(-50%, -50%);
}

@media (min-width: 768px) {
  .diagram__progress::before,
  .diagram__progress::after {
    width: 440px;
    height: 440px;
  }
}

.diagram__progress::before {
  z-index: 1;
  width: 182px;
  height: 182px;
  box-shadow: inset 0 0 50px rgb(0 89 193 / 0.1);
}

@media (min-width: 768px) {
  .diagram__progress::before {
    width: 320px;
    height: 320px;
  }
}

:deep(.progressbar.animation .progressbar__progress) {
  transition: stroke-dashoffset 1s ease;
}

:deep(.progressbar__description) {
  font-weight: 700;
  font-size: 28px;
  color: #152785;
  transform: translate(-50%, -55px);
}

@media (min-width: 768px) {
  :deep(.progressbar__description) {
    font-size: 48px;
    transform: translate(-50%, -100px);
  }
}

.diagram__percents {
  font-weight: 600;
  font-size: 12px;
}

@media (min-width: 768px) {
  .diagram__percents {
    font-size: 16px;
  }
}

.diagram__wrapper {
  z-index: 1;
  height: 50%;
  padding-top: 16px;
  padding-bottom: 56px;
  border-top: 2px solid #f8f9fa;
  background-color: rgb(255 255 255 / 0.9);
  backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
}

@media (min-width: 768px) {
  .diagram__wrapper {
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    padding: 20px 136px 172px;
  }
}

.diagram__title {
  display: block;
  margin-bottom: 4px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
}

.diagram__description {
  text-align: center;
}
</style>
