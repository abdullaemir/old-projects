<script setup>
defineProps({
  card: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card">
    <app-link
      class="card__link"
      :to="card.link"
      :text="{ size: 'small' }"
      is-static
    >
      {{ card.title }}
    </app-link>
    <p class="card__description">{{ card.description }}</p>
  </div>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  display: grid;
  overflow: hidden;
  padding: 16px 16px 24px;
  border-radius: 12px;
  grid-row-gap: 16px;

  @include border();

  @include transition(
    $property: (
      border-color,
      color,
    )
  );

  @include laptop() {
    align-content: start;
    padding: 24px;
    border-radius: 24px;
  }

  @include hover() {
    border-color: transparent;
    color: $text-color-white;
  }

  & &__link {
    z-index: 1;

    @include transition($reset: true);

    @include tablet() {
      @include text-large($letter-spacing: -0.05em);
    }

    &::before {
      position: absolute;
      z-index: -1;
      background-image: $gradient;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100%;
      content: "";
      inset: 0;
      opacity: 0;

      @include transition(
        $duration: (
          0.8s,
          $transition-duration,
        ),
        $property: (
          background-size,
          opacity,
        )
      );
    }

    @include hover() {
      &::before {
        background-size: 500%;
        opacity: 1;
      }
    }

    &::after {
      position: absolute;
      content: "";
      inset: 0;
    }
  }

  &__description {
    z-index: 1;
    pointer-events: none;

    @include tablet($mobile-first: false) {
      font-size: 16px;
    }
  }
}
</style>
