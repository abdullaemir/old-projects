<template>
  <div>
    <div class="wrapper" :class="{'input__error': errorMessage}">
      <BaseInputFileUploadList
        :files="files"
        @file-delete="fileDelete"
      />
      <label
        class="label"
        :class="{'active': isDragStarted, 'border': files.length }"
      >
      <span class="label__text">
        {{ label }}
      </span>
        <span class="label__separator">
        {{ labelSeparator }}
      </span>

        <button
          type="button"
          class="label__button"
          @click="input.click()"
          @blur="handleChange"
        >
          {{ buttonText }}
        </button>

        <BaseInputFileDrag :dragText="dragText"/>

        <input
          aria-hidden="true"
          :id="id"
          class="input"
          ref="input"
          @change="uploadFile"
          @blur="handleChange"
          @dragenter="isDragStarted = true"
          @dragleave="isDragStarted = false"
          @drop="isDragStarted = false"
          v-bind="$attrs"
          :name="name"
          type="file"
          tabindex="-1"
          title=""
        />
      </label>
    </div>
    <Transition name="show-errors">
      <p v-if="(errorMessage || !meta.valid && meta.dirty && meta.touched)" class="input__error-message">
        {{ errorMessage }}
      </p>
    </Transition>
  </div>

</template>

<script setup>
import {toRef, ref, watch} from "vue";
import {useField, defineRule} from "vee-validate";

import BaseInputFileDrag from "./BaseInputFileDrag.vue";
import BaseInputFileUploadList from "./BaseInputFileUploadList.vue";

const props = defineProps({
  buttonText: {
    default: "Choose a file",
    type: String,
  },
  dragText: {
    default: "Upload the file by dragging it here",
    type: String,
  },
  id: {
    default: "",
    required: true,
    type: String,
  },
  label: {
    default: "Upload file, drag it here",
    type: String,
  },
  labelSeparator: {
    default: "or",
    type: String,
  },
  name: {
    default: "",
    required: true,
    type: String,
  },
  rules: {
    default: null,
    type: [String, Object],
  },
});

const input = ref(null);
const files = ref([]);
const isDragStarted = ref(false);

const {
  value,
  meta,
  errorMessage,
  handleChange,
} = useField(toRef(props, "name"), toRef(props, "rules"), {validateOnValueUpdate: false,});

const updateFileInput = () => {
  const list = new DataTransfer();

  files.value.forEach((file) => {
    const fileNew = new File([file], file.name);
    list.items.add(fileNew);
  });

  input.value.files = list.files || [];
  handleChange(Array.from(input.value.files));
};

const uploadFile = (event) => {
  const inputFiles = event.currentTarget.files;
  if (inputFiles) {
    const filesMemory = Array.from(inputFiles);

    filesMemory.forEach((fileInput) => {
      let isFileAlreadyUpload = false;
      files.value.forEach((file) => {
        if (fileInput.name === file.name) {
          isFileAlreadyUpload = true;
        }
      });
      if (!isFileAlreadyUpload) {
        files.value = [...files.value, fileInput];
      }
    });

    updateFileInput();
  }
};

const fileDelete = (fileName) => {
  files.value = files.value.filter((file) => file.name !== fileName);
  updateFileInput();
};

watch(value, (newVal = [], oldVal = []) => {
  if (newVal.length !== oldVal.length && !newVal.length) {
    files.value = []
  }
}, {deep: true})


defineRule('min_length', (value, [limit]) => {
  // The field is empty so it should pass
  if (!value || !value.length) {
    return true;
  }
  if (value.length < limit) {
    return false;
  }
  return true;
});

defineRule('max_length', (value, [limit]) => {
  // The field is empty so it should pass
  if (!value || !value.length) {
    return true;
  }
  if (value.length > limit) {
    return false;
  }
  return true;
});

</script>

<script>
export default {
  inheritAttrs: false,
};
</script>

<style scoped>
.wrapper {
  border: var(--input-file-border-width) solid var(--input-file-border-color);
  border-radius: var(--input-file-border-radius);
  background-color: var(--input-file-background-color);
  font-family: inherit;
  font-size: var(--input-file-font-size);
  font-weight: var(--input-file-font-weight);
  line-height: var(--input-file-line-height);
  color: var(--input-file-color);
  transition-property: border-color, background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

@media (any-pointer: fine) {
  .wrapper:hover {
    border-color: var(--input-file-border-color-hover);
    background-color: var(--input-file-background-color-hover);
  }
}

.input__error, .input__error.input:disabled, .input__error:hover:not(.input:disabled) {
  transition: all 0.3s ease-in-out;
  border: var(--input-file-border-width) solid var(--input-file-border-color-error);
}

.label {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
}

.label__text {
  margin-bottom: 6px;
}

.label__separator {
  position: relative;
  margin-bottom: 8px;
}

.label__separator::after,
.label__separator::before {
  content: "";
  position: absolute;
  top: 50%;
  width: 20px;
  height: 1px;
  background-color: var(--input-file-separator-background-color);
}

.label__separator::after {
  left: 20px;
}

.label__separator::before {
  right: 20px;
}

.label__button {
  padding: 6px 18px;
  border: none;
  border-radius: 40px;
  text-align: center;
  font-weight: var(--input-file-button-font-weight);
  color: var(--input-file-button-color);
  background-color: var(--input-file-button-background-color);
  transition-property: background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  cursor: pointer;
}

@media (any-pointer: fine) {
  .label__button:focus,
  .label:hover .label__button {
    background-color: var(--input-file-button-background-color-hover);
  }
}

.input {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}

.label.border :deep(.drag__overlay) {
  border-radius: 0 0 var(--input-file-border-radius) var(--input-file-border-radius);
}

.label.active :deep(.drag__overlay) {
  opacity: 1;
}


.input__error-message {
  color: var(--input-file-border-color-error);
  font-size: 10px;
  font-weight: 500;
  margin-top: 4px;
}

.show-errors-enter-active {
  animation: show-errors 0.3s;
}

.show-errors-leave-active {
  animation: show-errors 0.3s reverse;
}

@keyframes show-errors {
  0% {
    transform: translateY(-8px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
