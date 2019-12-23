module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "semi": 0,
    "no-multiple-empty-lines": [0, {
      "max": 100,
      "no-irregular-whitespace": "on",
      'space-before-function-paren': 0, //这句话表示在函数后可以不加空格
      "quotes": [1, "single"], //引号类型 `` "" ''
      // "indent":["off",2]
    }],

  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
