# BaseTab

Табы состоят из двух компонентов: **BaseTabs**, **BaseTabItem**.

Табы адаптированы под SSR.

При переключении табы не удаляются, а скрываются.

**Использование компонента:**

```vue
<template>
  <BaseTabs>
    <BaseTabItem name="first">
      <div>1</div>
    </BaseTabItem>
    <BaseTabItem name="second">
      <div>2</div>
    </BaseTabItem>
  </BaseTabs>
</template>

<script setup>
import BaseTabItem from "~/components/base/BaseTabItem.vue";
import BaseTabs from "~/components/base/BaseTabs.vue";
</script>
```

# BaseTabs

## Props

### default

- Type: `string`
- Default: первый `BaseTabItem`

`name` таба, который будет открыт по умолчанию.

## Emit

### switch

- Return: `name` выбранного таба

Срабатывает при переключении табов.

## Классы

1. `tabs` - контейнер табов
2. `tabs__list` - список табов
3. `tabs__item` - таб
4. `tabs__button` - кнопка переключения

# BaseTabItem

### Props

### disabled

- Type: `boolean`
- Default: `false`

Заблокировать таб.

### name

- Type: `string`

Имя таба, отображаемое в кнопках переключения.
