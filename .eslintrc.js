module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': ['error', 4],
    'space-before-function-paren': ['error', {
      'named': 'ignore'
    }],
    "arrow-parens": [2, "as-needed", { "requireForBlockBody": true }],
    "semi": [2, "never"],
    "eol-last": 0,
    "comma-dangle": 0,
    "object-shorthand": 0,
    "no-restricted-globals": ["off", "location"],
    "no-unused-vars": [2, { "args": "none" }],
    "no-underscore-dangle": 0,
    "import/no-unresolved": [0, {"commonjs": false, "amd": false}],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-restricted-syntax": ["error", "BinaryExpression[operator='in']"],
    "radix": 0,
    "import/prefer-default-export": 0,
    "prefer-destructuring": 0,
    "vue/html-indent": ["error", 4],
    "no-param-reassign": [2, { "props": false }],
    "vue/name-property-casing": 0,
    "vue/max-attributes-per-line": [2, {
      "singleline":1,
      "multiline": {
        "max": 1,
        "allowFirstLine": true
      }
    }],
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "never",
        "normal": "always",
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }]
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
