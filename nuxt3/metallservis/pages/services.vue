<template>
  <app-page class="services">
    <app-title
      size="small"
      tag="h1"
    >
      {{ title }}
    </app-title>

    <div class="services__grid">
      <services-card
        v-for="service in services"
        :card="service"
      />
    </div>
  </app-page>
</template>

<script setup>
const title = "Онлайн-сервисы";

useHead({
  title: title,
});

const services = [
  {
    title: "Информация о машине",
    description: "Заполните форму с данными вашего автомобиля для заезды на территорию металлобазы",
    link: "#",
  },
  {
    title: "Форма оформления заказа",
    description: "Вы можете оформить заказ дистанционно",
    link: "#",
  },
  {
    title: "Калькулятор профнастила",
    description: "Укажите параметры и мы посчитаем стоимость и сроки",
    link: "#",
  },
  {
    title: "Заявка на типовой договор",
    description: "Оставьте данные вашей компании и мы подготовим типовой договор",
    link: "#",
  },
  {
    title: "Подписка на рассылки",
    description: "Вы можете выбрать какие письма от Металлсервиса будете получать",
    link: "#",
  },
  {
    title: "Форма обратной связи",
    description: "Наши специалисты с радостью ответят на любые ваши вопросы",
    link: "#",
  },
];
</script>

<style lang="scss" scoped>
.services {
  @include laptop() {
    padding-bottom: 81px;
  }

  &__grid {
    display: grid;
    margin-top: 32px;
    grid-row-gap: 16px;

    @include laptop() {
      grid-auto-rows: minmax(317px, auto);
      grid-column-gap: 24px;
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
