module.exports = {
  extends: [
    "stylelint-config-prettier-scss",
    "stylelint-config-idiomatic-order",
    "stylelint-config-recommended-vue/scss",
  ],
  overrides: [
    {
      extends: "stylelint-config-recommended-scss",
      customSyntax: "postcss-scss",
      files: ["*.scss"],
    },
  ],
  rules: {
    "scss/no-global-function-names": null,
  },
};
