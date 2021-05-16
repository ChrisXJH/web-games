module.exports = {
    root: true,
    env: {
        browser: true,
    },
    extends: [
      'airbnb-typescript'
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        "react/destructuring-assignment": [0],
        "jsx-a11y/click-events-have-key-events": [0],
        "@typescript-eslint/comma-dangle": [0],
        "no-param-reassign": [0]
    }
  };
