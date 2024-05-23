<script setup>
const contacts = {
  columns: [
    {
      sections: [
        {
          caption: "Телефон",
          links: [
            {
              name: "+7&nbsp;800&nbsp;555&#8209;11&#8209;55",
              url: "tel:+78005551155",
            },
            {
              name: "+7&nbsp;495&nbsp;925&#8209;11&#8209;55",
              url: "tel:+74959251155",
            },
            {
              name: "+7&nbsp;495&nbsp;660&#8209;06&#8209;87",
              url: "tel:+74956600687",
            },
          ],
        },
      ],
    },
    {
      sections: [
        {
          caption: "Почта",
          links: [
            {
              name: "contact@mc.ru",
              url: "mailto:contact@mc.ru",
            },
          ],
        },
        {
          caption: "Скайп",
          links: [
            {
              name: "mc9251155",
              url: "skype:mc9251155?chat",
            },
          ],
        },
      ],
    },
    {
      sections: [
        {
          caption: "Офис",
          links: [
            {
              name: "109428, Москва,<br />Cтахановская, 19",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Все контакты",
              url: "#",
              isCapped: true,
            },
          ],
        },
      ],
    },
  ],
};
</script>

<template>
  <div class="footer-contacts">
    <div
      v-for="column in contacts.columns"
      class="footer-contacts__column"
    >
      <section
        v-for="section in column.sections"
        class="footer-contacts__section"
      >
        <app-caption v-if="section.caption">{{ section.caption }}</app-caption>

        <nav class="footer-contacts__navigation">
          <app-link
            v-for="link in section.links"
            class="footer-contacts__navigation__link"
            :text="{ size: 'xsmall' }"
            :to="link.url"
          >
            <span v-html="link.name" />
          </app-link>
        </nav>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.footer-contacts {
  display: grid;
  justify-content: start;
  grid-row-gap: 32px;

  @include laptop() {
    display: flex;
  }

  &__column {
    display: grid;
    align-content: end;
    grid-column-gap: 32px;
    grid-template-columns: repeat(2, 1fr);

    @include laptop() {
      align-content: space-between;
      grid-row-gap: 24px;
      grid-template-columns: auto;
    }

    &:not(:first-child) {
      @include laptop() {
        margin-left: 100px;
      }
    }

    &:last-child {
      @include laptop() {
        margin-left: auto;
      }
    }
  }

  &__section {
    display: grid;
    align-items: end;
    grid-row-gap: 8px;

    @include laptop() {
      grid-row-gap: 14px;
    }
  }

  &__navigation {
    display: grid;
    grid-row-gap: 16px;

    @include laptop() {
      grid-row-gap: 24px;
    }

    & &__link {
      @include tablet() {
        @include text-large();
      }

      &.u-capped::after {
        margin-left: 4px;
        opacity: 1;
      }
    }
  }
}
</style>
