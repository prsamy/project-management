module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
    // parser: 'vue-eslint-parser',
    // parser: 'babel-eslint'
  },
  plugins: [
    'vue'
  ],
  rules: {
  }
}
