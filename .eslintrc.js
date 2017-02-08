module.exports = {
  "extends": ["airbnb"],
  "env":{
    "browser":true,
    "es6":true,
    "node":true
  },
  "rules": {
    "func-names": ["error", "never"],
    "import/no-extraneous-dependencies": [2, {"devDependencies": true}],
    "import/prefer-default-export": 0,
    "comma-dangle": 0,
    "no-underscore-dangle": 0,
    "no-plusplus": 0,
    "array-callback-return": 0
  }
};