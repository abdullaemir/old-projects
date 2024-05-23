<script setup>
const menu = {
  columns: [
    {
      sections: [
        {
          links: [
            {
              name: "О компании",
              url: "#",
            },
            {
              name: "Основная деятельность",
              url: "#",
            },
            {
              name: "История",
              url: "#",
            },
            {
              name: "Награды и достижения",
              url: "#",
            },
            {
              name: "Партнерам",
              url: "#",
            },
            {
              name: "УЗО ФТС РФ",
              url: "#",
            },
            {
              name: "Охрана окружающей среды",
              url: "#",
            },
            {
              name: "Учебный центр",
              url: "#",
            },
            {
              name: "Акционерам",
              url: "#",
            },
            {
              name: "Политика конфиденциальности",
              url: "#",
            },
          ],
        },
      ],
    },
    {
      sections: [
        {
          links: [
            {
              name: "Пресс-центр",
              url: "#",
            },
            {
              name: "Общественная деятельность",
              url: "#",
            },
            {
              name: "Корпоративная ответственность",
              url: "#",
            },
            {
              name: "Поддержка российского спорта",
              url: "#",
            },
            {
              name: "Фотогалерея",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Новости",
              url: "#",
            },
          ],
        },
      ],
    },
    {
      sections: [
        {
          links: [
            {
              name: "Производство",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Контакты и филиалы",
              url: "#",
            },
            {
              name: "Типовой договор",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "ГОСТы и ТУ",
              url: "#",
            },
          ],
        },
      ],
    },
    {
      sections: [
        {
          links: [
            {
              name: "Услуги и сервис",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Онлайн-сервисы",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Доставка",
              url: "#",
            },
          ],
        },
      ],
    },
  ],
};
</script>

<template>
  <nav class="footer-menu">
    <div
      v-for="column in menu.columns"
      class="footer-menu__column"
    >
      <section
        v-for="section in column.sections"
        class="footer-menu__section"
      >
        <app-link
          v-for="(link, index) in section.links"
          :class="['footer-menu__link', index === 0 ? 'highlighted' : '']"
          :text="index === 0 ? { size: 'xsmall' } : null"
          :to="link.url"
        >
          {{ link.name }}
        </app-link>
        <span
          v-if="section.links.length === 1"
          class="footer-menu__fake"
        >
          &nbsp;
        </span>
      </section>
    </div>

    <section class="footer-menu__section mobile">
      <span class="footer-menu__link highlighted">Язык сайта</span>
      <language-switcher
        class="footer-menu__switcher u-button-medium"
        is-button-static
      />
    </section>
  </nav>
</template>

<style lang="scss" scoped>
.footer-menu {
  position: relative;
  display: grid;
  grid-row-gap: 32px;

  @include desktop() {
    justify-content: space-between;
    grid-auto-flow: column;
  }

  &__column {
    display: grid;
    grid-row-gap: 32px;

    @include desktop() {
      align-content: start;
    }

    &:last-of-type {
      @include desktop() {
        grid-row-gap: 16px;
      }
    }
  }

  &__section {
    position: relative;
    display: grid;
    padding-left: calc(50% + 10px);
    grid-row-gap: 16px;

    @include desktop() {
      padding-left: 0;
    }

    &.mobile {
      @include desktop() {
        display: none;
      }
    }
  }

  &__link {
    &.highlighted {
      @include tablet() {
        @include text-small($font-weight: 500);
      }

      @include desktop($mobile-first: false) {
        position: absolute;
        left: 0;
        width: 100%;
        max-width: calc(50% - 10px);
      }

      &::after {
        margin-left: 4px;
        opacity: 1;

        @include desktop() {
          display: none;
        }
      }
    }
  }

  &__fake {
    @include desktop() {
      display: none;
    }
  }

  &__switcher {
    height: 1em;
    align-content: center;
  }
}
</style>
