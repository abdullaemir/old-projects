<template>
  <div class="tel-input__container">
    <div
      ref="baseTelInput"
      :class="['phone-input', dropdownOpenDirection, styleClasses, size, { opened: open, disabled: disabled, 'error-phone': !isFocus && errorMessage }]"
    >
      <div
        ref="baseTelInputButtonDropdown"
        :id="`phone-input-button-dropdown-${id}`"
        aria-label="Country Code Selector"
        aria-haspopup="listbox"
        :aria-expanded="open"
        role="button"
        :class="['phone-input__dropdown', { open: open, disabled: dropdownOptions.disabled || disabled}]"
        :tabindex="dropdownOptions.tabindex"
        @click="toggleDropdown"
        @keydown.space="toggleDropdown"
        @keydown="keyboardNav"
      >
        <span class="phone-input__selection">
          <span
            v-if="dropdownOptions.showFlags"
            :class="['phone-input__flag', activeCountryCode.toLowerCase()]"
          ></span>
          <span v-if="dropdownOptions.showDialCodeInSelection" class="phone-input__country-code">
            +{{ activeCountry && activeCountry.dialCode }}
          </span>
          <slot name="arrow-icon" :open="open">
            <span class="phone-input__dropdown-arrow">{{ open ? "▲" : "▼" }}</span>
          </slot>
        </span>
      </div>

      <input
        :value="phone"
        type="tel"
        :class="['phone-input__input-hidden']"
        :disabled="disabled"
        :name="name"
        :placeholder="placeholder"
      />

      <input
        :value="phoneVisible"
        v-mask="masks"
        ref="phoneInput"
        type="tel"
        :autocomplete="inputOptions.autocomplete"
        :autofocus="inputOptions.autofocus"
        :class="['phone-input__input', inputOptions.styleClasses]"
        :disabled="disabled"
        :id="inputOptions.id"
        :maxlength="inputOptions.maxlength"
        :placeholder="placeholder"
        :readonly="inputOptions.readonly"
        :required="inputOptions.required"
        :tabindex="inputOptions.tabindex"
        :aria-describedby="inputOptions['aria-describedby']"
        @input.stop.prevent="onInput($event.target.value)"
        @blur="onBlur"
        @focusin="isFocus=true"
        @focusout="isFocus=false"
      />

      <slot name="icon-right" />

      <div
        v-show="open"
        :id="`phone-input-dropdown-wrapper-${id}`"
        ref="baseTelInputDropdownWrapper"
        class="phone-input__dropdown-wrapper"
        :class="dropdownOpenDirection"
      >
        <div v-if="dropdownOptions.showSearchBox" class="phone-input__box-input-search input__container">
          <input
            aria-label="Search by country name or country code"
            v-model.trim="searchQuery"
            :id="`phone-input-${props.id}-input-search`"
            class="phone-input__input-search"
            ref="searchField"
            :disabled="props.dropdownOptions.disabled"
            placeholder="Search country"
            type="text"
            @click.stop.prevent
            @keydown="keyboardNav"
          />
        </div>

        <ul
          ref="list"
          class="phone-input__dropdown-list"
          role="listbox"
          @keydown="keyboardNav"
        >
          <li
            v-for="(pb, index) in sortedCountries"
            role="option"
            :class="['phone-input__dropdown-item', getItemClass(index, pb.iso2)]"
            :key="pb.iso2 + (pb.preferred ? '-preferred' : '')"
            tabindex="-1"
            @mousemove="selectedIndex = index"
            @click="choose(pb)"
            :aria-selected="activeCountryCode === pb.iso2 && !pb.preferred"
          >
            <div class="phone-input__flag-wrapper">
              <span
                v-if="dropdownOptions.showFlags"
                :class="['phone-input__flag', pb.iso2.toLowerCase()]"
              />
            </div>
            <strong>{{ pb.name }}</strong>
            <span v-if="dropdownOptions.showDialCodeInList"> +{{ pb.dialCode }} </span>
          </li>
        </ul>
      </div>
    </div>

    <BaseError
      :is-focus="isFocus"
      :error-message="errorMessage ?? ''"
      :meta="meta"
    />
  </div>
</template>

<script setup>
import {ref,toRef, computed, watch, onMounted, nextTick} from "vue";
import {mask} from 'maska';
import {configure, defineRule, useField} from "vee-validate";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import {onClickOutside} from '@vueuse/core'
import {localize} from "@vee-validate/i18n";

import BaseError from "../BaseError.vue";
import allCountries from './assets/scripts/all-countries.json';

import BaseInput from "~/components/base/BaseInput.vue";


const props = defineProps({
  id: {
    type: [String, Number],
    default: "",
    required: true,
  },
  name: {
    type: String,
    default: "",
    required: true,
  },
  placeholder: {
    type: String,
    default: "Enter a phone number",
  },
  disabled: {
    type: Boolean,
    default() { return false },
  },
  styleClasses: {
    type: [String, Array, Object],
    default: "",
  },
  size: {
    type: String,
    default: "large",
    description: "medium/large"
  },
  inputOptions: {
    type: Object,
    default() {
      return {
        autocomplete: "on",
        autofocus: false,
        "aria-describedby": "",
        maxlength: 25,
        showDialCode: true,
        readonly: false,
        tabindex: 0,
        styleClasses: "",
      }
    }
  },
  dropdownOptions: {
    type: Object,
    default() {
      return {
        disabled: false,
        showDialCodeInList: true,
        showDialCodeInSelection: false,
        showFlags: true,
        showSearchBox: true,
        tabindex: 0,
        width: "100%"
      }
    }
  },
  onlyCountries: {
    type: Array,
    default() {
      return []
    },
  },
  ignoredCountries: {
    type: Array,
    default() {
      return ["af"]
    },
  },
  preferredCountries: {
    type: Array,
    default() {
      return []
    },
  },
  defaultCountry: {
    type: [String],
    default: ""
  },
  modelValue: {
    default: '',
    type: String,
  },
  rules: {
    default: null,
    type: [String, Object],
  },
  validationPhoneValid: {
    default: true,
    type: Boolean,
  },
  standalone: {
    default: false,
    type: Boolean,
  },
  bails: {
    default: true,
    type: Boolean,
  }
})

const emits = defineEmits({
  open: ()=>true,
  close: ()=>true,
  "update:modelValue": (val)=>true,
})

const baseTelInput = ref("");
const phoneInput = ref("")
const baseTelInputButtonDropdown = ref("");
const baseTelInputDropdownWrapper = ref("");
const list = ref("")

const open = ref(false);
const activeCountryCode = ref("");
const phoneVisible = ref("");
const searchQuery = ref("");
const dropdownOpenDirection = ref('below');
const selectedIndex = ref(null);
const masks = ref('');
const isFocus = ref(false);

const rulesPhoneValidation = computed(() => {
  if (props.validationPhoneValid ) {
    if (phoneVisible.value) {
      if (!props.rules) {
        return (`validPhoneValue`);
      }
      if (typeof props.rules === "string") {
        return props.rules.concat(`|validPhoneValue`);
      }
      if (typeof props.rules === "object") {
        return {...props.rules, validPhone: true};
      }
    }
    return props.rules;
  }
  return props.rules
});

configure({
  generateMessage: localize({
    en: {
      messages: {
        validPhoneValue: "Invalid phone format",
      },
    },
    ru: {
      messages: {
        validPhoneValue: "Неверный формат телефона"
      },
    },
  }),
});

const {
  value: phone,
  meta,
  errorMessage,
  handleChange,
  resetField,
  setTouched,
} = useField(toRef(props,"name"),
  rulesPhoneValidation,
  {validateOnValueUpdate: false, standalone: props.standalone }
);

const validPhoneValue = (value) => {
  value = `+${value}`
  if (!value || !meta.touched) return true
  const phoneData = parsePhoneNumberFromString(value)
  if (!phoneData || !activeCountryCode.value) return false
  if (value && phoneData && phoneData.isValid) {
    return parsePhoneNumberFromString(value).isValid();
  }
  return true;
};
defineRule("validPhoneValue", validPhoneValue)

const filteredCountries = computed(()=>{
  if (props.onlyCountries.length) {
    return allCountries
      .filter(({ iso2 }) => props.onlyCountries.some((c) => c.toUpperCase() === iso2.toUpperCase()));
  }
  if (props.ignoredCountries.length) {
    return allCountries.filter(
      ({ iso2 }) => !props.ignoredCountries.includes(iso2.toUpperCase())
        && !props.ignoredCountries.includes(iso2.toLowerCase()),
    );
  }
  return allCountries;
});

const findCountry = (iso = '') => {
  if (!iso) return {}
  return filteredCountries.value.find((country) => country.iso2.toUpperCase() === iso.toUpperCase());
};

const activeCountry = computed(() => {
  return findCountry(activeCountryCode.value);
});

const getCountries = (list = []) => {
  return list
    .map((countryCode) => findCountry(countryCode))
    .filter(Boolean);
};

const sortedCountries = computed(()=>{
  const preferredCountries = getCountries(props.preferredCountries)
    .map((country) => ({ ...country, preferred: true }));
  const countriesList = [...preferredCountries, ...filteredCountries.value];
  if (!props.dropdownOptions.showSearchBox) {
    return countriesList;
  }
  const regExpValue = searchQuery.value.replace(/\+/gi,"")
  return countriesList.filter(
    (c) => (new RegExp(regExpValue, 'i')).test(c.name)
      || (new RegExp(regExpValue, 'i')).test(c.iso2)
      || (new RegExp(regExpValue, 'i')).test(c.dialCode),
  );
});

const getItemClass = (index, iso2) => {
  const highlighted = selectedIndex.value === index;
  const lastPreferred = index === props.preferredCountries.length - 1;
  const preferred = props.preferredCountries.some((c) => c.toUpperCase() === iso2.toUpperCase());
  return {
    highlighted,
    'last-preferred': lastPreferred,
    preferred,
  };
};

const toggleDropdown = (e) => {
  if (props.disabled || props.dropdownOptions.disabled || e?.path?.[0]?.type === 'text') {
    return;
  }
  searchQuery.value = '';
  open.value = !open.value;
}

onClickOutside(baseTelInputButtonDropdown, (event) => {
  if (
    event.target.id === `phone-input-button-dropdown-${props.id}` ||
    event.target.closest(`#phone-input-button-dropdown-${props.id}`)?.id === `phone-input-button-dropdown-${props.id}` ||
    event.target.id === `phone-input-dropdown-wrapper-${props.id}` ||
    event.target.closest(`#phone-input-dropdown-wrapper-${props.id}`)?.id === `phone-input-dropdown-wrapper-${props.id}`
  )
    return
  open.value = false
})

const setDropdownPosition = ()=> {
  const spaceBelow = window.innerHeight - baseTelInput.value.getBoundingClientRect().bottom;
  const hasEnoughSpaceBelow = spaceBelow > 200;
  if (hasEnoughSpaceBelow) {
    dropdownOpenDirection.value = 'below';
  } else {
    dropdownOpenDirection.value = 'above';
  }
};

const findCurrentCountry = () => {
  if (!activeCountryCode.value) return
  const listMenuCountry = props.dropdownOptions?.showSearchBox ?
    baseTelInputDropdownWrapper.value.children[1].children :
    baseTelInputDropdownWrapper.value.children[0].children


  let optionActiveCountry = "";
  filteredCountries.value.find(({iso2},index) => {
    if (iso2.toUpperCase() === activeCountryCode.value.toUpperCase()) {
      optionActiveCountry = listMenuCountry[index]
      return true
    }
  })

  nextTick(()=>{
    const searchBoxHeight = props.dropdownOptions.showSearchBox ?
      baseTelInputDropdownWrapper.value.children[0].getBoundingClientRect().height : 0
    baseTelInputDropdownWrapper.value.scrollTop = optionActiveCountry.offsetTop - searchBoxHeight
  })
}

watch(open, isDropdownOpened => {
  if (isDropdownOpened) {
    setDropdownPosition();
    findCurrentCountry()
    emits('open');
  } else {

    emits('close');
  }
});

const getPhone = (phoneValue) => {
  return phoneValue ? phoneValue.replace(/\+|#|-|\s|\(|\)/giu,"") : ""
}

const getDataPhone = (number) => {
  let result = parsePhoneNumberFromString(number) || "";
  if (!result?.country) {
    masks.value = masks.value && getPhone(number) ? masks.value : "+#########################";
    return
  }
  allCountries.find(({iso2, mask, dialCode})=>{
    if (iso2.toUpperCase() === result.country) {
      masks.value = mask
      return true
    }
  })
  if (!filteredCountries.value.map(({iso2})=>(iso2.toUpperCase())).includes(result.country)) {
    activeCountryCode.value = ""
    return
  }
  activeCountryCode.value = result.country;
}

const choose = (country) => {
  open.value = false;
  resetField();
  let parsedCountry = country;

  if (typeof parsedCountry === 'string') {
    parsedCountry = findCountry(parsedCountry);
  }
  if (!parsedCountry) {
    return;
  }

  activeCountryCode.value = parsedCountry.iso2 || '';
  if (props.inputOptions?.showDialCode && parsedCountry?.iso2 ) {
    masks.value = "+#########################";
    phoneVisible.value = `+${parsedCountry.dialCode}`;
    phone.value = `+${parsedCountry.dialCode}`;
    emits("update:modelValue", phoneVisible.value);
  }
};

const onInput = (number) => {
  getDataPhone(number)
  phoneVisible.value = number;
  const newPhone = getPhone(number);
  handleChange(newPhone)
  emits("update:modelValue", newPhone);
}

const initializeCountry = (phone = "") =>  {
  if (phone && activeCountryCode.value) return

  if (props.defaultCountry) {
    choose(props.defaultCountry);
  }
};

const keyboardNav = (e) => {
  switch (e.keyCode) {
    case 40: {
      e.preventDefault();
      open.value = true;
      if (selectedIndex.value === null) {
        selectedIndex.value = 0;
      } else {
        selectedIndex.value = Math.min(sortedCountries.value.length - 1, selectedIndex.value + 1);
      }
      const currentElement = list.value.children[selectedIndex.value];
      currentElement.focus();
      if (currentElement.offsetTop + currentElement.clientHeight
        > baseTelInputDropdownWrapper.value.scrollTop + baseTelInputDropdownWrapper.value.clientHeight
      ) {
        baseTelInputDropdownWrapper.value.scrollTop =
          currentElement.offsetTop - baseTelInputDropdownWrapper.value.clientHeight + currentElement.clientHeight;
      }
      break
    }

    case 38: {
      e.preventDefault();
      open.value = true;
      if (selectedIndex.value === null) {
        selectedIndex.value = sortedCountries.value.length - 1;
      } else {
        selectedIndex.value = Math.max(0, selectedIndex.value - 1);
      }
      const currentElement = list.value.children[selectedIndex.value];
      currentElement.focus();
      if (currentElement.offsetTop < baseTelInputDropdownWrapper.value.scrollTop) {
        baseTelInputDropdownWrapper.value.scrollTop = currentElement.offsetTop;
      }
      break
    }

    case 13: {
      // enter key
      if (selectedIndex.value !== null) {
        choose(sortedCountries.value[selectedIndex.value]);
      }
      open.value = !open.value;
      break
    }
    case 27: {
      // esc key
      open.value = !open.value;
      break
    }
  }
};

const onBlur = () => {
  setTouched(true)
  handleChange(getPhone(phoneVisible.value))
}

const modelValue = toRef(props, "modelValue");

const getMask = (number) => {
  if (typeof masks.value === "string") return masks.value
  const numberLength = `+${getPhone(number)}`.length
  const dataMask = masks.value.map((item)=>(item.replace(/-|\s|\(|\)/giu, "").length))
  const indexMask = dataMask.indexOf(Math.min(...dataMask.filter((item, index) => {
    return item >= numberLength
  })));

  return masks.value[indexMask] ? masks.value[indexMask] : "+#########################";
}

watch(modelValue, (newValue) => {
  const newPhone = `+${getPhone(newValue)}`
  onInput(mask(newPhone, getMask(newPhone)))
})

watch(phone, (newValue) => {
  const newPhone = `+${getPhone(newValue)}`
  onInput(mask(newPhone, getMask(newPhone)))
  if (newValue === "") {
    activeCountryCode.value = ""
  }
})

onMounted(()=>{
  const initPhone = getPhone(phone.value || modelValue.value)
  if (initPhone) {
    getDataPhone(`+${initPhone}`);
    onInput(mask(initPhone, getMask(initPhone)));
    initializeCountry(`+${initPhone}`);
  }
})

</script>

<script>
import {maska} from 'maska';

export default {
  name: "BaseTelInput",

  directives: {
    mask: maska
  },
};
</script>

<style scoped>
@import "./assets/styles/component.css";
@import "./assets/styles/sprite.css";
</style>
