module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    'browser': true,
    'jquery': true
  },
  globals: {
    deepmerge: true
  },
  rules: {
    'no-console': [ 'error', { allow: [ 'debug', 'warn', 'error' ] } ],
    'ember-suave/no-direct-property-access': 'off'
  }
};
