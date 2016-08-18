# Expression
[![npm](https://img.shields.io/npm/v/@collinbrewer/expression.svg?maxAge=2592000)](https://www.npmjs.com/package/@collinbrewer/expression)
[![CircleCI](https://img.shields.io/circleci/project/collinbrewer/expression.svg?maxAge=2592000)](https://circleci.com/gh/collinbrewer/expression)
[![Code Climate](https://img.shields.io/codeclimate/coverage/github/collinbrewer/expression.svg?maxAge=2592000)](https://codeclimate.com/github/collinbrewer/expression)
[![Code Climate](https://img.shields.io/codeclimate/github/collinbrewer/expression.svg?maxAge=2592000)](https://codeclimate.com/github/collinbrewer/expression)
[![David](https://img.shields.io/david/collinbrewer/expression.svg?maxAge=2592000)](https://david-dm.org/collinbrewer/expression)

A utility for node and browser that evaluates objects against an expression.

## Install
```sh
npm install @collinbrewer/expression -S
```

## Usage

```js
var Expression=require("expression");
```

Constants:
```javascript
Expression.parse("'Value'").getValueWithObject(); // -> 'Value'
Expression.parse("4").getValueWithObject(); // -> 4
```

Functions:
```javascript
var doc={firstName:"Chris", lastName:"Ericson"}
Expression.parse("concat('firstName', ' ', 'lastName')").getValueWithObject(doc); // -> "Chris Ericson"
```

Arithmetic:
```javascript
Expression.parse("1+2+3").getValueWithObject(); // -> 6
Expression.parse("multiply(2, 6)"); // -> 12
```
