module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parser': '@babel/eslint-parser',
  'parserOptions': {
    requireConfigFile: false,
    babelOptions: {
      presets: [
        [
          "@babel/preset-react",
          { "throwIfNamespace": false, }
        ]
      ],
    },
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
