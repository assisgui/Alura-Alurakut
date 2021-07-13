module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'max-len': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
