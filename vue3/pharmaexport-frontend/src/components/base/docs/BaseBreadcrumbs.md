# BaseBreadcrumbs

## Использование

```vue
<template>
  <BaseBreadcrumbs :breadcrumbs="breadcrumbs" />  
</template>

<script setup>
import BaseBreadcrumbs from "~/components/base/BaseBreadcrumbs.vue";

const breadcrumbs = [
  { 
    name: "Link 1",
    to: "/",
  },
  { 
    name: "Link 2",
    to: "{ name: page2 }",
  },
]
</script>
```

## Props

### breadcrumbs

- Type: `array`

Массив объектов путей.

- #### name

  - Type: `string`

  Отображаемое имя ссылки

- #### to

  - Type: `string|object`

  Путь ссылки

## Классы

1. `breadcrumb` - контейнер для хлебных крошек
2. `breadcrumb__item` - хлебная крошка (текст)
3. `breadcrumb__arrow` - стрелка для мобильных
4. `breadcrumb__separator` - стрелка для десктопов

## Переменные

```css
--breadcrumb-margin-bottom-mobile
--breadcrumb-margin-bottom-desktop
--breadcrumb-font-weight
--breadcrumb-font-size
--breadcrumb-color
--breadcrumb-color-hover
--breadcrumb-color-active
--breadcrumb-fill
```
