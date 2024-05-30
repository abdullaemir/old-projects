# BaseNotification

Уведомления можно вызывать на сервере.

## Использование

Уведомления используются вызовом функции:

```vue
<script setup>
import { useNotification } from "~/components/base/BaseNotification.vue";

useNotification.openNotification(message, { options });
</script>
```

## Аргументы функции

### message

- Type: `number|string`

Cообщение, отображаемое в уведомлении. Если будет передана пустая строка, уведомление не выведется.

### options

- Type: `object`

Опциональный набор параметров:

- #### duration

  - Type: `number|string`
  - Default: 3500
  
  Длительность отображения уведомления в мс. При указании строки `"Infinity"` уведомление отображается бесконечно.

- #### href

  - Type: `string`

  Ссылка для тега `<a>`.

- #### link

  - Type: `string`

  Текст ссылки.

- #### to

  - Type: `string`

  Ссылка для тега `<RouterLink>`.

## Классы

1. `notification__container` - список уведомлений
2. `notification` - уведомление
3. `notification__link` - ссылка
4. `notification__button` - кнопка закрытия

## Переменные

```css
--notification-z-index
--notification-border-width
--notification-border-color
--notification-border-radius
--notification-font-weight
--notification-font-size
--notification-color
--notification-background-color
--notification-background-color-hover
--notification-box-shadow
--notification-opacity
```
