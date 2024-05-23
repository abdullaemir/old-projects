<template>
  <section class="career__main">
    <p class="text-XL">
      Главная ценность нашей компании —
      <br />
      <nobr>это сотрудники,</nobr>
      именно из их знаний, навыков, опыта и энергии складывается уникальный потенциал
    </p>
    <p class="text-L">
      Наша компания имеет более 30 отделений в 19 городах России и Беларуси, таких как
      <app-link>Москва</app-link>
      ,
      <app-link>Санкт-Петербург</app-link>
      ,
      <app-link>Краснодар</app-link>
      ,
      <app-link>Новосибирск</app-link>
      ,
      <app-link>Екатеринбруг</app-link>
      ,
      <app-link>Челябинск</app-link>
      и
      <app-link>других</app-link>
      . Мы сотрудничаем с множеством компаний и предприятий, которые ценят нашу высокую надежность,
      качество и оперативность.
    </p>
  </section>

  <section class="career__about">
    <dl>
      <dt>>1 млн тонн</dt>
      <dd class="text-XL">
        металлопродукции
        <br />
        производится нашими
        <br />
        специалистами в год.
      </dd>
      <dt>
        >20
        <br />
        подраз&shy;делений
      </dt>
      <dd class="text-XL">
        В ассортименте нашей компании
        <app-link>сортовой</app-link>
        и
        <app-link>листовой прокат</app-link>
        ,
        <app-link>трубы</app-link>
        ,
        <app-link>метизы</app-link>
        ,
        <app-link>нержавейка</app-link>
        ,
        <app-link>качественные</app-link>
        и
        <app-link>цветные металлы</app-link>
        ,
        <app-link>электро&shy;инструменты</app-link>
        и
        <app-link>инженерные системы</app-link>
        , которые находят применение в различных отраслях, таких как машиностроение, строительство,
        энергетика
        <nobr>и многих других.</nobr>
      </dd>
    </dl>

    <div
      class="button-L career__slider"
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
  </section>

  <section class="career__resume">
    <h3 class="text-XL career__resume__title">
      Хотите работать у нас? Расскажите нам о своих навыках и опыте, и мы с вами свяжемся
    </h3>
    <p class="career__resume__about text-L">
      Мы ищем талантливых и энергичных людей, которые готовы присоединиться к нашей команде и помочь
      нам развиваться дальше.
      <br />
      Мы предлагаем нашим сотрудникам множество возможностей для профессионального и личностного
      роста, а также конкурентную заработную плату и социальные льготы.
      <br />
      Если вы ищете новые вызовы и готовы к карьерному росту, то мы приглашаем вас присоединиться к
      нашей команде. Работая у нас, вы сможете не только развиваться в своей профессии, но и внести
      свой вклад в производство высококачественной металлопродукции, которая используется в самых
      разных сферах жизни.
    </p>
  </section>

  <career-form></career-form>
</template>

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

.career__about {
  padding: 64px 0;
  margin: 64px 0;

  border: {
    top: 3px solid #f5f5f5;
    bottom: 3px solid #f5f5f5;
  }

  @include mobile($mobile-first: false) {
    padding: 48px 0;
    margin: 48px 0;
  }

  dt {
    animation: shine 4s linear infinite;

    background: linear-gradient(
      to right,
      rgba(0, 63, 169, 1) 0%,
      rgba(0, 49, 255, 1) 16%,
      rgba(0, 93, 232, 1) 50%,
      rgba(0, 63, 169, 1) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    background-size: 200% auto;

    color: #000;
    font-size: 180px;
    font-weight: 720;
    letter-spacing: -9px;
    line-height: 100%;
    -webkit-text-fill-color: transparent;

    @include mobile($mobile-first: false) {
      font-size: 56px;
      letter-spacing: -2.24px;
      line-height: 95%;

      br {
        display: none;
      }
    }

    @keyframes shine {
      to {
        background-position: -200% center;
      }
    }
  }

  dt:nth-child(3) {
    @include desktop {
      margin-bottom: 64px;
    }
  }

  dd {
    margin: 24px 0 96px 0;

    @include mobile($mobile-first: false) {
      margin-bottom: 56px;
    }
  }

  dd:nth-child(4) {
    width: 82%;

    @include mobile($mobile-first: false) {
      width: 100%;
      margin-bottom: 48px;
    }
  }
}

.career__resume {
  &__title {
    margin-bottom: 32px;
    font-weight: 400;
  }

  &__about {
    margin-bottom: 64px;
    column-count: 2;
    column-fill: balance;
    column-gap: 24px;
  }
}
</style>
