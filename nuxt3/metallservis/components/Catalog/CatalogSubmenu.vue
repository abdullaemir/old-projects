<template>
  <nav class="submenu">
    <section
      v-for="section in submenu.sections"
      class="submenu__section"
    >
      <app-link
        v-for="link in section.links"
        class="submenu__link"
        :to="link.url"
      >
        {{ link.name }}
      </app-link>
      <app-link
        v-if="section.remainder"
        class="submenu__link remainder"
        :to="section.links[0].url"
      >
        Ещё {{ `${section.remainder} ${ending(section.remainder)}` }}
      </app-link>
    </section>
  </nav>
</template>

<script setup>
defineProps({
  submenu: {
    type: Object,
    required: true,
  },
});

const ending = function (number) {
  const q1 = Math.abs(number) % 100;
  const q2 = q1 % 10;

  if (q1 > 10 && q1 < 20) return "категорий";

  if (q2 > 1 && q2 < 5) return "категории";

  if (q2 === 1) return "котегория";

  return "категорий";
};
</script>

<style lang="scss" scoped>
.submenu {
  @include desktop() {
    margin-top: -32px;
    column-count: 3;
    column-gap: 24px;
    column-width: 342px;
  }

  &__section {
    @include desktop() {
      display: inline-grid;
      width: 100%;
      margin-top: 32px;
      break-inside: avoid-column;
      grid-row-gap: 4px;
    }
  }

  &__link {
    @include desktop() {
      padding: 6px 8px;
    }

    &:first-child {
      @include desktop() {
        font-weight: 500;
      }
    }

    &.remainder {
      @include desktop() {
        color: rgba($text-color-gray, 0.3);
      }
    }
  }
}
</style>
