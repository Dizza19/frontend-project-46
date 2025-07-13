
module.exports = {
  env: {
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
  ],
};
