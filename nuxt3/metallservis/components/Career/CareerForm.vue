<template>
  <form class="resume-form">
    <div class="resume-form__input">
      <p class="text-L">КОМПОНЕНТ ВВОДА имя</p>
      <p class="text-L">КОМПОНЕНТ ВВОДА почта</p>
      <p class="text-L">КОМПОНЕНТ ВВОДА телефон</p>
      <p class="text-L">КОМПОНЕНТ ВВОДА ссылки или выбрать файл</p>
    </div>
    <button
      type="submit"
      class="resume-form__submit button-L"
      disabled
    >
      <span>Отправить</span>
    </button>
    <app-policy-check
      has-rules
      size="L"
      class="text-L"
    />
  </form>
</template>

<style lang="scss" scoped>
.resume-form {
  &__input {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 32px;
    border: 3px solid #f5f5f5;
    border-radius: 24px;
  }

  &__submit {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 32px 48px;
    border-radius: 16px;
    margin: 32px 0 48px 0;
    background: #f5f5f5;
  }

  &__submit:disabled {
    span {
      color: #808080;
      opacity: 0.5;
    }
  }
}
</style>
