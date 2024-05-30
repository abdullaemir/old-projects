<template>
  <div class="form-send">
    <input
      class="form-send__input"
      v-model="form.name"
      placeholder="Как Вас зовут?"
      type="text"
    />
    <input
      class="form-send__input"
      v-model="form.email"
      placeholder="Укажите Ваш E-mail"
      type="email"
    />
    <!-- <input
      v-model="form.phone"
      placeholder="Телефон"
      type="text"
    /> -->
    <BaseButton
      class="form-send__button"
      @click="send"
    >
      {{ buttonText }}
    </BaseButton>
    <span class="form-send__error">{{ errors }}</span>
  </div>
</template>

<script>
import BaseButton from "~/components/base/BaseButton.vue";

export default {
  name: "FormSend",
  components: {
    BaseButton,
  },
  props: {
    buttonText: {
      type: String,
      default: "Отправить"
    }
  },
  data() {
    return {
      form: {
        name: null,
        phone: "",
        email: null
      },
      errors: null,
    }
  },
  methods: {
    async send() {
      this.errors = null;

      const response = await this.$axios.post("/telega/send-feedback", this.form);

      this.errors = response.errors ?? null;
    },
  },
};
</script>

<style scoped>
.form-send__input {
  width: 100%;
  min-height: 50px;
  padding: 0 20px;
  border-radius: 50px;
  border: 1px solid var(--border-color-primary);
  background-color: transparent;
  outline: none;
  text-align: center;
  font-size: 14px;
  font-weight: 300;
  color: var(--text-color-primary);
}

@media (min-width: 1920px) {
  .form-send__input {
    min-height: 80px;
    padding: 0 40px;
    font-size: 24px;
  }
}

.form-send__input::placeholder {
  color: var(--text-color-primary);
}

.form-send__input:focus::placeholder {
  font-size: 0;
}
</style>
