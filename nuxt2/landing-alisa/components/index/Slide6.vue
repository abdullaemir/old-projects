<template>
  <div class="slide-interaction slide">
    <div class="container">
      <h2 class="slide-interaction__title slide__title">
        Формы
        <span class="slide__title--gold">Взаимодействия</span>
      </h2>
      <ul class="slide-interaction__list">
        <li
          :class="['slide-interaction-tab', { 'active': tab.isActive }]"
          :style="{ order: index + 1 }"
          v-for="(tab , index) in tabs"
          :key="`tab-${index}`"
          @click="switchTab(tab)"
        >
          <h3 class="slide-interaction-tab__title">{{ tab.title }}</h3>
          <p class="slide-interaction-tab__description">{{ tab.description }}</p>
        </li>
        <li
          :class="['slide-interaction-content', { 'active': tab.isActive }]"
          :style="{ order: index + 1 }"
          v-for="(tab, index) in tabs"
          :key="`content-${index}`"
        >
          <BaseAccordion
            ref="accordion"
            v-for="(accordion, index) in tab.accordions"
            :key="index"
            @toggle="toggleAccordion()"
          >
            {{ accordion.title }}
            <template #content>
              <div v-html="accordion.content" />
            </template>
          </BaseAccordion>
        </li>
      </ul>
      <div class="slide-interaction__wrapper">
        <h4 class="slide-interaction__subtitle">Получите БЕСПЛАТНЫЙ</h4>
        <BaseButton
          class="slide-interaction__button"
          @click="$emit('openModal')"
        >
          “Экспресс-анализ”
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "~/components/base/BaseButton.vue";
import BaseAccordion from "~/components/base/BaseAccordion.vue";

export default {
  name: "Slide6",
  components: {
    BaseButton,
    BaseAccordion,
  },
  data () {
    return {
      tabs: [
        {
          title: "Формат 1",
          description: "Внедрение управленческого учета (УУ) с нуля или перестройка текущей системы УУ в компании",
          accordions: [
            {
              title: "Финансовый факт компании",
              content:
                "1) составлены формы финансовой отчетности <br/> 2) настроены операционные отчеты отделов (или адаптированы под фин.учет) <br/> 3) определена аналитика показателей <br /> 4) составлены Регламент учетной политики и Чек-листы по сдаче отчетности <br /> 5) составлен список типовых операций в компании по каждому отдельному бизнес-блоку <br /> 6) проведена инвентаризация для вступительного баланса (либо данные взяты из Бух.Учета, если в нем отражаются все операции..) <br /> 7) В компании работает управленческий учет (на гугл-диске или в текущей программе учета) <br /> 8) Отчет CashFlow (ОДДС) формируется автоматически в режиме онлайн <br /> 9) Собираются данные для первых P&L (отчет о фин.результатах) и BS (управленческий баланс)",
            },
            {
              title: "Финансовый анализ",
              content:
                "1) собранные отчеты за 1 квартал анализируются по каждому месяцу по методам вертикального, горизонтального, факторного анализа, анализа коэффициентов <br /> 2) Сделаны выводы по результатам финансового анализа, найдены причины изменений и их влияние на результат <br /> 3) Подготовлена карта прибыли компании, показаны фин.риски и возможности компании на будущий период",
            },
            {
              title: "Финансовая модель",
              content:
                "1) определены финансовые цели компании, стратегия на будущий период (полгода, следующий год) <br /> 2) собраны плановые значения для финансового моделирования <br /> 3) разработана и презентована заказчику финансовая модель <br /> 4) при желании заказчика внедрены Платежный календарь и Бюджет на следующий период",
            },
            {
              title: "Сроки проекта (моей работы)",
              content: "от 3 до 9 месяцев, в зависимости от целей и задач конкретной компании",
            },
            {
              title: "Оформление отношений",
              content: "через Договор оказания услуг, со сроком действия",
            },
            {
              title: "Стоимость работы",
              content: "по запросу",
            },
          ],
          isActive: true,
        },
        {
          title: "Формат 2",
          description: "Анализ, оценка и оптимизация текущих бизнес- процессов в компании",
          accordions: [
            {
              title: "Примеры задач от заказчика",
              content: "1) решение проблем управленческого контроля в отделах и компании в целом <br/> 2) решение проблем развития компетенций и роста сотрудников внутри компании, оценка компетенций, работа с сопротивлением изменениям <br/> 3) стратегический маркетинг (анализ внешнего окружения компании, анализ отрасли, анализ конкурентов, анализ заинтересованных сторон) <br /> 4) системное управление компанией (операции, процессы, автоматизация работы, управление изменениями) <br /> 5) разработка и внедрение успешной системы мотивации Отдела продаж, маркетинга, контакт-центра и т.д. (отделов, работающих на показатель выручки)",
            },
            {
              title: "Сроки проекта (моей работы)",
              content: "от 2 до 9 месяцев, в зависимости от целей и задач конкретной компании",
            },
            {
              title: "Оформление отношений",
              content: "через Договор оказания услуг, со сроком действия",
            },
            {
              title: "Стоимость услуги",
              content: "по запросу",
            },
          ],
          isActive: false,
        },
        {
          title: "Формат 3",
          description: "Анализ, оценка и оптимизация существующего бухгалтерского и налогового учета в компании",
          caption: "Услуги оказываются главным бухгалтером моей команды",
          accordions: [
            {
              title: "Примеры задач от заказчика",
              content:
                "1) проверка работы текущего отдела бухгалтерии <br/> 2) внутренний аудит бухгалтерского учета <br/> 3) внутренний аудит налогового учета <br /> 4) выдача рекомендаций заказчику по устранению недочетов <br /> 5) после аудита, Возможно бухгалтерское сопровождение заказчика",
            },
            {
              title: "Сроки проекта (работы моего гл.буха)",
              content: "п.1-4 от 2 недель до 1 месяца <br /> п.5. - сроки работы обсуждаются",
            },
            {
              title: "Оформление отношений",
              content: "п.1-4 через Договор оказания услуг, со сроком действия <br /> п.5. - через Договор напрямую с бухгалтером",
            },
            {
              title: "Стоимость услуг",
              content: "п.1-4 - от 25 000 руб. до 35 000 руб. (без НДС) <br /> п.5 - по запросу",
            },
          ],
          isActive: false,
        },
      ],
    };
  },
  methods: {
    switchTab (activeTab) {
      this.tabs.forEach(tab => tab.isActive = false);
      activeTab.isActive = true;
      this.toggleAccordion();
    },
    toggleAccordion () {
      this.$refs.accordion.forEach(accordion => {
        const accordionElement = accordion.$el;

        if (accordionElement.classList.contains("active"))
          accordionElement.querySelector(".accordion__header").dispatchEvent(new Event("click"));
      });
    },
  },
};
</script>

<style scoped>
.slide-interaction__title {
  margin-bottom: 26px;
}

@media (min-width: 768px) {
  .slide-interaction__title {
    margin-bottom: 10px;
  }
}

@media (min-width: 1920px) {
  .slide-interaction__title {
    margin-bottom: 50px;
  }
}

.slide-interaction__list {
  display: flex;
  flex-direction: column;
  margin: 0 0 30px;
  padding-left: 0;
}

@media (min-width: 768px) {
  .slide-interaction__list {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: 220px 1fr;
    grid-gap: 5px 20px;
    margin-bottom: 20px;
  }
}

@media (min-width: 1024px) {
  .slide-interaction__list {
    grid-template-columns: 206px 1fr;
  }
}

@media (min-width: 1280px) {
  .slide-interaction__list {
    grid-template-columns: 280px 1fr;
  }
}

@media (min-width: 1920px) {
  .slide-interaction__list {
    grid-template-columns: 472px 1fr;
    grid-gap: 5px 20px;
    margin-bottom: 29px;
  }
}

.slide-interaction-tab {
  min-height: 125px;
  padding: 20px 16px;
  border-radius: 5px;
  background-color: var(--background-color-primary);
  cursor: pointer;
}

@media (min-width: 768px) {
  .slide-interaction-tab {
    min-height: auto;
    padding: 20px 12px;
    order: initial !important;
  }
}

@media (min-width: 1280px) {
  .slide-interaction-tab {
    padding: 20px 15px;
  }
}

@media (min-width: 1920px) {
  .slide-interaction-tab {
    padding: 25px;
  }
}

.slide-interaction-tab:not(:first-child) {
  margin-top: 10px;
}

@media (min-width: 768px) {
  .slide-interaction-tab:not(:first-child) {
    margin-top: 0;
  }
}

.slide-interaction-tab.active {
  background-image: var(--background-color-hexadecimal);
}

.slide-interaction-tab__title {
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
}

@media (min-width: 1920px) {
  .slide-interaction-tab__title {
    font-size: 25px;
  }
}

.slide-interaction-tab__description {
  margin: 0;
  font-weight: 300;
  font-size: 12px;
}

@media (min-width: 1920px) {
  .slide-interaction-tab__description {
    font-size: 16px;
  }
}

.slide-interaction-content {
  margin-top: 10px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
}

@media (min-width: 768px) {
  .slide-interaction-content {
    grid-row: 1 / 4;
    grid-column: 2 / 4;
    order: initial !important;
    margin-top: 0;
  }
}

.slide-interaction-content:not(:last-child) {
  margin-bottom: 10px;
}

@media (min-width: 768px) {
  .slide-interaction-content:not(:last-child) {
    margin-bottom: 0;
  }
}

.slide-interaction-content:not(.active) {
  display: none;
}

@media (min-width: 768px) {
  .slide-interaction__wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}

.slide-interaction__subtitle {
  margin: 0 0 30px;
  text-align: center;
  letter-spacing: 0.04em;
}

@media (min-width: 768px) {
  .slide-interaction__subtitle {
    margin-bottom: 0;
  }
}

@media (min-width: 1920px) {
  .slide-interaction__subtitle {
    margin-bottom: 0;
    font-size: 20px;
  }
}

@media (min-width: 768px) {
  .slide-interaction__button {
    max-width: 212px;
    margin-left: 20px;
  }
}

@media (min-width: 1280px) {
  .slide-interaction__button {
    max-width: 230px;
  }
}

@media (min-width: 1920px) {
  .slide-interaction__button {
    max-width: 450px;
    margin-left: 38px;
  }
}
</style>
