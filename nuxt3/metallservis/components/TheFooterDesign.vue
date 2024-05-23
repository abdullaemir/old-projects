<template>
  <div class="footer-design">
    <div>
      <span class="footer-design__caption">
        Задизайнено в
        <app-link
          class="footer-design__link"
          to="#"
          :text="{ color: 'blue' }"
        >
          Студии Артемия Лебедева
        </app-link>
      </span>
      <app-link
        class="footer-design__link"
        to="#"
        :text="{ color: 'blue' }"
      >
        Информация о сайте
      </app-link>
    </div>

    <app-image
      class="footer-design__image"
      image="logo/ALS.svg"
    />
  </div>
</template>

<style lang="scss" scoped>
.footer-design {
  $design: &;

  color: $text-color-gray;

  @include desktop() {
    display: grid;
    justify-content: start;
    grid-auto-flow: column;
    grid-column-gap: 16px;
  }

  &__link {
    display: block;
    margin-top: 12px;

    @include desktop() {
      margin-top: 0;
    }

    #{$design}__caption > & {
      display: inline-block;
      margin: 0 0 0 2px;
    }
  }

  &__image {
    width: 92px;
    margin-top: 16px;

    @include tablet() {
      width: 158px;
    }

    @include desktop() {
      margin-top: 0;
      grid-column: 1;
    }
  }
}
</style>
<script setup></script>
