<template>
  <app-page class="catalog">
    <template #sidebar>
      <!-- TODO: Унести кнопку в компонент -->
      <catalog-sidebar
        class="catalog__sidebar"
        :is-button-visible="false"
      >
        <catalog-sidebar-menu
          class="text-S"
          :menu="menu"
          :item-active="menuItemActive"
          @change-submenu="changeSubmenu($event)"
        />
      </catalog-sidebar>
    </template>

    <catalog-submenu
      class="text-S catalog__submenu"
      :submenu="submenu"
    />

    <app-caption
      class="catalog__description"
      tag="p"
    >
      Более 25000 позиций металлопродукции вкаталоге, мы комплектуем фактически любой заказ в
      пределах территории.
    </app-caption>
  </app-page>
</template>

<script setup>
const title = "Главная";

const menu = [
  {
    title: "Товары с экспресс-доставкой",
    link: "#",
    icon: "icons/lightning.svg",
    noPreview: true,
  },
  {
    title: "Сортовой прокат",
    link: "#",
    submenu: {
      sections: [
        {
          links: [
            {
              name: "Арматура, катанка",
              url: "#",
            },
            {
              name: "Арматура рифленая А3",
              url: "#",
            },
            {
              name: "Арматура гладкая А1",
              url: "#",
            },
            {
              name: "Арматура Ат800",
              url: "#",
            },
            {
              name: "Катанка",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Балка, швеллер",
              url: "#",
            },
            {
              name: "Балки (Двутавр)",
              url: "#",
            },
            {
              name: "Балки (Двутавр) низколегированные",
              url: "#",
            },
            {
              name: "Швеллер",
              url: "#",
            },
            {
              name: "Швеллер гнутый",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Уголок",
              url: "#",
            },
            {
              name: "Уголок равнополочный",
              url: "#",
            },
            {
              name: "Уголок равнополочный низколегированный",
              url: "#",
            },
            {
              name: "Уголок неравнополочный",
              url: "#",
            },
            {
              name: "Уголок нержавеющий никельсодержащий",
              url: "#",
            },
            {
              name: "Уголок равнополочный судостроительный",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Круг",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Полоса, квадрат",
              url: "#",
            },
            {
              name: "Полоса г/к",
              url: "#",
            },
            {
              name: "Полоса г/к оцинкованная",
              url: "#",
            },
            {
              name: "Полоса нержавеющая никельсодержащая",
              url: "#",
            },
            {
              name: "Квадрат горячекатаный",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Оцинкованный прокат",
              url: "#",
            },
            {
              name: "Полоса оцинкованная",
              url: "#",
            },
            {
              name: "Круг оцинкованный",
              url: "#",
            },
            {
              name: "Труба оцинкованная",
              url: "#",
            },
            {
              name: "Лист оцинкованный",
              url: "#",
            },
          ],
        },
      ],
      previewCount: 2,
    },
  },
  {
    title: "Метизы",
    link: "#",
    submenu: {
      sections: [
        {
          links: [
            {
              name: "Калибровка, серебрянка",
              url: "#",
            },
            {
              name: "Круг калиброванный",
              url: "#",
            },
            {
              name: "Шестигранник калиброванный",
              url: "#",
            },
            {
              name: "Профиль фасонный квадрат",
              url: "#",
            },
            {
              name: "Профиль фасонный полоса",
              url: "#",
            },
            {
              name: "Серебрянка",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Проволока, канаты",
              url: "#",
            },
            {
              name: "Канаты стальные",
              url: "#",
            },
            {
              name: "Проволока Вр-1",
              url: "#",
            },
            {
              name: "Проволока качественная пружинная",
              url: "#",
            },
            {
              name: "Проволока качественная холодной высадки",
              url: "#",
            },
            {
              name: "Проволока нержавеющая",
              url: "#",
            },
            {
              name: "Проволока сварочная обыкновенного качества",
              url: "#",
            },
            {
              name: "Проволока торговая обыкновенного качества",
              url: "#",
            },
            {
              name: "Проволока сварочная легированная",
              url: "#",
            },
            {
              name: "Проволока из сплавов с высоким сопротивлением",
              url: "#",
            },
            {
              name: "Проволока нихромовая",
              url: "#",
            },
            {
              name: "Проволока алюминиевая",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Сетка, лента",
              url: "#",
            },
            {
              name: "Сетка стальная тканая",
              url: "#",
            },
            {
              name: "Сетка стальная плетеная",
              url: "#",
            },
            {
              name: "Сетка стальная сварная",
              url: "#",
            },
            {
              name: "Фиксаторы",
              url: "#",
            },
            {
              name: "Лента холоднокатаная упаковочная",
              url: "#",
            },
            {
              name: "Лента из прецизионных сплавов",
              url: "#",
            },
            {
              name: "Лента нихромовая",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Крепеж, гвозди, болты, цепи",
              url: "#",
            },
            {
              name: "Анкерная техника",
              url: "#",
            },
            {
              name: "Болты",
              url: "#",
            },
            {
              name: "Винты",
              url: "#",
            },
            {
              name: "Гайки",
              url: "#",
            },
            {
              name: "Гвозди",
              url: "#",
            },
            {
              name: "Дюбельная техника",
              url: "#",
            },
            {
              name: "Крепёж из нержавеющей стали",
              url: "#",
            },
            {
              name: "Общий крепеж",
              url: "#",
            },
            {
              name: "Перфорированный крепёж",
              url: "#",
            },
            {
              name: "Саморезы, шурупы",
              url: "#",
            },
            {
              name: "Такелаж (элементы)",
              url: "#",
            },
            {
              name: "Трос, цепи",
              url: "#",
            },
            {
              name: "Шайбы",
              url: "#",
            },
            {
              name: "Шпилька резьбовая DIN 975",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Электроды",
              url: "#",
            },
          ],
        },
      ],
      previewCount: 2,
    },
  },
  {
    title: "Качественные стали",
    link: "#",
    submenu: {
      sections: [
        {
          links: [
            {
              name: "Конструкционная сталь",
              url: "#",
            },
            {
              name: "Круг горячекатаный конструкционный",
              url: "#",
            },
            {
              name: "Круг горячекатаный никелевый",
              url: "#",
            },
            {
              name: "Поковка",
              url: "#",
            },
            {
              name: "Шестигранник горячекатаный конструкционный",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Инструментальная сталь",
              url: "#",
            },
            {
              name: "Круг инструментальный углеродистый и легированный",
              url: "#",
            },
            {
              name: "Полоса инструментальная углеродистая и легированная",
              url: "#",
            },
          ],
        },
      ],
      previewCount: 2,
    },
  },
  {
    title: "Судовая сталь",
    link: "#",
    submenu: {
      sections: [
        {
          links: [
            {
              name: "Лист г/к нормальной прочности",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Лист г/к повышенной прочности",
              url: "#",
            },
          ],
        },
      ],
    },
    previewCount: 2,
  },
  {
    title: "Мостовая сталь",
    link: "#",
  },
  {
    title: "Листовой прокат",
    link: "#",
    submenu: {
      sections: [
        {
          links: [
            {
              name: "Лист г/к",
              url: "#",
            },
            {
              name: "Лист г/к Ст3",
              url: "#",
            },
            {
              name: "Лист г/к низколегированный",
              url: "#",
            },
            {
              name: "Лист г/к конструкционный",
              url: "#",
            },
            {
              name: "Лист г/к судостроительный",
              url: "#",
            },
            {
              name: "Лист г/к мостостроительный",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Лист х/к",
              url: "#",
            },
            {
              name: "Лист холоднокатанный х/к",
              url: "#",
            },
            {
              name: "Лист холоднокатанный х/к Ст",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Лист рифленый",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Лист нержавеющий",
              url: "#",
            },
            {
              name: "Лист нержавеющий без никеля",
              url: "#",
            },
            {
              name: "Лист нержавеющий никельсодержащий",
              url: "#",
            },
            {
              name: "Лист нержавеющий ПВЛ",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Профнастил (профлист)",
              url: "#",
            },
            {
              name: "Профнастил оцинкованный",
              url: "#",
            },
            {
              name: "Профнастил окрашенный",
              url: "#",
            },
            {
              name: "Профнастил С8",
              url: "#",
            },
            {
              name: "Профнастил С10",
              url: "#",
            },
            {
              name: "Профнастил С20",
              url: "#",
            },
            {
              name: "Профнастил С21",
              url: "#",
            },
            {
              name: "Профнастил С44",
              url: "#",
            },
            {
              name: "Профнастил Н57",
              url: "#",
            },
            {
              name: "Профнастил Н60",
              url: "#",
            },
            {
              name: "Профнастил Н75",
              url: "#",
            },
            {
              name: "Профнастил Н114",
              url: "#",
            },
            {
              name: "Профнастил НС35",
              url: "#",
            },
            {
              name: "Профнастил НС44",
              url: "#",
            },
            {
              name: "Доборные элементы",
              url: "#",
            },
            {
              name: "Саморезы кровельные",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Просечно-вытяжной лист (ПВЛ)",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Рулонная сталь",
              url: "#",
            },
            {
              name: "Рулоны нержавеющие",
              url: "#",
            },
            {
              name: "Рулоны оцинкованные",
              url: "#",
            },
            {
              name: "Рулоны оцинкованные с полимерным покрытием",
              url: "#",
            },
            {
              name: "Рулоны г/к",
              url: "#",
            },
            {
              name: "Рулоны х/к",
              url: "#",
            },
          ],
        },
      ],
      previewCount: 4,
    },
  },
  {
    title: "Нержавеющая сталь",
    link: "#",
    submenu: {
      sections: [
        {
          links: [
            {
              name: "Круг, квадрат, шестигранник",
              url: "#",
            },
            {
              name: "Круг нержавеющий безникелевый жаропрочный",
              url: "#",
            },
            {
              name: "Круг нержавеющий никельсодержащий",
              url: "#",
            },
            {
              name: "Квадрат нержавеющий никельсодержащий",
              url: "#",
            },
            {
              name: "Шестигранник нержавеющий безникелевый жаропрочный",
              url: "#",
            },
            {
              name: "Шестигранник нержавеющий никельсодержащий",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Полоса, уголок",
              url: "#",
            },
            {
              name: "Полоса нержавеющая никельсодержащая",
              url: "#",
            },
            {
              name: "Уголок нержавеющий никельсодержащий",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Трубы нержавейка",
              url: "#",
            },
            {
              name: "Трубы нержавеющие электросварные AISI",
              url: "#",
            },
            {
              name: "Трубы нержавеющие электросварные AISI прямоугольные",
              url: "#",
            },
            {
              name: "Трубы нержавеющие электросварные AISI квадратные",
              url: "#",
            },
            {
              name: "Трубы нержавеющие бесшовные",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Лист нержавеющий",
              url: "#",
            },
            {
              name: "Лист нержавеющий без никеля",
              url: "#",
            },
            {
              name: "Лист нержавеющий никельсодержащий",
              url: "#",
            },
            {
              name: "Лист нержавеющий ПВЛ",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Нержавеющие метизы",
              url: "#",
            },
            {
              name: "Проволока нержавеющая",
              url: "#",
            },
            {
              name: "Лента холоднокатаная нержавеющая",
              url: "#",
            },
            {
              name: "Электроды нержавеющие",
              url: "#",
            },
            {
              name: "Крепёж из нержавеющей стали",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Комплектующие для лестничных ограждений",
              url: "#",
            },
            {
              name: "Комплектующие для лестниц",
              url: "#",
            },
            {
              name: "Пристенные крепления",
              url: "#",
            },
            {
              name: "Наконечники, соединения поручня со стойкой",
              url: "#",
            },
            {
              name: "Держатель ригеля",
              url: "#",
            },
            {
              name: "Декоративный низ стойки",
              url: "#",
            },
            {
              name: "Заглушки",
              url: "#",
            },
            {
              name: "Повороты и соединители труб",
              url: "#",
            },
            {
              name: "Фланцы настенные",
              url: "#",
            },
            {
              name: "Стеклодержатели",
              url: "#",
            },
            {
              name: "Крепления стоек",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Детали трубопровода",
              url: "#",
            },
            {
              name: "Отводы нержавеющие",
              url: "#",
            },
            {
              name: "Переходы нержавеющие",
              url: "#",
            },
            {
              name: "Тройники нержавеющие",
              url: "#",
            },
            {
              name: "Фланцы нержавеющие воротниковые",
              url: "#",
            },
            {
              name: "Фланцы нержавеющие плоские",
              url: "#",
            },
          ],
        },
      ],
      previewCount: 2,
    },
  },
  {
    title: "Цветные металлы",
    link: "#",
    submenu: {
      sections: [
        {
          links: [
            {
              name: "Алюминий, дюраль",
              url: "#",
            },
            {
              name: "Круг алюминиевый (пруток)",
              url: "#",
            },
            {
              name: "Круг дюралевый (пруток)",
              url: "#",
            },
            {
              name: "Лента алюминиевая",
              url: "#",
            },
            {
              name: "Тавр алюминиевый",
              url: "#",
            },
            {
              name: "Лист алюминиевый",
              url: "#",
            },
            {
              name: "Лист алюминиевый рифленый",
              url: "#",
            },
            {
              name: "Лист дюралевый",
              url: "#",
            },
            {
              name: "Общестроительный профиль алюминиевый",
              url: "#",
            },
            {
              name: "Плита алюминиевая",
              url: "#",
            },
            {
              name: "Плита дюралевая",
              url: "#",
            },
            {
              name: "Проволока алюминиевая",
              url: "#",
            },
            {
              name: "Труба алюминиевая",
              url: "#",
            },
            {
              name: "Труба дюралевая",
              url: "#",
            },
            {
              name: "Уголок алюминиевый",
              url: "#",
            },
            {
              name: "Чушка алюминиевая",
              url: "#",
            },
            {
              name: "Швеллер алюминиевый",
              url: "#",
            },
            {
              name: "Шестигранник дюралевый",
              url: "#",
            },
            {
              name: "Шина алюминиевая",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Медь, бронза, латунь",
              url: "#",
            },
            {
              name: "Квадрат латунный",
              url: "#",
            },
            {
              name: "Круг бронзовый (пруток)",
              url: "#",
            },
            {
              name: "Круг латунный (пруток)",
              url: "#",
            },
            {
              name: "Круг медный (пруток)",
              url: "#",
            },
            {
              name: "Лента латунная",
              url: "#",
            },
            {
              name: "Лента медная",
              url: "#",
            },
            {
              name: "Лист латунный",
              url: "#",
            },
            {
              name: "Лист медный",
              url: "#",
            },
            {
              name: "Проволока латунная",
              url: "#",
            },
            {
              name: "Труба бронзовая",
              url: "#",
            },
            {
              name: "Труба латунная",
              url: "#",
            },
            {
              name: "Труба медная",
              url: "#",
            },
            {
              name: "Шестигранник латунный",
              url: "#",
            },
            {
              name: "Шина медная",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Олово, cвинец, цинк, нихром",
              url: "#",
            },
            {
              name: "Баббит",
              url: "#",
            },
            {
              name: "Проволока нихромовая",
              url: "#",
            },
            {
              name: "Лист свинцовый",
              url: "#",
            },
          ],
        },
      ],
      previewCount: 3,
    },
  },
  {
    title: "Трубы",
    link: "#",
    submenu: {
      sections: [
        {
          links: [
            {
              name: "Трубы г/д",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Трубы х/д",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "ВГП, электросварные трубы",
              url: "#",
            },
            {
              name: "Трубы ВГП",
              url: "#",
            },
            {
              name: "Трубы ВГП оцинкованные ГОСТ 3262-75",
              url: "#",
            },
            {
              name: "Трубы электросварные круглые",
              url: "#",
            },
            {
              name: "Трубы электросварные квадратные",
              url: "#",
            },
            {
              name: "Трубы электросварные прямоугольные",
              url: "#",
            },
            {
              name: "Трубы электросварные в изоляции ППУ",
              url: "#",
            },
            {
              name: "Трубы круглые оцинкованные",
              url: "#",
            },
            {
              name: "Трубы квадратные оцинкованные",
              url: "#",
            },
            {
              name: "Трубы прямоугольные оцинкованные",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Трубы электросварные низколегированные",
              url: "#",
            },
            {
              name: "Трубы электросварные низколегированные круглые",
              url: "#",
            },
            {
              name: "Трубы электросварные низколегированные квадратные",
              url: "#",
            },
            {
              name: "Трубы электросварные низколегированные прямоугольные",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Трубы оцинкованные",
              url: "#",
            },
            {
              name: "Трубы оцинкованные круглые",
              url: "#",
            },
            {
              name: "Трубы оцинкованные квадратные",
              url: "#",
            },
            {
              name: "Трубы оцинкованные прямоугольные",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Трубы нержавеющие",
              url: "#",
            },
            {
              name: "Трубы нержавеющие электросварные AISI",
              url: "#",
            },
            {
              name: "Трубы нержавеющие электросварные AISI прямоугольные",
              url: "#",
            },
            {
              name: "Трубы нержавеющие электросварные AISI квадратные",
              url: "#",
            },
            {
              name: "Трубы нержавеющие бесшовные",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Сваи винтовые",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Трубы чугунные",
              url: "#",
            },
            {
              name: "Трубы чугунные ЧК",
              url: "#",
            },
            {
              name: "Трубы чугунные SML",
              url: "#",
            },
          ],
        },
      ],
      previewCount: 4,
    },
  },
  {
    title: "Инженерные системы",
    link: "#",
    submenu: {
      sections: [
        {
          links: [
            {
              name: "Трубы и фитинги",
              url: "#",
            },
            {
              name: "Фитинги, арматура PP-R",
              url: "#",
            },
            {
              name: "Трубы полипропиленовые PP-R",
              url: "#",
            },
            {
              name: "Фитинги резьбовые латунные",
              url: "#",
            },
            {
              name: "Фитинги резьбовые стальные",
              url: "#",
            },
            {
              name: "Фитинги резьбовые чугунные",
              url: "#",
            },
            {
              name: "Трубы полиэтиленовые",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Запорная арматура и электроприводы",
              url: "#",
            },
            {
              name: "Краны шаровые латунные",
              url: "#",
            },
            {
              name: "Краны шаровые стальные",
              url: "#",
            },
            {
              name: "Краны латунные для манометров",
              url: "#",
            },
            {
              name: "Задвижки стальные",
              url: "#",
            },
            {
              name: "Задвижки чугунные",
              url: "#",
            },
            {
              name: "Клапаны и затворы обратные",
              url: "#",
            },
            {
              name: "Клапаны стальные запорные",
              url: "#",
            },
            {
              name: "Клапаны и затворы чугунные",
              url: "#",
            },
            {
              name: "Клапаны пожарные, диафрагмы",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Детали трубопроводов, хомуты и крепеж",
              url: "#",
            },
            {
              name: "Фланцы стальные",
              url: "#",
            },
            {
              name: "Отводы стальные",
              url: "#",
            },
            {
              name: "Тройники стальные",
              url: "#",
            },
            {
              name: "Заглушки стальные",
              url: "#",
            },
            {
              name: "Переходы стальные",
              url: "#",
            },
            {
              name: "Сгоны, бочата, резьбы",
              url: "#",
            },
            {
              name: "Опоры стальные",
              url: "#",
            },
            {
              name: "Компенсаторы и вибровставки",
              url: "#",
            },
            {
              name: "Крепеж",
              url: "#",
            },
            {
              name: "Хомуты",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Радиаторы, полотенцесушители, конвекторы и комплектующие",
              url: "#",
            },
            {
              name: "Радиаторы THERMA Q",
              url: "#",
            },
            {
              name: "Радиаторы биметаллические",
              url: "#",
            },
            {
              name: "Радиаторы алюминиевые",
              url: "#",
            },
            {
              name: "Радиаторы стальные панельные",
              url: "#",
            },
            {
              name: "Радиаторы чугунные и комплектующие",
              url: "#",
            },
            {
              name: "Полотенцесушители",
              url: "#",
            },
            {
              name: "Узлы подключения",
              url: "#",
            },
            {
              name: "Комплектующие для радиаторов",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Фильтры, грязевики, элеваторы",
              url: "#",
            },
            {
              name: "Фильтры",
              url: "#",
            },
            {
              name: "Грязевики",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Трубы канализационные и соединительные детали",
              url: "#",
            },
            {
              name: "Трубы полипропиленовые и соединительные детали PP-H",
              url: "#",
            },
            {
              name: "Трубы из поливинилхлорида и соединительные детали ПВХ",
              url: "#",
            },
            {
              name: "Трубы чугунные безраструбные SML и соединительные детали",
              url: "#",
            },
            {
              name: "Трубы чугунные ЧК и соединительные детали",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Теплоизоляция, уплотнения, защитные покрытия",
              url: "#",
            },
            {
              name: "Теплоизоляция полиэтилен",
              url: "#",
            },
            {
              name: "Теплоизоляция каучук",
              url: "#",
            },
            {
              name: "Паронит листовой",
              url: "#",
            },
            {
              name: "Прокладки",
              url: "#",
            },
            {
              name: "Лента ФУМ и нить уплотнительная",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Регулирующая, предохранительная арматура и автоматика",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Регулирующая, предохранительная арматура и автоматика",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Коллекторы и коллекторные группы",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Инструмент, оборудование и материалы",
              url: "#",
            },
            {
              name: "Приборы учета и КИПиА",
              url: "#",
            },
            {
              name: "Комплектующие КИПиА",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Электроинструменты",
              url: "#",
            },
          ],
        },
      ],
      previewCount: 4,
    },
  },
  {
    title: "Электроинструменты",
    link: "#",
    submenu: {
      sections: [
        {
          links: [
            {
              name: "Дрели",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Лобзики",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Перфораторы",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Пилы",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Пылесосы",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Рубанки",
              url: "#",
            },
          ],
        },
        {
          links: [
            {
              name: "Шлифовальные машины",
              url: "#",
            },
          ],
        },
      ],
    },
    noPreview: true,
  },
];

const menuItemActive = ref(null);

const submenu = ref({
  sections: [],
});

const changeSubmenu = menuItemIndex => {
  if (menu[menuItemIndex].submenu && !menu[menuItemIndex].noPreview) {
    menuItemActive.value = menuItemIndex;
    submenu.value = menu[menuItemIndex].submenu;
  }
};

useHead({
  title: title,
});

menu.forEach(menuItem => {
  const section = {
    links: [],
  };

  if (!menuItem.noPreview) {
    section.links.push({
      name: menuItem.title,
      url: menuItem.link,
    });

    if (menuItem.submenu) {
      const previewTrimmed = menuItem.submenu.sections.slice(0, menuItem.submenu.previewCount);

      previewTrimmed.forEach(submenuSection => {
        section.links.push(submenuSection.links[0]);
      });

      section.remainder = menuItem.submenu.sections.length - previewTrimmed.length;
    }

    submenu.value.sections.push(section);
  }
});
</script>

<style lang="scss" scoped>
.catalog {
  &__sidebar {
    @include desktop() {
      max-width: 272px;
    }
  }

  &__submenu {
    @include desktop($mobile-first: false) {
      display: none;
    }
  }

  &__description {
    margin-top: 16px;

    @include desktop() {
      display: none;
    }
  }
}
</style>
