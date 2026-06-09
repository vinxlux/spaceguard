const js = require("@eslint/js");
const prettierConfig = require("eslint-config-prettier");
const expoConfig = require("eslint-config-expo/flat");

module.exports = [
  {
    ignores: ["backend/**", "node_modules/**", "dist/**", ".expo/**"],
  },
  js.configs.recommended,
  ...expoConfig,
  prettierConfig,
];