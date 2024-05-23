<template>
  <section class="career__main">
    <p class="text-XL">
      Мы предлагаем стабильную и интересную работу в дружном коллективе, достойную заработную плату,
      прекрасные условия труда, возможности для обучения и профессионального роста
    </p>
  </section>

  <section class="career__vacancies">
    <div class="career__vacancies__filters button-M">
      <select name="city">
        <option
          value=""
          selected
        >
          Все города
        </option>
        <option
          v-for="city in cities"
          :value="city.name"
        >
          {{ city.name }}
        </option>
      </select>
      <select name="specialization">
        <option
          value=""
          selected
        >
          Все специализации
        </option>
        <option value=""></option>
      </select>
      <select name="branch">
        <option
          value=""
          selected
        >
          Все подразделения
        </option>
        <option value=""></option>
      </select>
    </div>

    <component
      v-for="vacancy in vacancies"
      :is="vacancy.link ? AppLink : 'div'"
      class="career__vacancies__item text-L"
      :href="vacancy.link"
      isStatic
    >
      <div class="item-city">
        <app-image image="icons/place-flag.svg" />
        <p>{{ vacancy.city }}</p>
      </div>

      <component :is="vacancy.link ? AppLink : 'p'">
        <app-title
          size="L"
          tag="h3"
          class="item-title"
        >
          <p v-html="vacancy.title"></p>
          <p v-if="vacancy.link">›</p>
        </app-title>
      </component>

      <div
        class="item-info"
        v-if="vacancy.schedule || vacancy.probation || vacancy.experience"
      >
        <div
          class="item-info__schedule"
          v-if="vacancy.schedule"
        >
          <app-caption>График работы</app-caption>
          <p>{{ vacancy.schedule }}</p>
        </div>
        <div
          class="item-info__probation"
          v-if="vacancy.probation"
        >
          <app-caption>Испытательный срок</app-caption>
          <p>{{ vacancy.probation }}</p>
        </div>
        <div
          class="item-info__experience"
          v-if="vacancy.experience"
        >
          <app-caption>Опыт работы</app-caption>
          <p>{{ vacancy.experience }}</p>
        </div>
      </div>
      <p
        class="item-description"
        v-if="vacancy.description"
        v-html="vacancy.description"
      ></p>
      <div
        class="item-contacts"
        v-if="vacancy.contact_phone || vacancy.hr_phone || vacancy.email"
      >
        <div
          class="item-contacts__contact-phone"
          v-if="vacancy.contact_phone"
        >
          <app-caption>Контактный телефон</app-caption>
          <p>{{ vacancy.contact_phone }}</p>
        </div>
        <div
          class="item-contacts__hr-phone"
          v-if="vacancy.hr_phone"
        >
          <app-caption>Телефон отдела кадров</app-caption>
          <p>{{ vacancy.hr_phone }}</p>
        </div>
        <div
          class="item-contacts__email"
          v-if="vacancy.email"
        >
          <app-caption>Электронная почта</app-caption>
          <p>{{ vacancy.email }}</p>
        </div>
      </div>
    </component>
  </section>
</template>

<script setup>
import { AppLink } from "#components";

//copied from header
const cities = [
  {
    name: "Москва",
    link: "#",
  },
  {
    name: "Санкт-Петербург",
    link: "#",
  },
  {
    name: "Брянск",
    link: "#",
  },
  {
    name: "Курск",
    link: "#",
  },
  {
    name: "Белгород",
    link: "#",
  },
  {
    name: "Нижний Новгород",
    link: "#",
  },
  {
    name: "Самара",
    link: "#",
  },
  {
    name: "Пенза",
    link: "#",
  },
  {
    name: "Балаково",
    link: "#",
  },
  {
    name: "Новосибирск",
    link: "#",
  },
  {
    name: "Барнаул",
    link: "#",
  },
  {
    name: "Краснодар",
    link: "#",
  },
  {
    name: "Ростов-на-Дону",
    link: "#",
  },
  {
    name: "Таганрог",
    link: "#",
  },
  {
    name: "Екатеринбург",
    link: "#",
  },
  {
    name: "Пермь",
    link: "#",
  },
  {
    name: "Челябинск",
    link: "#",
  },
  {
    name: "Уфа",
    link: "#",
  },
];

const vacancies = [
  {
    city: "Москва",
    title: "Оператор ОТК",
    schedule: "3х сменный",
    probation: "3 месяца",
    experience: "от 1 года",
    description:
      "Оперативный контроль весовых характеристик. <nobr>Контроль документации</nobr> вывозимой металлопродукции",
    link: "http://localhost:3000/career-vacancy",
  },
  {
    city: "Москва",
    title: "Мастер контрольный <nobr>за отпуском</nobr> материальных ценностей",
    schedule: "3х сменный",
    probation: "3 месяца",
    experience: "от 1 года",
    description:
      "Документальный и инструментальный контроль поступающей автотранспортом металлопродукции и попутного груза.",
    link: "http://localhost:3000/career-vacancy",
  },
  {
    city: "Москва",
    title: "Менеджер <nobr>по продаже</nobr> металлопроката",
    contact_phone: "+7 495 925-76-06 (доб. 8848)",
  },
  {
    city: "Москва",
    title:
      "Руководитель федеральной дистрибуционной сети, Менеджер <nobr>по продажам</nobr> нержавеющего проката, Стропальщик, Заведующий складом, Крановщик (мостовые, козловые краны)",
    hr_phone: "+7  499 171-55-07",
    email: "job@mc.ru",
  },
  {
    city: "Московская область, Лобня",
    title: "Менеджер <nobr>по продаже</nobr> металлопроката",
    contact_phone: "+7 495 925-76-06 (доб. 8848)",
  },
  {
    city: "Москва",
    title: "Менеджер <nobr>по продаже</nobr> металлопроката",
    schedule: "5/2",
    probation: "3 месяца",
    experience: "от 3-х лет",
    description:
      "Активные оптовые <nobr>и розничные</nobr> продажи, поиск клиентов. <nobr>Работа с постоянными</nobr> клиентами. Документальная работа <nobr>по сопровождению</nobr> сделок. Работа <nobr>с дебиторской</nobr> задолженностью.",
    link: "http://localhost:3000/career-vacancy",
  },
  {
    city: "Санкт-Петербург",
    title: "Специалист <nobrпо тендерным</nobr> продажам",
    contact_phone: "+7 495 925-76-06 (доб. 8848)",
  },
  {
    city: "test",
    title: "Lorem ipsum",
    schedule: "urna",
    probation: "leo quam",
    experience: "eros",
    description:
      "Nulla fermentum ullamcorper metus, vel consequat lacus malesuada quis. Vestibulum ac quam at mauris fringilla consectetur. Nam id sodales sapien, interdum ornare lorem. Duis scelerisque a nisi vitae interdum. Suspendisse metus nulla, fringilla non magna sit amet, pharetra egestas lectus.",
    contact_phone: "+0 000 000-00-00 (доб. 0000)",
    hr_phone: "+0  000 00-00-00",
    email: "lorem@ipsum.lat",
    link: "http://localhost:3000/career-vacancy",
  },
];
</script>

<style lang="scss" scoped>
.career__main {
  display: flex;
  width: 100%;
  justify-content: space-between;
  column-gap: 24px;

  @include mobile($mobile-first: false) {
    flex-direction: column;
    row-gap: 24px;

    br {
      display: none;
    }
  }

  .text-L {
    width: 130%;
    line-height: 140%;

    @include mobile($mobile-first: false) {
      width: 100%;
    }
  }
}

.career__vacancies {
  width: 1140px;

  margin: {
    top: 48px;
    bottom: 79px;
  }

  @include mobile($mobile-first: false) {
    width: 100%;

    margin: {
      top: 32px;
    }
  }

  &__filters {
    display: inline-flex;
    width: 100%;
    justify-content: space-between;
    column-gap: 24px;

    @include mobile($mobile-first: false) {
      flex-direction: column;
      row-gap: 16px;
    }

    select {
      display: flex;
      width: calc((100% - 48px) / 3);
      align-items: center;
      justify-content: space-between;
      padding: 6px 16px;
      border: 3px solid #f5f5f5;
      border-radius: 12px;

      @include mobile($mobile-first: false) {
        width: 100%;
      }

      option {
        //will be stylized by plagin
      }
    }
  }

  a.career__vacancies__item {
    background-color: #f5f5f5;
  }

  &__item {
    display: block;
    width: 100%;
    padding: 32px 48px;
    border: 3px solid #f5f5f5;
    border-radius: 24px;
    margin-top: 32px;

    @include mobile($mobile-first: false) {
      padding: 24px 16px;
    }

    .item {
      &-city {
        display: flex;
        align-items: center;
        column-gap: 8px;
        font-size: 24px;
        line-height: 140%;

        @include mobile($mobile-first: false) {
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -0.72px;
        }
      }

      &-title {
        margin: {
          top: 16px;
          bottom: 32px;
        }

        p {
          display: inline;
        }

        p:nth-child(2) {
          margin-left: 10px;
        }

        @include mobile($mobile-first: false) {
          margin-bottom: 16px;
        }
      }

      &-info {
        display: flex;
        column-gap: 194px;

        @include mobile($mobile-first: false) {
          flex-direction: column;
          row-gap: 16px;
        }
      }

      &-description {
        margin-top: 64px;
        font-size: 32px;
        letter-spacing: -0.64px;
        line-height: 140%;

        @include mobile($mobile-first: false) {
          margin-top: 32px;
          font-size: 16px;
          letter-spacing: -0.32px;
        }
      }

      &-contacts {
        display: flex;
        flex-wrap: wrap;
        margin-top: 32px;
        column-gap: 103px;

        @include mobile($mobile-first: false) {
          flex-direction: column;
          row-gap: 16px;
        }
      }
    }
  }
}
</style>
