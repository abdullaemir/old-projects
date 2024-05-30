<template>
  <div class="calendar__wrapper">
    <table class="calendar">
      <thead class="calendar__header">
        <tr class="calendar__row">
          <th class="calendar__cell">
            Date
          </th>
          <th class="calendar__cell">
            Name
          </th>
          <th class="calendar__cell">
            Registration link
          </th>
        </tr>
      </thead>

      <tbody class="calendar__body">
        <tr
          v-for="(calendarItem, calendarItemIndex) in calendar"
          :key="calendarItemIndex"
          class="calendar__row"
        >
          <td class="calendar__cell calendar__date">
            {{ calendarItem.date }}
          </td>
          <td
            class="calendar__cell calendar__name"
            data-title="Name"
          >
            <a
              class="calendar__name-link"
              :href="calendarItem.href"
              rel="noopener noreferrer"
              target="_blank"
            >
              {{ calendarItem.name }}
            </a>
          </td>
          <td
            class="calendar__cell"
            data-title="Registration link"
          >
            <a
              class="calendar__registration-link"
              :href="calendarItem.registrationHref"
              rel="noopener noreferrer"
              target="_blank"
            >
              {{ calendarItem.registrationName }}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const calendar = [
  {
    date: "01.04.2022",
    href: "https://www.artkim.com.tr/",
    name: "Ana Sayfa - Artkim Fuarcılık",
    registrationHref: "http://turkcoat-paintistanbul.com/virtualexhibition/",
    registrationName: "turkcoat-paintistanbul.com",
  },
  {
    date: "28.04.2022",
    name: "HPCI - Home and Personal Care Ingredients India",
    registrationHref: "https://hpci-india.com/",
    registrationName: "hpci-india.com",
  },
  {
    date: "29.04.2022",
    name: "Medbaltica 2022",
    registrationHref: "https://bt1.lv/",
    registrationName: "bt1.lv",
  },
  {
    date: "09.05.2022",
    name: "3rd World Congress on Diabetes & Endocrinology",
    registrationHref: "https://diabetes.inovineconferences.com/",
    registrationName: "diabetes.inovineconferences.com",
  },
  {
    date: "11.05.2022",
    name: "International Exhibition of Hospital Furniture and Medical Equipment",
    registrationHref: "https://simem.info/en/home-2/",
    registrationName: "simem.info",
  },
  {
    date: "18.05.2022",
    name: "KAZAKHSTAN INTERNATIONAL HEALTHCARE EXHIBITION",
    registrationHref: "https://kihe.kz/en/",
    registrationName: "kihe.kz",
  },
  {
    date: "20.05.2022",
    name: "India's No. 1 Trade Fair for Hospitals, Health Centres and Clinics",
    registrationHref: "https://medicalfair-india.com/",
    registrationName: "medicalfair-india.com",
  },
  {
    date: "24.05.2022",
    name: "PMES 2022",
    registrationName: "Precision Medicine Summit Middle East",
  },
  {
    date: "14.09.2022",
    name: "Europas größte Fachmesse rund um den Apothekenmarkt",
    registrationHref: "https://expopharm.de/",
    registrationName: "expopharm.de",
  },
  {
    date: "31.08.2022",
    name: "Medical Fair Asia 2022",
    registrationHref: "https://medicalfair-asia.com/",
    registrationName: "medicalfair-asia.com",
  },
  {
    date: "26.09.2022",
    name: "Oman Health Exhibition and Conference",
    registrationHref: "https://omanhealthexpo.com/",
    registrationName: "omanhealthexpo.com",
  },
];
</script>

<style scoped>
.calendar__wrapper {
  position: relative;
  margin: 0 -16px;
  border-top: 1px solid var(--border-color-primary);
  border-bottom: 1px solid var(--border-color-primary);
  font-size: 12px;
}

@media (min-width: 768px) {
  .calendar__wrapper {
    margin: 0;
    border: 1px solid var(--border-color-primary);
    border-radius: 8px;
    font-size: 14px;
  }
}

.calendar {
  width: 100%;
  border-collapse: collapse;
}

.calendar__row {
  display: grid;
}

@media (min-width: 768px) {
  .calendar__row {
    grid-template-columns: 75px 348px 1fr;
  }
}

@media (min-width: 1170px) {
  .calendar__row {
    grid-template-columns: 75px 1fr 310px;
  }
}

@media (min-width: 768px) {
  .calendar__cell:nth-child(2) {
    margin: 0 50px;
  }
}

@media (min-width: 768px) {
  .calendar__cell:last-child {
    text-align: right;
  }
}

.calendar__header {
  position: sticky;
  top: 0;
  z-index: 1;
}

.calendar__header .calendar__row {
  padding: 8px 16px;
  border-bottom: 1px solid var(--border-color-primary);
  text-align: left;
  background-color: #f8f9fa;
}

@media (min-width: 768px) {
  .calendar__header .calendar__row {
    padding: 20px;
    font-weight: 600;
  }
}

@media (max-width: 767px) {
  .calendar__header .calendar__cell:not(:first-child) {
    display: none;
  }
}

.calendar__body .calendar__row {
  margin: 0 16px;
  padding: 20px 0;
}

@media (min-width: 768px) {
  .calendar__body .calendar__row {
    margin: 0 20px;
  }
}

.calendar__body .calendar__row:not(:last-child) {
  border-bottom: 1px solid var(--border-color-primary);
}

@media (max-width: 767px) {
  .calendar__body .calendar__cell:not(:first-child)::before {
    content: attr(data-title);
    display: block;
    margin-bottom: 4px;
    line-height: 1.8;
    color: var(--text-color-two);
  }
}

@media (max-width: 767px) {
  .calendar__date {
    margin-bottom: 24px;
  }
}

@media (max-width: 767px) {
  .calendar__name {
    margin-bottom: 16px;
  }
}

.calendar__registration-link {
  color: #8292a1;
  word-break: break-all;
  transition-property: color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

@media (any-pointer: fine) {
  .calendar__registration-link:hover,
  .calendar__registration-link:focus {
    color: var(--link-color-primary-hover);
  }
}

.calendar__registration-link:active {
  color: var(--link-color-primary-active);
}

.calendar__name-link[href],
.calendar__registration-link[href] {
  text-decoration: underline;
}
</style>
