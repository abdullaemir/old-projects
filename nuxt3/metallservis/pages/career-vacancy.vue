<template>
  <app-page>
    <app-title
      class="vacancy__title"
      size="large"
      tag="h1"
    >
      <span v-html="vacancies[0].title"></span>
    </app-title>
    <section class="vacancy__item">
      <div class="vacancy__item__city">
        <app-image image="icons/place-flag.svg" />
        <p>
          <span v-html="vacancies[0].city"></span>
          ,
          <span v-html="vacancies[0].adress"></span>
        </p>
      </div>
      <app-caption>Контактный телефон</app-caption>
      <p class="button-L vacancy__item__phone">{{ vacancies[0].contact_phone }}</p>
      <div class="vacancy__item__card">
        <div
          class="button-L vacancy__item__card__slider"
          style="
            display: flex;
            width: 100%;
            height: 603px;
            align-items: center;
            justify-content: center;
            border-radius: 24px;
            background-color: #0154e2;
            color: white;
          "
        >
          (slider)
        </div>
        <div class="vacancy__item__card__info">
          <!-- Требуется написать динамический вывод данных исходя из их вида в БД -->
          <div class="item">
            <app-caption>График работы</app-caption>
            <p class="item__main">5/2</p>
            <div class="item__extra">
              <div class="item__extra__days">
                <app-caption>пн-чт</app-caption>
                <app-caption>пт</app-caption>
                <app-caption>сб</app-caption>
              </div>
              <div class="item__extra__time">
                <p>с 9:00 до 17:30</p>
                <p>с 9:00 до 16:30</p>
                <p>выходной</p>
              </div>
            </div>
          </div>
          <div class="item">
            <app-caption>Опыт работы</app-caption>
            <p class="item__main">от 3-х лет</p>
            <p class="item__extra">Работа в продажах.</p>
            <p class="item__extra">Не менее 1 года в металлопрокате.</p>
          </div>
          <div class="item">
            <app-caption>Испытательный срок</app-caption>
            <p class="item__main">3 месяца</p>
          </div>
          <div class="item">
            <app-caption>Оформление</app-caption>
            <p class="item__main">ТК РФ</p>
            <p class="item__extra">+ социальный пакет</p>
          </div>
          <div class="item">
            <app-caption>Заработная плата</app-caption>
            <p class="item__main">от 60 000 ₽</p>
            <p class="item__extra">+ карьерный рост</p>
          </div>
        </div>
      </div>
      <!-- Заменить кнопку на компонент -->
      <button class="button-L vacancy__item__respond-button">Откликнуться</button>
    </section>
    <section class="vacancy__info">
      <p class="text-XL">
        Высокий уровень дохода,
        <nobr>в соответствии</nobr>
        <nobr>с вашей квалификацией.</nobr>
        Профессионалам высокий доход сразу!
      </p>
      <div class="vacancy__info__cards text-S">
        <div class="card">
          <app-title
            tag="h3"
            size="M"
          >
            Требования
          </app-title>
          <ul>
            <li>Опыт работы в продажах и металлопрокате.</li>
            <li>Знание техник продаж, тактик ведения переговоров на любом уровне.</li>
            <li>Способность прогнозирования продаж.</li>
            <li>Знание специфики и конъюнктуры рынка торговли металлом.</li>
            <li>Уверенный пользователь ПК.</li>
            <li>Умение работать с большими массивами информации.</li>
            <li>Коммуникабельность, активность.</li>
            <li>Нацеленность на результат.</li>
          </ul>
        </div>
        <div class="card">
          <div class="card__title-heart">
            <app-title
              tag="h3"
              size="M"
            >
              Условия
            </app-title>
            <app-image image="icons/heart.svg" />
          </div>
          <ul>
            <li>Оформление по ТК РФ</li>
            <li>График работы 5/2</li>
            <li>Развозка от и до метро «Московская» (10 минут).</li>
            <li>Испытательный срок.</li>
            <li>Возможность карьерного роста (отдел создается с «нуля» в крупной компании)</li>
            <li>Привлекательный уровень заработной платы (оклад и % от продаж)</li>
          </ul>
        </div>
        <div class="card">
          <app-title
            tag="h3"
            size="M"
          >
            Должностные обязанности
          </app-title>
          <ul>
            <li>Активные оптовые и розничные продажи, поиск клиентов.</li>
            <li>Работа с постоянными клиентами. Документальная работа по сопровождению сделок.</li>
            <li>Работа с дебиторской задолженностью.</li>
          </ul>
        </div>
      </div>
    </section>
    <app-title
      tag="h3"
      size="M"
      class="vacancy__form-title"
    >
      Для отклика заполните форму
    </app-title>
    <career-form></career-form>
  </app-page>
</template>

<script setup>
const vacancies = [
  {
    city: "Санкт-Петербург",
    adress: "<nobr>6-ой Предпортовый проезд, 12,</nobr> <nobr>ООО «Металлсервис»,</nobr> 196240",
    title: "Менеджер <nobr>по продаже</nobr> металлопроката",
    schedule: [
      { workdays: "5/2" },
      { "пн-чт": "с 9:00 до 17:30" },
      { пт: "с 9:00 до 16:30" },
      { сб: "выходной" },
    ],
    probation: "3 месяца",
    experience: [
      { overall: "от 3-х лет" },
      { extras: ["Работа в продажах.", "Не менее 1 года в металлопрокате."] },
    ],
    description:
      "Активные оптовые <nobr>и розничные</nobr> продажи, поиск клиентов. <nobr>Работа с постоянными</nobr> клиентами. Документальная работа <nobr>по сопровождению</nobr> сделок. Работа <nobr>с дебиторской</nobr> задолженностью.",
    contact_phone: "+7 812 676-54-05",
    salary: [{ rub: "от 60 000 ₽" }, { bonus: "+ карьерный рост" }],
    photo: ["url1", "url2", "url3", "url4"],
  },
];

console.log(vacancies);
</script>

<style lang="scss" scoped>
.vacancy {
  &__title {
    max-width: 900px;

    @include mobile($mobile-first: false) {
      max-width: 290px;
    }
  }

  &__item {
    width: 100%;

    margin: {
      top: 64px;
      bottom: 112px;
    }

    @include mobile($mobile-first: false) {
      margin: {
        top: 32px;
        bottom: 32px;
      }
    }

    &__city {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      column-gap: 8px;
      font-size: 24px;
      line-height: 140%;

      @include mobile($mobile-first: false) {
        align-items: start;
        font-size: 18px;
        letter-spacing: -0.72px;
      }
    }

    &__phone {
      margin: {
        top: 8px;
        bottom: 34px;
      }

      @include mobile($mobile-first: false) {
        font-size: 18px;
      }
    }

    &__card {
      display: flex;
      width: 100%;
      flex-direction: column;

      padding: 32px;
      border: 3px solid #f5f5f5;

      border-radius: 48px;
      gap: 48px;

      @include mobile($mobile-first: false) {
        padding: 16px 16px 24px 16px;
        border-radius: 16px;
        gap: 32px;
      }

      &__info {
        display: flex;
        width: 100%;
        max-width: 1050px;
        flex-wrap: wrap;
        padding: 16px;
        column-gap: 64px;
        row-gap: 48px;

        @include mobile($mobile-first: false) {
          flex-direction: column;
          padding: 0;
          gap: 16px;
        }

        .item {
          width: 100%;
          max-width: 290px;

          &__main {
            margin: {
              top: 8px;
              bottom: 16px;
            }
            width: max-content;
            min-width: 270px;

            font-size: 48px;
            font-weight: 500; //по макету 550
            letter-spacing: -1.92px;
            line-height: 100%;

            @include mobile($mobile-first: false) {
              width: 100%;
              min-width: auto;
              font-size: 18px;
              letter-spacing: -0.72px;
              line-height: 140%;

              margin: {
                top: 4px;
                bottom: 4px;
              }
            }
          }

          &__extra {
            display: flex;
            font-size: 18px;
            gap: 8px;
            letter-spacing: -0.36px;
            line-height: 130%;

            @include mobile($mobile-first: false) {
              font-size: 14px;
              gap: 16px;
              letter-spacing: -0.28px;
              line-height: 110%;
            }

            &__days,
            &__time {
              display: flex;
              flex-direction: column;
            }
          }
        }
      }
    }

    &__respond-button {
      display: flex;
      //удалить при замене на компонент
      width: 100%;
      justify-content: center;
      padding: 32px 0;

      border-radius: 16px;
      margin-top: 24px;
      background: linear-gradient(144deg, #005eff 0%, #0044b8 26.56%, #005de8 61.98%, #003fa9 100%);
      color: #fff;

      @include mobile($mobile-first: false) {
        padding: 14px 0;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: -0.64px;
        line-height: 100%;
      }
    }
  }

  &__info {
    margin: {
      top: 112px;
      bottom: 96px;
    }

    @include mobile($mobile-first: false) {
      margin: {
        top: 32px;
        bottom: 48px;
      }
    }

    &__cards {
      display: flex;
      justify-content: space-between;
      margin-top: 64px;

      @include mobile($mobile-first: false) {
        flex-direction: column;
        margin-top: 24px;
        row-gap: 16px;
      }

      .card {
        width: 100%;
        max-width: 470px;
        height: max-content;
        padding: 32px;
        border: 3px solid #f5f5f5;
        border-radius: 24px;

        @include mobile($mobile-first: false) {
          padding: 16px 16px 24px 16px;
          border-radius: 12px;
        }

        &__title-heart {
          display: flex;
          align-items: center;
          gap: 8px;

          img {
            @include mobile($mobile-first: false) {
              width: 32px;
              height: 32px;
            }
          }
        }

        ul {
          margin-top: 24px;
          opacity: 0.7;

          @include mobile($mobile-first: false) {
            margin-top: 16px;
            font-size: 16px;
            letter-spacing: -0.32px;
            line-height: 115%;
          }

          li:not(:last-child) {
            margin-bottom: 13px;

            @include mobile($mobile-first: false) {
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }

  &__form-title {
    margin-bottom: 48px;
    @include mobile($mobile-first: false) {
      margin-bottom: 24px;
    }
  }
}
</style>
