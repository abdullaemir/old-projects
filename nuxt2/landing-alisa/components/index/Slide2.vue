<template>
  <section class="slide-competencies slide">
    <div class="container">
      <h2 class="slide-competencies__title slide__title">
        Ключевые
        <span class="slide__title--gold">Компетенции</span>
      </h2>
      <div class="slide-competencies__wrapper">
        <div>
          <ul class="slide-competencies-list">
            <li
              class="slide-competencies-list__item"
              v-for="(listItem, index) in list"
              :key="index"
            >
              <img
                class="slide-competencies-list__icon"
                :src="require(`~/assets/icons/${listItem.icon}--gold.svg`)"
                alt=""
              >
              {{ listItem.text }}
            </li>
          </ul>
          <BaseButton
            class="slide-competencies__button"
            @click="$emit('openModal')"
          >
            Записаться на консультацию
          </BaseButton>
        </div>
        <ul class="slide-competencies-tile">
          <li
            class="slide-competencies-tile__item"
            v-for="(tileItem, index) in tile"
            :key="index"
          >
            <img
              class="slide-competencies-tile__icon"
              :src="require(`~/assets/icons/${tileItem.icon}--white.svg`)"
              alt=""
            >
            {{ tileItem.text }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import BaseButton from "~/components/base/BaseButton.vue";

export default {
  name: "Slide2",
  components: {
    BaseButton,
  },
  data() {
    return {
      list: [
        {
          text: "Степень МВА",
          icon: "cup",
        },
        {
          text: "Оптимизация всех бизнес-процессов в компании (продажи, маркетинг, производственный учет, бухгалтерский и налоговый учет)",
          icon: "settings",
        },
        {
          text: "Рост прибыльности вашего бизнеса через выстроенный управленческий учет",
          icon: "graph",
        },
      ],
      tile: [
        {
          text: "Финансовый учет",
          icon: "box",
        },
        {
          text: "Продажи",
          icon: "cart",
        },
        {
          text: "Управление персоналом",
          icon: "people",
        },
        {
          text: "Стратегический маркетинг",
          icon: "document",
        },
        {
          text: "Отстройка с нуля бизнес-процессов, их автоматизация",
          icon: "portfolio",
        },
        {
          text: "Оптимизация затрат, рост выручки направлений",
          icon: "settings",
        },
        {
          text: "Финансовый анализ",
          icon: "chart",
        },
      ],
    }
  },
};
</script>

<style scoped>
.slide-competencies__title {
  margin-bottom: 27px;
  padding-top: 70px;
}

@media (min-width: 768px) {
  .slide-competencies__title {
    margin-bottom: 10px;
    padding-top: 80px;
  }
}

@media (min-width: 1024px) {
  .slide-competencies__title {
    padding-top: 0;
  }
}

@media (min-width: 1280px) {
  .slide-competencies__title {
    margin-bottom: -83px;
  }
}

@media (min-width: 1920px) {
  .slide-competencies__title {
    margin-bottom: -129px;
  }
}

@media (min-width: 768px) {
  .slide-competencies__wrapper {
    display: flex;
    align-items: flex-start;
  }
}

.slide-competencies-list {
  margin: 0 0 47px;
  padding-left: 0;
}

@media (min-width: 768px) {
  .slide-competencies-list {
    padding-top: 17px;
  }
}

@media (min-width: 1280px) {
  .slide-competencies-list {
    padding-top: 110px;
  }
}

@media (min-width: 1920px) {
  .slide-competencies-list {
    padding-top: 180px;
  }
}

.slide-competencies-list__item {
  display: flex;
  align-items: center;
  font-weight: 300;
  letter-spacing: 0.04em;
}

@media (min-width: 1920px) {
  .slide-competencies-list__item {
    font-size: 24px;
  }
}

.slide-competencies-list__item:not(:last-child) {
  margin-bottom: 30px;
}

.slide-competencies-list__icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.slide-competencies__button {
  margin-bottom: 50px;
}

@media (min-width: 768px) {
  .slide-competencies__button {
    max-width: 276px;
    margin-bottom: 0;
  }
}

@media (min-width: 1920px) {
  .slide-competencies__button {
    max-width: 450px;
  }
}

.slide-competencies-tile {
  display: grid;
  grid-template-rows: repeat(3, 98px);
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 6px 7px;
  margin: 0;
  padding-left: 0;
}

@media (min-width: 768px) {
  .slide-competencies-tile {
    grid-template-columns: repeat(3, 102px);
    margin-left: 36px;
  }
}

@media (min-width: 1024px) {
  .slide-competencies-tile {
    margin-left: 18px;
  }
}

@media (min-width: 1280px) {
  .slide-competencies-tile {
    grid-template-rows: repeat(3, 130px);
    grid-template-columns: repeat(3, 140px);
    grid-gap: 10px 7px;
    margin-left: 56px;
  }
}

@media (min-width: 1920px) {
  .slide-competencies-tile {
    grid-template-rows: repeat(3, 219px);
    grid-template-columns: repeat(3, 235px);
    grid-gap: 17px 12px;
    margin-left: 80px;
  }
}

.slide-competencies-tile__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 3px;
  background-color: var(--background-color-primary);
  font-size: 10px;
  font-weight: 300;
  text-align: center;
}

@media (min-width: 1280px) {
  .slide-competencies-tile__item {
    border-radius: 5px;
    font-size: 14px;
  }
}

@media (min-width: 1920px) {
  .slide-competencies-tile__item {
    border-radius: 8px;
    font-size: 23px;
  }
}

@media (any-pointer: fine) {
    .slide-competencies-tile__item:hover {
      background-image: var(--background-color-hexadecimal);
    }
}

.slide-competencies-tile__item:nth-child(5) {
  grid-column: 2 / 4;
}

.slide-competencies-tile__item:nth-child(6) {
  grid-column: 1 / 3;
}

.slide-competencies-tile__icon {
  width: 25px;
  height: 25px;
  margin-bottom: 7px;
}

@media (min-width: 1280px) {
  .slide-competencies-tile__icon {
    width: 34px;
    height: 34px;
    margin-bottom: 9px;
  }
}

@media (min-width: 1920px) {
  .slide-competencies-tile__icon {
    width: 57px;
    height: 57px;
    margin-bottom: 15px;
  }
}
</style>
