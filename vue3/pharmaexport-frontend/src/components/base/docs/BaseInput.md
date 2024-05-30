# BaseInput

## Использование

Для инпута `type="password"` будут отображаться кнопки показать/скрыть пароль.

```vue
<template>
  <BaseInput
    id="id"
    label="Label"
    name="name"
  />

  <BaseInput
    id="id"
    label="Label"
    name="name"
    type="password"
  />
</template>

<script setup>
import BaseInput from "~/components/base/BaseInput.vue";
</script>
```

## Props

### id

- Type: `string`

Id.

### label

- Type: `string`

Лейбл, который будет отображаться в виде плейсхолдера.

### name

- Type: `string`

Имя, используется для отправки данных на бекенд.

### placeholder

- Type: `string`
- Default: `null`

Используется для назначения отдельного плейсхолдера. Иначе в `placeholder` подставляется `label`.

### rules

- Type: `string|object`
- Default: `null`

Правила для валидирования.

### type

- Type: `string`
- Default: `text`

Тип инпута.

## Классы

1. `input__container` - контейнер для инпута
2. `input__wrapper` - обёртка для инпута и лейбла
3. `input` - инпут
4. `input__label` - лейбл
5. `input__button--password` - кнопка скрытия/отображения пароля

## Переменные

```css
--input-border-width
--input-border-color
--input-border-color-hover
--input-border-color-active
--input-border-color-disabled
--input-border-color-error
--input-border-radius
--input-font-weight
--input-font-size
--input-color
--input-color-disabled
--input-background-color
--input-background-color-hover
--input-background-color-active
--input-background-color-disabled
--input-label-font-weight-active
--input-label-font-size-active
--input-label-color
--input-label-color-hover
--input-label-color-active
--input-label-color-disabled
--input-icon-password-color
--input-icon-password-color-hover
```
