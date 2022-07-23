module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/prop-types": 0,
    indent: ["error", 2],
    "linebreak-style": 1,
    quotes: ["error", "double"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
