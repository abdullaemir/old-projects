import { localize } from "@vee-validate/i18n";
import AllRules from "@vee-validate/rules";
import { configure, defineRule } from "vee-validate";

import en from "./en/validate/validate.json";

const locales = () => {
  Object.keys(AllRules).forEach((rule) => defineRule(rule, AllRules[rule]));

  configure({
    generateMessage: localize({
      en,
    }),
  });
};

export default locales;
