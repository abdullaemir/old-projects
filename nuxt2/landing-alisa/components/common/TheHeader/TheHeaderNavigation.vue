<template>
  <nav class="header-navigation">
    <ul class="header-navigation__list">
      <li
        class="header-navigation__item"
        v-for="(navigationItem, index) in navigationList"
        :key="index"
      >
        <a
          :class="['header-navigation__link', { 'active': slideCount === navigationItem.slide }]"
          @click.prevent="changeSlideCount(navigationItem.slide)"
        >
          {{ navigationItem.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "TheHeaderNavigation",
  data() {
    return {
      navigationList: [
        {
          name: "Ключевые компетенции",
          slide: 2,
        },
        {
          name: "Образование",
          slide: 3,
        },
        {
          name: "Опыт работы",
          slide: 4,
        },
        {
          name: "Кейсы",
          slide: 5,
        },
        {
          name: "Услуги",
          slide: 6,
        },
        {
          name: "Консультация",
          slide: 7,
        },
      ],
    }
  },
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
.header-navigation {
  display: none;
}

@media (min-width: 1024px) {
  .header-navigation {
    display: block;
    margin-bottom: 54px;
  }
}

@media (min-width: 1024px) {
  .header-navigation__list {
    margin: 0;
    padding-left: 0;
  }
}

@media (min-width: 1024px) {
  .header-navigation__item:not(:last-child) {
    margin-bottom: 9px;
  }
}

@media (min-width: 1920px) {
  .header-navigation__item:not(:last-child) {
    margin-bottom: 30px;
  }
}

@media (min-width: 1024px) {
  .header-navigation__link {
    position: relative;
    font-weight: 500;
    opacity: 0.6;
    cursor: pointer;
    transition-property: opacity;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
  }
}

@media (min-width: 1920px) {
  .header-navigation__link {
    font-size: 18px;
  }
}

@media (any-pointer: fine) {
  .header-navigation__link:hover,
  .header-navigation__link:focus {
    opacity: 1;
  }
}

@media (min-width: 1024px) {
  .header-navigation__link.active {
    opacity: 1;
  }
}

@media (min-width: 1024px) {
  .header-navigation__link::before {
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
  .header-navigation__link::before {
    left: -60px;
    width: 50px;
  }
}

@media (min-width: 1920px) {
  .header-navigation__link::before {
    left: -61px;
  }
}

@media (min-width: 1024px) {
  .header-navigation__link.active::before {
    background-position: left;
  }
}
</style>
