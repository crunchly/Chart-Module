module.exports = {
  extends: './node_modules/eslint-config-airbnb/index.js',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: { 
    'import/no-unresolved': 'off',
    'no-underscore-dangle': 'off',
  },
};
