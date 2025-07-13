module.exports = {
  env: {
    es2022: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'ignorePackages', {
      js: 'always',
    }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
      },
    },
  },
};
