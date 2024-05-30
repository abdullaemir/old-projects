<template>
  <div class="header-title">
    <h3
      :class="['header-title__name', { 'active': slideCount === 1 }]"
      @click.prevent="changeSlideCount(1)"
    >
      Алиса Сурикова
    </h3>
    <p class="header-title__description">Консультант по&nbsp;финансам и&nbsp;бизнес-процессам</p>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "TheHeaderTitle",
  computed: {
    ...mapState({
      slideCount: (state) => state.slide.slideCount,
    }),
  },
  methods: {
    ...mapMutations({
      changeSlideCount: "slide/changeSlideCount",
    }),
  },
};
</script>

<style scoped>
.header-title {
  width: 100%;
  max-width: 160px;
}

@media (min-width: 768px) {
  .header-title {
    max-width: 200px;
  }
}

@media (min-width: 1024px) {
  .header-title {
    margin-bottom: 48px;
  }
}

@media (min-width: 1920px) {
  .header-title {
    max-width: 209px;
    margin-bottom: 74px;
  }
}

.header-title__name {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
}

@media (min-width: 768px) {
  .header-title__name {
    font-size: 25px;
  }
}

@media (min-width: 1024px) {
  .header-title__name {
    position: relative;
    cursor: pointer;
  }
}

@media (min-width: 1920px) {
  .header-title__name {
    font-size: 35px;
    white-space: nowrap;
  }
}

@media (min-width: 1024px) {
  .header-title__name::before {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -27px;
    width: 17px;
    height: 3px;
    background-image: linear-gradient(to right, var(--background-color-tertiary) 50%, transparent 50%);
    background-size: 200% 100%;
    background-position: right;
    background-repeat: no-repeat;
    transition-property: background-position;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
  }
}

@media (min-width: 1280px) {
  .header-title__name::before {
    left: -60px;
    width: 50px;
  }
}

@media (min-width: 1920px) {
  .header-title__name::before {
    left: -61px;
  }
}

@media (min-width: 1024px) {
  .header-title__name.active::before {
    background-position: left;
  }
}

.header-title__description {
  margin: 0;
  font-size: 12px;
  opacity: 0.6;
}

@media (min-width: 768px) {
  .header-title__description {
    font-size: 14px;
  }
}

@media (min-width: 1920px) {
  .header-title__description {
    font-size: 16px;
  }
}
</style>
